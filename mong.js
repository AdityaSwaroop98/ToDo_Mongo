const { ObjectID } = require('bson')
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task_manager'

mongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to Connect!')
    }
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    })
    db.collection('tasks').insertMany([{
        Topic: 'Getting Started with NodeJS',
        Description: 'Here We will Approach all the vital points and topics of NodeJS'
    }, {
        Topic: 'Getting Started with Python',
        Description: 'Here We will Approach all the vital points and topics of Python'
    }], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }
        console.log(result.ops)
    })
    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([7, 7, 7])
        }, 2000)
    })
    doWorkPromise.then((result) => {
        console.log('Success!', result)
    }).catch((error) => {
        console.log('Error!', error)
    })
    db.collection('users').updateOne({
        _id: new ObjectID("621f103742cf35a1fad572c4")
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})