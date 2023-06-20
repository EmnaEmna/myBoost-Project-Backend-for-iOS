module.exports = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      groups: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      role: {
        type: 'string',
      },
    },
    required: ['email', 'password'],
  };
  