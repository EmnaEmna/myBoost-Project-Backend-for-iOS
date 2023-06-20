const mongoose = require('mongoose')
//const Group = require('../models/groupModel')
// group : Group.Schema


const projectSchema = mongoose.Schema(
    { 

          group: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Group',
          },
          
          name: {
            type: String,
            required: [true, 'Please add a text value'],
          },
    
          gitlink: {
            type: String,
            required: [true, 'Please add a git link'],
          },
          text: {
            type: String,
            required: [true, 'Please add a text value'],
          },
          assignedto: {
            type: String,
            required: [true, 'Please add a text value'],
          },
          deadline: {
            type: String,
            required: [true, 'Please add a text value'],
          },
          status: {
            type: String,
            enum: ["done", "doing", "to do"],
            required: [true, "Please add a value for status"],
          },
         
    }
);

module.exports = mongoose.model('Project', projectSchema)
