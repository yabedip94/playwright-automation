export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345'
  },

  invalid: {
    username: 'invalid_user',
    password: 'wrong_password'
  },

  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },

  emptyPassword: {
    username: 'standard_user',
    password: '',
  },

  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },

  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },

  error: {
    username: 'error_user',
    password: 'secret_sauce',
  },

  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
};
