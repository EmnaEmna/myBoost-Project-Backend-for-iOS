const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
  {

    email: {
      type: String,
      //required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    name: {
      type: String,
      // required: [true, 'Please add a name'],
    },
    groups: {

      type: Array

    },
    role: {

      type: String

    }

  },
  {
    timestamps: true,
  }
)


/*
 groups :[
      {
        type: mongoose.Types.Schema,
        default : [],
        ref :'Group'

      }
    ]
    */
module.exports = mongoose.model('User', userSchema)
