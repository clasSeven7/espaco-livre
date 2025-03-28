import { setDefaultTimeout } from '@cucumber/cucumber';

// Define o tempo limite padrão para cada step (opcional)
setDefaultTimeout(10 * 1000);

export default {
  default: {
    require: ['./step-definitions/**/*.ts'],
    format: ['pretty'],
    requireModule: ['ts-node/register'],
  },
};
