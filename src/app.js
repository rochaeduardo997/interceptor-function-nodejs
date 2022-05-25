const { promises } = require('fs');

async function run(){
  const fileTarget = 'secure-file.txt.enc';
  const text       = `test ${new Date().toString()}`;

  await promises.writeFile(fileTarget, text);

  console.log('decryted content: ', (await promises.readFile(fileTarget)).toString());
}

module.exports = { run };