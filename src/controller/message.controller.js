import Message from "../model/message.model.js";
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log(req.body);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export {};
