import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(10 * 1000);

export default {
  default: {
    require: ['./step-definitions/**/*.ts'],
    format: ['progress'],
    requireModule: ['ts-node/register'],
  },
};
