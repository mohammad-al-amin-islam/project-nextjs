const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://alamin:0TLhl4K3s4hXlspD@cluster0.t50bvmm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function handler(req, res) {
  const id = req.query.id;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "invalid data" });
      return;
    }

    const data = {
      email: email,
      name: name,
      text: text,
      eventId:id
    };

    await client.connect();

    const db = client.db("events");
    const collection = db.collection("comments");
    const result = await collection.insertOne(data)

    res.status(201).json({ result });
  }
  if (req.method == "GET") {
    await client.connect();

    const db = client.db("events");
    const collection = db.collection("comments");
    const query = { eventId: id }
    const result = await collection.find(query).sort({_id:-1}).toArray();
    res.status(201).json({ message: "success" , comments:result});
  }
}

export default handler;
