const admin = require("firebase-admin");
const path = require('path');

class FirestoreClient{
    constructor(){
        const jsonFile = './smash-344ec-firebase-adminsdk-rt6dl-5471691ac8.json'
        admin.initializeApp({
            credential: admin.credential.cert(path.join(__dirname, jsonFile)),
            projectId: "smash-344ec"
        });
        this.firestore = admin.firestore();
    }

    async addCountry(collection, country){
        const docRef = this.firestore.collection(collection).doc(country);
        await docRef.set({country});
    }

    async addCityToCountry(rootCol, rootDocName, subCol, city){
        const docRef = this.firestore.collection(rootCol).doc(rootDocName).collection(subCol).doc(city);
        await docRef.set({city});        
    }
}

module.exports = new FirestoreClient();