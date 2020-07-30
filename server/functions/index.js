const functions = require("firebase-functions");

const alogliasearch = require("algoliasearch");

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = alogliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("products");

exports.addToIndex = functions.firestore
  .document("products/{productId}")
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.saveObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document("products/{productId}")
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document("products/{productId}")
  .onDelete((snapshot) => {
    index.deleteObject(snapshot.id);
  });
