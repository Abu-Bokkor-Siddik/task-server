const express = require("express");
const app = express();
const cors = require("cors");
const port = 3006;
app.use(express.json());
app.use(cors());

// task-management
// qSAP4FBgs3FKvdhD

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://task-management:qSAP4FBgs3FKvdhD@cluster0.kkqbu90.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const taskCollection = client.db("task").collection("tasks");
    // post task
    app.post("/tasks", async (req, res) => {
      try {
        const userTask = req.body;
        const result = await taskCollection.insertOne(userTask);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    // get all task
    app.get("/tasks", async (req, res) => {
      console.log(req.query);
      try {
        const email = req.query.email;
        const query = { email: email };
        const result = await taskCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
    // delete task
    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });
    // get singel data
    app.get("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(query);
      res.send(result);
    });
    // update data
    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upset: true };
      const becomeUp = req.body;
      // console.log(req.body)
      const update = {
        $set: {
          title2:becomeUp.title2,
          Description:becomeUp.Description,
          Deadline:becomeUp.Deadline ,
          Hight:becomeUp.Hight,
          
        },
      };
      const result = await taskCollection.updateOne(filter, update, options);
      res.send(result);
    });
// updata drag and drop 
app.put("/drag/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upset: true };
  const becomeUp = req.body;
  // console.log(req.body)
  const update = {
    $set: {
      title2:becomeUp.status,
     
    },
  };
  const result = await taskCollection.updateOne(filter, update, options);
  res.send(result);
});
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
