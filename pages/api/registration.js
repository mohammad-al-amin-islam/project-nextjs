import fs from "fs";
import path from "path";

export function buildFunctionPath() {
  const filePath = path.join(process.cwd(), "fakedb", "fakedb.json");
  return filePath;
}

export function getDataFromFeedback(filePath) {
  const getData = fs.readFileSync(filePath);
  const data = JSON.parse(getData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    console.log(email);
    if(!email || !email.includes('@')){
      res.send(422).json({message: 'Invalid email address'});
      return;
    }

    const filePath = buildFunctionPath();
    const data = getDataFromFeedback(filePath);

    data.push({
      id: new Date().toISOString(),
      email: email,
    });

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "sign up success" });
  } else {
    res.status(200).json({ message: "error" });
  }
}

export default handler;
