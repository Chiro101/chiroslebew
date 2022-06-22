const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(`
  
░█████╗░██╗░░██╗██╗██████╗░░█████╗░
██╔══██╗██║░░██║██║██╔══██╗██╔══██╗
██║░░╚═╝███████║██║██████╔╝██║░░██║
██║░░██╗██╔══██║██║██╔══██╗██║░░██║
╚█████╔╝██║░░██║██║██║░░██║╚█████╔╝
░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░╚═╝░╚════╝░
By : ${chalkRainbow('iChiro#8103')} - Team : @RassGMS
`);

  const auth = rs.question('Masukan Authentication Code Kamu! : ');
  console.log('');

  while (true) {


    const result = await GoStumble(auth);
    if (!result) {

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

            console.log(chalkRainbow(`\r 
 -  [${moment().format('HH:mm:ss')}]  - 
 >  ${(`Negara By iChiro : ${country}`)} 
 >  ${(`Nama By iChiro : ${username}`)}   
 >  ${(`Piala By iChiro : ${trophy}`)}   
 >  ${(`Mahkota By iChiro : ${crown}`)} 
 >  ${(`Status : Success !`)}`)); 
       await sleep(6000);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Akun Luwh Ke Ban Dek`));
     break;
    }
  }


})();
