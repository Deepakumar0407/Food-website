var express = require('express');
var router = express.Router();

var Student = require('../models/register')

let { encryptPassword, comparePasswords, generateJwt } =
  require('../utils/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async (req, res) => {
  try {

    const student =
      await Student.findOne
        ({
          email: new
            RegExp(`^${req.body.email}$`, 'i')
        }).exec();

  
    if (!student){
      // throw new Error("You are not registered", {success:false});
			return res.status(401).json({ message: "Invalid Email" });


    }

    const checkPassword = await
      comparePasswords(req.body.password, student.password);

    if (!checkPassword)
      // throw new Error("Check Your Credentials", {success:false, message:"incorrect password"});
			return res.status(401).send({ message: "Invalid Password" });

    const token = await generateJwt(Student._id);
    console.log(token);
    // res.status(200).json({ message: 'Logged In', data: token, success: true });
		res.status(200).send({ data: token, message: "logged in successfully" });

  }
  catch (err) {
    console.error(err);
    if (err.message)
    res.status(500).send({ message: "Internal Server Error" });

    else
      res.json({ message: 'Error', data: err, success: false });
  }
})

module.exports = router;
