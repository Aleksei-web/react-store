var admin = require("firebase-admin");	

var serviceAccount = require("../config/fb.serviceAccountKey.json");	

admin.initializeApp({	
  credential: admin.credential.cert(serviceAccount),	
  databaseURL: "https://store-45304.firebaseio.com"	
});	

module.exports = admin;