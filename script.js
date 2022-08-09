const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://laartcc.org/topten';
const Discord = require('discord.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
var toptenText = [];



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

const prefix = '-';

const token = 'OTk0NjYzNzA1ODM5MTQ5MDc2.GWIbiY.2ikFwhiIs03KEJEXs0bn8EtwnU94zL_u1hedfw';


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
  const statsSecond = command.slice(5, 13);
  const statsfirst = command.slice(0, 5);
  const topten = command.slice(0, 8);
 

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
    .setDescription('**-icaometar** Shows the Metar for the Aiport(Some Aiports are not Covered)\n**-icaoinfo** Shows the Information for the Aiport \n**-icaoapd** Shows the Airport Diagram for the Specified Aiport(Only Works with Aiports under FAA Jurisdiction) \n**-wheretofly** Shows a Random Aiport Where You Can Fly To \n**-faafaatec** Shows TEC routes between two airports in ZLA airspace.(Uses the FAA Codes) ex.-sanlaxtec\n**-stats[id]** Shows the statistics for the specific id \n**-tophours** Shows the current Controllers With the Most Hours ' )
	  message.channel.send({ embeds: [cmdsEmbed] });
  
}
if (command == 'help'){
  const helpEmbed = new MessageEmbed()
	  .setColor('#FF333F')
	  .setTitle('**Need Help?**')
    .setDescription('If you would like to report a bug please **DM Mr. Nasa Man#7426** \nFor help about the ARTCC please **DM the DATM** \nFor any suggestions please **DM Mr. Nasa Man#7426** \nFor any other inquires talk to either the **ATM or DATM of ZLA** \nTo see all of the commands try -cmds' )
	  message.author.send({ embeds: [helpEmbed] });
  
}
if (statsfirst === 'stats'){
  let getStats= async () => {
    let response = await axios.get('https://api.vatsim.net/api/ratings/'+ statsSecond + '/');
    let stat = response.data;
    return stat;
}
  let getStats2= async () => {
    let response = await axios.get('https://api.vatsim.net/api/ratings/' + statsSecond + '/rating_times/');
    let stat2 = response.data;
    return stat2;
}

  let StatsValue = await getStats();
  let Stats2Value = await getStats2();
  const Stats2Embed = new MessageEmbed()
  .setColor('#33E6FF')
  .setTitle(`Stats for User ID: ${StatsValue.id}`)
  .setDescription(`**Region:** ${StatsValue.region} \n**Division:** ${StatsValue.division}\n **Controller Rating:** ${StatsValue.rating} \n**Pilot Rating:** ${StatsValue.pilotrating} \n --------**Overall Times**-------- \n**Overall ATC** ${Stats2Value.atc} \n**S1:** ${Stats2Value.s1} \n**S2:** ${Stats2Value.s2} \n**S3:** ${Stats2Value.s3} \n**C1** ${Stats2Value.c1} \n**C3** ${Stats2Value.c3} \n**I1:** ${Stats2Value.i1}  \n**Overall Pilot** ${Stats2Value.pilot} \n----------------------------- \n **Register Date:** ${StatsValue.reg_date} \n**Last Rating Change:** ${StatsValue.lastratingchange} `)
  message.channel.send({ embeds: [Stats2Embed] });

}

if (topten == 'tophours'){
  puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(1) > a').each(function() {
      toptenText.push({
        Localfirst: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(1) > span.float-right').each(function() {
      toptenText.push({
        LocalTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(2) > a').each(function() {
      toptenText.push({
        Localsecond: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(2) > span.float-right').each(function() {
      toptenText.push({
        LocalSecondTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(3) > a').each(function() {
      toptenText.push({
        Localthird: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(3) > span.float-right').each(function() {
      toptenText.push({
        LocalThirdTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(1) > a').each(function() {
      toptenText.push({
        Traconfirst: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(1) > span.float-right').each(function() {
      toptenText.push({
        TraconTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(2) > a').each(function() {
      toptenText.push({
        Traconsecond: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(2) > span.float-right').each(function() {
      toptenText.push({
        TraconsecondTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(3) > a').each(function() {
      toptenText.push({
        Traconthird: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(3) > span.float-right').each(function() {
      toptenText.push({
        TraconThirdTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(1) > a').each(function() {
      toptenText.push({
        Enroutefirst: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(1) > span.float-right').each(function() {
      toptenText.push({
        EnrouteTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(2) > a').each(function() {
      toptenText.push({
        Enroutesecond: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(2) > span.float-right').each(function() {
      toptenText.push({
        EnrouteSecondTime: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(3) > a').each(function() {
      toptenText.push({
        Enroutethird: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(3) > span.float-right').each(function() {
      toptenText.push({
        EnrouteThirdTime: $(this).text(),
      });
    });
    const toptenEmbed = new MessageEmbed()
	  .setColor('#11A655')
	  .setTitle('**Controllers With the Most Hours Currently**')
    .setDescription(`**--------Local--------**\n**1st:** ${toptenText[0].Localfirst} ${toptenText[1].LocalTime} \n**2nd:** ${toptenText[2].Localsecond} ${toptenText[3].LocalSecondTime} \n**3rd:** ${toptenText[4].Localthird} ${toptenText[5].LocalThirdTime}  \n**--------Tracon-------**\n**1st:** ${toptenText[6].Traconfirst} ${toptenText[7].TraconTime} \n**2nd:** ${toptenText[8].Traconsecond} ${toptenText[9].TraconsecondTime} \n**3rd:** ${toptenText[10].Traconthird} ${toptenText[11].TraconThirdTime} \n**--------Enroute------**\n**1st:** ${toptenText[12].Enroutefirst} ${toptenText[13].EnrouteTime} \n**2nd:** ${toptenText[14].Enroutesecond} ${toptenText[15].EnrouteSecondTime} \n**3rd:** ${toptenText[16].Enroutethird} ${toptenText[17].EnrouteThirdTime} `)
	  message.channel.send({ embeds: [toptenEmbed] });
  })
  .catch(console.error);

  
  
    
  
  
}
});


client.login('OTk0NjYzNzA1ODM5MTQ5MDc2.GWIbiY.2ikFwhiIs03KEJEXs0bn8EtwnU94zL_u1hedfw');










