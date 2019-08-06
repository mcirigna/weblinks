const {admin, config} = require('../utility/firebase');

exports.getData = (req, res) => {
    let data = {};
    admin.firestore().collection('folders')
        .where('userHandle', '==', req.user.handle)
        .get()
        .then(collection => {
            data.folders = [];
            collection.forEach(doc => data.folders.push({
                name: doc.data().name,
                userHandle: doc.data().userHandle,
                folderId: doc.id
            }));
            return admin.firestore().collection('links')
                    .where('userHandle', '==', req.user.handle)
                    .get()
        })
        .then(collection => {
            data.links = [];
            collection.forEach(doc => data.links.push({
                name: doc.data().name,
                link: doc.data().link,
                linkId: doc.id,
                folderId: doc.data().folderId,
                userHandle: doc.data().userHandle
            }));
            return res.json(data);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
};

exports.addLink = (req, res) => {
    if (req.body.name.trim() === '' || req.body.link.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
      }
    
      const newLink = {
        userHandle: req.user.handle,
        link: req.body.link,
        name: req.body.name,
        folderId: req.body.folderId
      };

      // Todo: check for valid folderId
    
      admin.firestore().collection('links')
        .add(newLink)
        .then((doc) => {
          const resLink = newLink;
          resLink.linkId = doc.id;
          res.json(resLink);
        })
        .catch((err) => {
          res.status(500).json({ error: 'something went wrong' });
          console.error(err);
        });
};

exports.addFolder = (req, res) => {
    if (req.body.name.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
      }
    
      const newFolder = {
        userHandle: req.user.handle,
        name: req.body.name
      };
    
      admin.firestore().collection('folders')
        .add(newFolder)
        .then((doc) => {
          const resFolder = newFolder;
          resFolder.folderId = doc.id;
          res.json(resFolder);
        })
        .catch((err) => {
          res.status(500).json({ error: 'something went wrong' });
          console.error(err);
        });
};

exports.deleteLink = (req, res) => {
    const document = admin.firestore().doc(`/links/${req.params.linkId}`);
    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Scream not found' });
        }
        if (doc.data().userHandle !== req.user.handle) {
          return res.status(403).json({ error: 'Unauthorized' });
        } else {
          return document.delete();
        }
      })
      .then(() => {
        res.json({ message: 'Link deleted successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
};

exports.deleteFolder = (req, res) => {
    const document = admin.firestore().doc(`/folders/${req.params.folderId}`);
    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Folder not found' });
        }
        if (doc.data().userHandle !== req.user.handle) {
          return res.status(403).json({ error: 'Unauthorized' });
        } else {
          return document.delete();
        }
      })
      .then(() => {
        return admin.firestore().collection('links')
            .where('folderId', '==', req.params.folderId)
            .get();
      })
      .then(collection => {
          collection.forEach(doc => {
            const linkDocument = admin.firestore().doc(`/links/${doc.id}`);
            linkDocument.delete();
          });
          res.json({ message: 'Folder deleted successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
};