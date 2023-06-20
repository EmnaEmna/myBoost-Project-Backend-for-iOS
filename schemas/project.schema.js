module.exports = {
  type: 'object',
  properties: {
    group: {
      type: 'string',
      description: 'ID of the group associated with the project',
    },
    name: {
      type: 'string',
      description: 'Name of the project',
    },
    gitlink: {
      type: 'string',
      description: 'Git link of the project',
    },
    text: {
      type: 'string',
      description: 'Text value of the project',
    },
    assignedto: {
      type: 'string',
      description: 'User assigned to the project',
    },
    deadline: {
      type: 'string',
      description: 'Deadline of the project',
    },
    status: {
      type: 'string',
      enum: ['done', 'doing', 'to do'],
      description: 'Status of the project',
    },
  },
  required: ['group', 'name', 'gitlink', 'text', 'assignedto', 'deadline', 'status'],
};
