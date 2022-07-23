

const Discord = require('discord.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');







const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

const prefix = '-';

const token = 'OTk0NjYzNzA1ODM5MTQ5MDc2.GKF61l.BDF6E0V8MuV17VFOUiO3J44v74Vq61WjBRcJY0';


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
  const infoFirst = command.slice(0,4);
  const infoSecond = command.slice(4, 8);
  const tecFirst = command.slice(0,3);
  const tecSecond = command.slice(3, 6);
  const tecThird = command.slice(6, 9);
  const onlineFirst = command.slice(0, 6);
  
 

  if (secondPart === 'apd'){
    const secondEmbed = new MessageEmbed()
	  .setColor('#0099ff')
	  .setTitle('**K**'+ firstPart.toUpperCase() + ' **Airport Diagram**')
    .setURL('https://flightaware.com/resources/airport/' + firstPart.toUpperCase() + '/APD/AIRPORT+DIAGRAM/pdf')
    .setDescription('K' + firstPart.toUpperCase() + ' Airport Diagram Can Be Found Here')
    .setImage('https://flightaware.com/resources/airport/' + firstPart.toUpperCase() + '/APD/AIRPORT+DIAGRAM/png')
	  message.channel.send({ embeds: [secondEmbed] });
  }
  if (command == 'checkroute'){
    message.reply('https://flightaware.com/statistics/ifr-route/')
  }
  if (command == 'wheretofly'){
    const randomEmbed = new MessageEmbed()
	  .setColor('#33FFC1')
	  .setTitle('**Looking for Somewhere to Fly?**')
    .setURL('https://flightaware.com/live/airport/random')
    .setDescription('Click Here to View the Details and Diagram of the Random Aiport ↑')
    .setTimestamp()
	  message.channel.send({ embeds: [randomEmbed] });
  }
    
  if (metarSecond === 'metar'){
    let getMetarr = async () => {
        let response = await axios.get('https://api.aviationapi.com/v1/weather/metar?apt=' + metarFirst);
        let metarrr = response.data;
        return metarrr
    
    }

    let getInfooo = async () => {
      let response = await axios.get('https://www.airport-data.com/api/ap_info.json?icao='+ metarFirst);
      let infooo = response.data;
      return infooo;
  }
    let infoooValue = await getInfooo ();
    let metar2Value = await getMetarr ()
    let name = metarFirst.toUpperCase()
    const metar2Embed = new MessageEmbed()
	  .setColor('#33E6FF')
	  .setTitle(`**METAR for** ${infoooValue.name} , ${infoooValue.location}  `)
	  .setDescription('**ICAO:** ' + metar2Value[name].station_id + '\n**Temperature:** ' +  metar2Value[name].temp + 'C°'+ '\n**DewPoint:** ' +  metar2Value[name].dewpoint + ' C°' + '\n**Wind Direction:** '+  metar2Value[name].wind + '\n**Wind Velocity:** ' + metar2Value[name].wind_vel + ' Kts'+  '\n**Visibility:** ' +  metar2Value[name].visibility +  ' Miles' +  '\n**Altimeter:** ' + metar2Value[name].alt_hg +  '\n**Flight Conditions:** ' + metar2Value[name].category + '\n**Raw Metar:** ' +  metar2Value[name].raw + '\n**Observed:** ' + metar2Value[name].time_of_obs  )
	  message.channel.send({ embeds: [metar2Embed] });

  }

  if (infoSecond === 'info'){
    let getInfo = async () => {
        let response = await axios.get('https://www.airport-data.com/api/ap_info.json?icao='+ infoFirst);
        let infoo = response.data;
        return infoo;
    }
    
    let getMetar = async () => {
          let response = await axios.get('https://api.checkwx.com/metar/' + metarFirst + '?x-api-key=ac348a7ad28f466aafd44dc34f');
          let metarr = response.data;
          return metarr;
  
    }
    let infooValue = await getInfo ();
    let metarValue = await getMetar ();
    const infoEmbed = new MessageEmbed()
	  .setColor('#9FFF33')
	  .setTitle(`**Information for** ${infooValue.name} `)
    .setURL('https://flightaware.com/resources/airport/' + firstPart.toUpperCase() + '/APD/AIRPORT+DIAGRAM/pdf')
    .setDescription(`**ICAO**: ${infooValue.icao} \n**IATA**: ${infooValue.iata} \n**Name**: ${infooValue.name} \n**Location**: ${infooValue.location} \n**Country**: ${infooValue.country} \n**Metar**: ${metarValue.data}`)
    .setImage('https://flightaware.com/resources/airport/' + firstPart.toUpperCase() + '/APD/AIRPORT+DIAGRAM/png')
    .setTimestamp()
	  message.channel.send({ embeds: [infoEmbed] });
  

}

if (tecThird === 'tec'){
  let getTec = async () => {
    let response = await axios.get('https://api.aviationapi.com/v1/preferred-routes/search?origin='+ tecFirst + '&dest=' + tecSecond);
    let Tecc = response.data;
   return Tecc;
  }
  let TeccValue = await getTec ();
  TeccValue.map(getTeccc);


  function getTeccc(item) {
    return ('\n**Origin:** ' + item.origin + '\n** Destination:**  ' + item.destination + '\n** Route:**  ' + item.route + '\n**Altitude:**  ' + item.altitude + '\n**Flow:**  ' + item.flow + '\n**Ops:**  ' + item.area.slice(-6) + '\n').toString()
  }
  
  const tecEmbed = new MessageEmbed()
  .setColor('#5E33FF')
	.setTitle(tecFirst.toUpperCase() + ' to ' + tecSecond.toUpperCase() + ' TEC Routes')
  .setDescription('' + TeccValue.map(getTeccc))
	message.channel.send({ embeds: [tecEmbed] });
  
  
}

if (command == 'cmds'){
  const cmdsEmbed = new MessageEmbed()
	  .setColor('FCFF33')
	  .setTitle('**Commands Available For Use**')
    .setDescription('**-icaometar** Shows the Metar for the Aiport(Some Aiports are not Covered)\n**-icaoinfo** Shows the Information for the Aiport \n**-icaoapd** Shows the Airport Diagram for the Specified Aiport(Only Works with Aiports under FAA Jurisdiction) \n**-wheretofly** Shows a Random Aiport Where You Can Fly To \n**-faafaatec** Shows TEC routes between two airports in ZLA airspace.(Uses the FAA Codes) ex.-sanlaxtec' )
	  message.channel.send({ embeds: [cmdsEmbed] });
  
}
if (command == 'help'){
  const helpEmbed = new MessageEmbed()
	  .setColor('#FF333F')
	  .setTitle('**Need Help?**')
    .setDescription('If you would like to report a bug please **DM Mr. Nasa Man#7426** \nFor help about the ARTCC please **DM the DATM** \nFor any suggestions please **DM Mr. Nasa Man#7426** \nFor any other inquires talk to either the **ATM or DATM of ZLA** \nTo see all of the commands try -cmds' )
	  message.author.send({ embeds: [helpEmbed] });
  
}

});


client.login('OTk0NjYzNzA1ODM5MTQ5MDc2.GKF61l.BDF6E0V8MuV17VFOUiO3J44v74Vq61WjBRcJY0');










