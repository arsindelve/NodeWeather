const connectionUrl = 'mongodb://192.168.4.66:27017';
const databaseName = 'task-manager';
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect(connectionUrl, {
    useNewUrlParser: true
}, (error, client) => {

    if (error) {
        console.log("Cannot connect to database");
        return;
    }

    const db = client.db(databaseName);


    db.collection("tasks").updateOne({_id: new ObjectId('63223241619e5c3f4d2e00c9')},
        {
            $set: { completed: true }
        })

        .then((result) => {
            console.log(result);
        })

        .catch((error) => {
            console.log(error);


            /*db.collection("users").findOne({_id: new ObjectId('631f5ceb4f8cf47668a27815')}, (error, user)=>{
                if(error){
                    console.log(error);
                    return;
                }

                console.log(user);

            });*/

            /*db.collection("tasks").find({completed: false}).toArray((error, users) => {
                console.log(users);
            });*/


            /*
            db.collection("tasks").insertMany([
                {
                    description: "Get a passport",
                    completed: true
                }, {
                    description: "Pack a bag",
                    completed: false
                }, {
                    description: "Order an UBER to get to the airport.",
                    completed: false
                }
            ], (error, result) => {
                if (error) {
                    console.log("unable to create ");
                    return;
                }
                console.log(result.ops);
            });*/

        });

});

