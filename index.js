// user = Admin;
// pass = 22NA3jt9bPaUEJK7;
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:22NA3jt9bPaUEJK7@cluster0.nkcer.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('Todo').collection('todoList');
        // get todos
        app.get('/todo', async (req, res) => {
            const query = {}
            const cursor = todoCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories)
        });
        // single details
        app.get('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const inventory = await todoCollection.findOne(query);
            res.send(inventory);

        })

        // post one inventory item
        app.post('/todo', async (req, res) => {
            const newTodo = req.body;
            const result = await todoCollection.insertOne(newTodo);
            res.send(result);
        })

        // delete inventory
        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(query);
            res.send(result)
        })

    


    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running The Todos Server');
});

app.listen(port, () => {
    console.log('Listening to port: ', port);
})

