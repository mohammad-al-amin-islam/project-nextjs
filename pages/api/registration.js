// import fs from "fs";
// import path from "path";

// export function buildFunctionPath() {
//   const filePath = path.join(process.cwd(), "fakedb", "fakedb.json");
//   return filePath;
// }

// export function getDataFromFeedback(filePath) {
//   const getData = fs.readFileSync(filePath);
//   const data = JSON.parse(getData);
//   return data;
// }
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://alamin:0TLhl4K3s4hXlspD@cluster0.t50bvmm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.send(422).json({ message: "Invalid email address" });
      return;
    }

    //store data using fs
    // const filePath = buildFunctionPath();
    // const data = getDataFromFeedback(filePath);
    // data.push({
    //   id: new Date().toISOString(),
    //   email: email,
    // });
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // Use connect method to connect to the server
    await client.connect();

    const db = client.db("events");
    const collection = db.collection("newsletterEmail");
    try {
      const result = await collection.insertOne({ email });
      res.status(201).json({ message: result });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(200).json({ message: "error" });
  }
}

export default handler;
