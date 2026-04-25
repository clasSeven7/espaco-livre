require('ts-node/register');

module.exports = {
  default: {
    require: ['./step-definitions/**/*.ts'],
    format: ['progress'],
    requireModule: ['ts-node/register'],
  },
};
