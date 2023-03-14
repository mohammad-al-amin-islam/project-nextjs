function handler(req, res) {
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
      id: new Date().toISOString(),
      email: email,
      name: name,
      text: text,
    };

    res.status(201).json({ message: "success", data: data });
  }
  if (req.method == "GET") {
    const dummyData = [
      { id: 1, username: "alamin" },
      { id: 2, username: "alamin" },
    ];
    res.status(201).json({ message: "success" , comments:dummyData});
  }
}

export default handler;
