module.exports = {
    type: 'object',
    properties: {
      user: {
        type: 'string',
        description: 'ID of the user associated with the group',
      },
      name: {
        type: 'string',
        required: true,
        description: 'Name of the group',
      },
      year: {
        type: 'string',
        description: 'Year of the group',
      },
      classroom: {
        type: 'string',
        description: 'Classroom of the group',
      },
      emails: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'List of emails associated with the group',
      },
    },
    required: ['name'],
  };
  