import User from "../model/user.model.js";

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

const userLogin = async (req, res) => {
  try {
    const user = req.user;
    const token = user.generateAuthToken();

    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const userDelete = async (req, res) => {
  try {
    const user = req.user;
    await user.findOneAndDelete({ email });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const userUpdate = async (req, res) => {
  const { newUsername, newPassword } = req.body;
  try {
    const user = req.user;

    if (newUsername) user.username = newUsername;
    if (newPassword) user.password = newPassword;

    user.save();

    return res.status(200).json({ message: "User update successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export { userRegister, userLogin, userDelete, userUpdate };
