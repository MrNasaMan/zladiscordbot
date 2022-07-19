const Discord = require('discord.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

const prefix = '-';

const token = 'OTk0NjYzNzA1ODM5MTQ5MDc2.GFxloz.vj_o3BTZZkwOkJ6h3PkjlgGQTaXQ1SJn0EkDtM';


client.once('ready', () => {
  console.log('The ZLA Bot has Booted up the Scope!')

  

});



client.on('message', async message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const firstPart = command.slice(1, 4);
  const secondPart = command.slice(4, 7);
  const metarFirst = command.slice(0,4);
  const metarSecond = command.slice(4, 9);
 

  if (secondPart === 'apd'){
    const secondEmbed = new MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('K'+ firstPart.toUpperCase() + ' Airport Diagram')
    .setURL('https://flightaware.com/resources/airport/' + firstPart.toUpperCase() + '/APD/AIRPORT+DIAGRAM/pdf')
    .setDescription('K' + firstPart.toUpperCase() + ' Airport Diagram Can Be Found Here')
    .setImage('https://flightaware.com/resources/airport/' + firstPart.toUpperCase() + '/APD/AIRPORT+DIAGRAM/png')
	  message.channel.send({ embeds: [secondEmbed] });
  }
  if (command == 'checkroute'){
    message.reply('https://flightaware.com/statistics/ifr-route/')
  }
  if (command == 'charts'){
    message.reply('https://skyvector.com/')
  }
  if (command == 'wheretofly'){
    message.reply('https://fpltoif.com/random')
  }
  if (metarSecond === 'metar'){
    
    let getMetar = async () => {
      let response = await axios.get('https://api.checkwx.com/metar/' + metarFirst + '?x-api-key=ac348a7ad28f466aafd44dc34f');
      let metarr = response.data;
      return metarr;


    }
    let metarValue = await getMetar ();
    const exampleEmbed = new MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle(metarFirst.toUpperCase() +  ' Metar')
	  .setDescription(`${metarValue.data}`)
    .setTimestamp()
	  message.channel.send({ embeds: [exampleEmbed] });
  }

});


client.login('OTk0NjYzNzA1ODM5MTQ5MDc2.GFxloz.vj_o3BTZZkwOkJ6h3PkjlgGQTaXQ1SJn0EkDtM');










