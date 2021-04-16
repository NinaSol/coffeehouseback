/* let admin = require("firebase-admin");
let serviceAccount = require("../serviceAccountKey.json");
let mailer = require('../mailer')
module.exports = {
    sendEmails(req,res) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ingreso-empleados-default-rtdb.firebaseio.com"
        });

        const listAllUsers = (nextPageToken) => {
            admin.auth().listUsers(1000, nextPageToken)
                .then((listUsersResult) => {
                    listUsersResult.users.forEach((userRecord) => {
                        mailer(userRecord.email)

                    });
                    if (listUsersResult.pageToken) {
                        listAllUsers(listUsersResult.pageToken);
                    }
                    return res.json({"message": "mail sent"})
                })
                .catch((error) => {
                    return res.json({"message": error})
                });
        };
    }


} */