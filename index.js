const app              = require('./src/app');
const CryptoHelper     = require('./src/cryptoHelper');
const CustomFSPromises = require('./src/customFSPromises');
const Decorator        = require('./src/decorator');

;(async () => {
  const config           = { cryptoKey: 'minha-senha-super-segura' };
  const cryptoHelper     = await CryptoHelper.setup(config);
  const customFSPromises = new CustomFSPromises({ cryptoHelper }).configure();

  Decorator.decorateModule(customFSPromises, require('fs').promises);

  await app.run();
})();