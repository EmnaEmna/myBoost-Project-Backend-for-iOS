const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const nodemailer = require('nodemailer')


const JWT_SECRET='some super secret...';

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'espritpi2223@gmail.com',
	  pass: 'tqsixkvtcxwquztx'
	}
  });


//generate a random code with 8 numbers (works)
function generateCode() 
{
	var length = 8,
		charset = "0123456789",
		retVal = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}


//get profile  
async function getUser(req, res) {
  const { email } = req.query.email;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user object
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// reset password 
 async function resetPassword (req, res) {
	const { email, password,} = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(400).json({ error: "User don't exists" });
	} else {
		const token = generateCode();
		process.env.code=token;
		user.token = token;
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		res.status(200).json({ message: "password changed" })
			};
			};

function forgot_password(req,res,next){
  
  User.findOne({ "email": req.body.email }).then(user=>{
    if(!user) {
      console.log('No account with that email address exists.')
    }else{
      const secret = JWT_SECRET + user.password;
      const payload = {username: user.username,email:user.email};
      const token = jwt.sign(payload,secret,{expiresIn: '5m'});
      console.log('req.headers.host'+ 'verification lien de host ');
      const link = `https://${req.headers.host}/api/userp/reset_password/${user.email}/${token}`
      console.log(link);
      res.status(200).json({msg:`password send to your email Mr./Mrs ${user.username}`});

      var mailOptions = {
        from: 'espritpi2223@gmail.com',
        to: req.body.email,
        subject: 'Password Reset Email ' ,
        text: `click the link to reset password ${link}`  ,
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        });
      

    }
  });
}
///reset_password_get/:email/:token
function reset_password_get(req,res,next){
  User.findOne({ "email": req.params.email }).then(user=>{
    if(!user) {
      res.send('No account with that email address exists.')
    }else {
      const secret = JWT_SECRET + user.password;
      try{
        const payload = jwt.verify(req.params.token, secret)
        res.render('reset-password',{email: user.email})
      } catch(error){
        console.log(error.message)
        res.send(error.message)
      }
    }
  });
}
async function reset_password_post(req,res){
  const {password,password2} = req.body
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt)
  User.findOne({ "email": req.params.email }).then(user=>{
    if(!user) {
      res.send('No account with that email address exists.')
    }else {
      const secret = JWT_SECRET + user.password;
      if(password === password2){
      try{

        const payload = jwt.verify(req.params.token, secret);
        user.password = hashedPassword;
        user.save();
        res.send("password reset successfully")
        
      } catch(error){
        console.log(error.message)
        res.send(error.message)
      }
    }else{res.send("password mismatch")}
    }
  });
}



//MODIFY PROFILE

async function editUser  (req, res) {
	const {email, name,} = req.body;
	const user = await User.findOne({ email });

       if (name === ''){ 
        res.json("username is empty")
        return "user is empty"
    }

    if ( name!= ''){ 
		if(user.email == email){
			user.name = name; 
			user.save();
		}
		else {
			res.json("email don't match")
		}
       
    }
    console.log("profile updated")
    return res.json({user})
};


//edit profile items 
// async function patchOnce(req, res) {
//   try {
//     const { name, email } = req.body;

//     const doc = await User.findOneAndUpdate({ name, email });
//     res.status(200).json(doc);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// }
async function updateUserInfo(req, res) {
  try {
    const userId = req.params.id;
    //const { name, email } = req.body;
    const { name, email } = req.body;


    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}



  
async function updateUserPassword(req, res) {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user document in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

 async function addPost(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: "No token provided" });
  }

  const {babyName, birthday, gender } = req.body;
  const decoded = jwt.verify(token, process.env.secret);

  const id = decoded.id;
  const user = await User.findById(id);
  console.log(token);
  console.log(id);
  if (!user) {
      res.status(400).json({ error: "User not found" });
  } else {
      const baby = await Baby.findOne({ parent: id, babyName: babyName });
      if (baby) {
          res.status(401).json({ error: "Baby already exists" });
      } else {
          const newBaby = new Baby({
              babyName: babyName,
              parent: id,
              birthday: birthday,
              gender: gender,
              babyPic: `${req.protocol}://${req.get("host")}/media/images/${
        req.file.filename
      }`,
          });
          console.log(newBaby);
          await newBaby.save();

          res.status(200).json(newBaby);
      }
  }
}
/*


const multer  = require('multer');


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Handle file upload
async function  uploadFile  (req, res, next)  {
  try {
    // Perform asynchronous operation here
    const filePath = await saveFileToDatabase(req.file);

    res.send(`File uploaded successfully. Path: ${filePath}`);
  } catch (error) {
    next(error);
  }
};

async function saveFileToDatabase (file)  {
  // Perform asynchronous database operation here
  const filePath = await database.saveFile(file);

  return filePath;
};*/







/*
async function patchOnce(req, res) {
  try {
    const { name, email } = req.body;
    const { id } = req.userData;

    const doc = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}*/
/*

async function putOnce(req, res) {
  try {
    const doc1 = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(doc1);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}*/


//get all
// async function getAll(req, res) {
//   Match.find({})
//     .then((docs) => {
//       let list = [];
//       for (let i = 0; i < docs.length; i++) {
//         list.push({
//           id: docs[i]._id,
//           date: docs[i].date,
//           teamHome: docs[i].teamHome,
//           teamAway: docs[i].teamAway,
//           nbPlaces: docs[i].nbPlaces,
//         });
//       }
//       res.status(200).json(list);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }

//get once
/*
 async function getOnce(req, res) {
  try {
    const doc = await User.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}*/
/*
async function getOnce(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    const userId = decodedToken.userId; // Extract user ID from JWT payload
    const user = await User.findById(userId); // Fetch user data from database

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}*/



async function getOnce(req, res) {
  try {
    const user = await User.findById(req.userData._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


 async function uploadimage(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: "No token provided" });
  }

  const {babyName, birthday, gender } = req.body;
  const decoded = jwt.verify(token, process.env.secret);

  const id = decoded.id;
  const user = await User.findById(id);
  console.log(token);
  console.log(id);
  if (!user) {
      res.status(400).json({ error: "User not found" });
  } else {
      const baby = await Baby.findOne({ parent: id, babyName: babyName });
      if (baby) {
          res.status(401).json({ error: "Baby already exists" });
      } else {
          const newBaby = new Baby({
              babyName: babyName,
              parent: id,
              birthday: birthday,
              gender: gender,
              babyPic: `${req.protocol}://${req.get("host")}/media/images/${
        req.file.filename
      }`,
          });
          console.log(newBaby);
          await newBaby.save();

          res.status(200).json(newBaby);
      }
  }
}






module.exports = {

  getUser,editUser,resetPassword,forgot_password,reset_password_get,reset_password_post,getOnce,updateUserInfo,updateUserPassword,uploadimage,addPost,

}
