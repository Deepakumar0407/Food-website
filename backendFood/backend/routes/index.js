var express = require('express');
var router = express.Router();

var Student = require('../models/register');
var Food = require('../models/food');

let { encryptPassword, comparePasswords, generateJwt } =
  require('../utils/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// food starts
router.post('/addsstudent', async (req, res) => {
  try {
      let food = await new Food(req.body).save();
  }
  catch (err) {
      res.json({ message: err.message, success: false })
  }
});


router.get('/getstudent', async (req, res) => {
  try {
      const getstudent = await Food.find().exec();
      res.json(getstudent);
  }
  catch (err) {
      res.json({ message: err.message, success: false })

  }
});
//food ends

router.post('/addsstudent', async (req, res) => {
  try {
      let student = await new Student(req.body).save();
      res.json({ message: "User Added Successfully", 
      data: student, success: true })
  }
  catch (err) {
      res.json({ message: err.message, success: false })
  }
});


router.get('/getstudent', async (req, res) => {
  try {
      const getstudent = await Student.find().exec();
      res.json(getstudent);
  }
  catch (err) {
      res.json({ message: err.message, success: false })

  }
});


router.post('/updatestudent/:id', async (req, res) => {
  try {
    console.log(req.body);
     let student=  await Student.updateOne(req.body.id, { name: req.body.name,email:req.body.email}).exec();
      res.json({ message: "User Successfully Updated",
       data :student, success: true });
  }
  catch (err) {
      res.json({ message: err.message, success: false })

  }
});

router.post('/deletestudent/:id', async (req, res) => {
  try {
    console.log(req.body._id)
     const newList= await Student.deleteOne(req.body._id).exec();
      res.json(newList);
  }
  catch (err) {
      res.json({ message: err.message, success: false })

  }
});


// User Register API starts here 

// router.post('/register', async (req, res) => {
//   try {

//     const userEmailCheck =
//       await Student.findOne(
//         { email: new RegExp(`^${req.body.email}$`, 'i') }).exec();

//     console.log(userEmailCheck);
//     if (userEmailCheck) 
//       throw new Error('Email already registered');
//       // console.log("Email Altready Registered")
//       // res.status(400).json({ message: "Email already registered", success: false });
    



//     req.body.password = await encryptPassword(req.body.password);

//     let student = await new Student(req.body).save();
//     res.status(200).json({ message: "User Register Successfully", 
//     data: student, success: true });


//     //   await nodemail('contact@jiorooms.com', req.body.email, 'Registration Successfull', "You have been successfully registered")
//     //   res.json({ message: 'Student Registered', success: true });

//   }
//   catch (err) {
//     console.error(err);
//     if (err.message)
//       res.json({ message: err.message, data: err, success: false });
//     else
//       res.json({ message: 'Error', data: err, success: false });
//   }
// })


router.post('/register', async (req, res) => {
  try {

    const StudentEmailChk = await Student.findOne({ email: new RegExp(`^${req.body.email}$`, 'i') }).exec();
    console.log(StudentEmailChk)
    if (StudentEmailChk)
      // throw new Error('Email already registered');
      return res.status(400).send({ message: "Email Already Registered" });
    
    req.body.password = await encryptPassword(req.body.password);

    await new Student(req.body).save();
    // await nodemail('contact@jiorooms.com', req.body.email, 'Registration Successfull', "You have been successfully registered")
    // res.json({ message: 'Student Registered', success: true });

  }
  catch (err) {
    console.error(err);
    if (err.message)
      res.json({ message: err.message, data: err, success: false });
    else
      res.json({ message: 'Error', data: err, success: false });
  }
})


//   User Register API Close


// User Login API Starts Here

router.post('/login', async (req, res) => {
   try {

     const student =
       await Student.findOne
         ({
          email: new
             RegExp(`^${req.body.email}$`, 'i')
        }).exec();

  
     if (!student)
       throw new Error("You are not registered");

     const checkPassword = await
       comparePasswords(req.body.password, student.password);

     if (!checkPassword)
       throw new Error("Check Your Credentials");

    const token = await generateJwt(Student._id);
     res.json({ message: 'Logged In', data: token, success: true });

   }
   catch (err) {
     console.error(err);
     if (err.message)
       res.json({ message: err.message, data: err, success: false });
    else
       res.json({ message: 'Error', data: err, success: false });
   }
 })







module.exports = router;

