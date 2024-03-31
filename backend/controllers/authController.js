const { getDB } = require("../config/db");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log("Res : ", req.body.employeeID, "pwd :", req.body.password);
  try {
    const db = getDB();
    const user = await db.collection("allUsers").findOne({
      mobile: req.body.mobile,
      password: req.body.password,
    });

    console.log(user);

    if (user) {
      // Successful login
      const token = jwt.sign({ uID: user.uID }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Fetch necessary fields from the user and send them in the response
      const { _id, email, employeeID, name, accessLevel } = user;
      res.json({
        success: true,
        message: "Login successful",
        token,
        user: { _id, email, employeeID, name, accessLevel },
      });
    } else {
      // Failed login
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const signup = async (req, res)=>{
  
}


module.exports = { login , signup };
