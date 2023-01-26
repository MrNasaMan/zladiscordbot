const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://laartcc.org/topten';
const Discord = require('discord.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
var ifrText = [];
var toptenText = [];
var eventText = [];
const url2 = 'https://laartcc.org';
const dateText = []
const request = require('request');
var flightGenerator = require('random-flight-generator');












const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

const prefix = '!';

const token = 'token here';





client.once('ready', () => {
  console.log('Logged In')

  setInterval(function() {
    axios.get('https://www.timeapi.io/api/Time/current/zone?timeZone=US/Pacific')
    .then(function (response) {
    if (response.data.date.slice(3,5) == '28'){ 
    const url4 = 'https://laartcc.org/topten';
    puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
    return page.goto(url4, {waitUntil: 'load', timeout: 0}).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(1) > a').each(function() {
      dateText.push({
      LocalWinner: $(this).text(),
    });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-danger > ul > li:nth-child(1) > span.float-right').each(function() {
      dateText.push({
      LocalTimer: $(this).text(),
      });
    });
      
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(1) > a').each(function() {
      dateText.push({
      TraconWinner: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-success > ul > li:nth-child(1) > span.float-right').each(function() {
      dateText.push({
      TraconTimer: $(this).text(),
      });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(1) > a').each(function() {
     dateText.push({
     EnrouteWinner: $(this).text(),
     });
    });
    $('body > div.container.pt-2 > div:nth-child(2) > div.col-md-9 > div:nth-child(3) > div.card.border-primary > ul > li:nth-child(1) > span.float-right').each(function() {
      dateText.push({
      EnrouteTimer: $(this).text(),
      });
    });
    const miniu = dateText[1].LocalTimer.slice(3,5)
    const miniu2 = dateText[3].TraconTimer.slice(3,5)
    const miniu3 = dateText[5].EnrouteTimer.slice(3,5)
    const timer1 = 'minutes'
    const timer2 = 'minutes'
    const timer3 = 'minutes'
    if (miniu == '01'){
      timer1 = 'minute'
    }else if (miniu == '00'){
      timer1 = ' '
    }
    if (miniu2 == '01'){
      timer2 = 'minute'
    }else if (miniu2 == '00'){
      timer2 = ' '
    }
    if (miniu3 == '01'){
      timer3 = 'minute'
    }else if (miniu3 == '00'){
      timer3 = ' '
    }
    const tophurEmbed = new MessageEmbed()
    .setColor('0x5f5e66')
    .setTitle('**Top Controllers of the Month**')
    .setDescription('Good afternoon aviatiors, every month we look at and find the controller with the most hours in three categories, local, tracon, and enroute.The winners for this month are the following:\n\n**Local:**\n'+'`'+`${dateText[0].LocalWinner}`+'`'+ ' with a time of ' +'`' +`${dateText[1].LocalTimer.slice(0,2)}`+' hours'+'`'+  ' and ' + '`'+`${dateText[1].LocalTimer.slice(3,5)}` + ' '+ timer1+'`'+ '\n**Tracon:**\n' + '`'+`${dateText[2].TraconWinner}`+'`'+ ' with a time of ' +'`' +`${dateText[3].TraconTimer.slice(0,2)}`+' hours'+'`' +' and ' + '`' +`${dateText[3].TraconTimer.slice(3,5)}` +' '+timer2+'`'+ '\n**Enroute:**\n' + '`'+`${dateText[4].EnrouteWinner}`+'`'+ ' with a time of ' +'`' +`${dateText[5].EnrouteTimer.slice(0,2)}`+' hours'+'`' +' and ' + '`' +`${dateText[5].EnrouteTimer.slice(3,5)}`+' '+timer3+'`'+ '\n\nCongratulations to all three controllers for winning this months top controllers list. Special thanks to all the controllers who provided ATC coverage this month in ZLA!')
    .setFooter({ text: 'Winners are announced on the 28th of each month. Bot coded by DY and BY ', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
    client.channels.cache.get("612409520387391621").send({ embeds: [tophurEmbed] });
    })
      
    }else{
      console.log('not today')
    }
    
  })
    }, 86400000);

    
});




client.on('message', async message =>{

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
 

  
  if (message.content.startsWith('!ifrroute')){
    
    const analyzer2 = message.content.split(' ')[1];
    const analyzer3 = message.content.split(' ')[2];
   
  const url3 = 'https://flightaware.com/analysis/route.rvt?origin=' + analyzer2.toUpperCase() + '&destination=' + analyzer3.toUpperCase()
    
    puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
    return page.goto(url3, {waitUntil: 'load', timeout: 0}).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    ifrText = []
    $('#mainBody > div.pageContainer > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td:nth-child(5) > a').each(function() {
      ifrText.push(
        $(this).text(),
      );
    });
    $('#mainBody > div.pageContainer > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td:nth-child(5) > a').each(function() {
        ifrText.push(
          $(this).text(),
        );
    });
      
    $('#mainBody > div.pageContainer > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td:nth-child(5) > a').each(function() {
        ifrText.push(
          $(this).text(),
        );
    });
    
    var text2=[];
      ifrText.forEach((item, index) => {
        text2 += index + ": " + item + "\n"; 
      });
      const analyzerEmbed = new MessageEmbed()
      .setColor('0x5f5e66')
      .setTitle(analyzer2.toUpperCase() + ' to ' + analyzer3.toUpperCase() + ' IFR routes in terms of popularity')
      .setDescription('`'+text2.toString() +'`')
      .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Routes provided by FlightAware', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
      if (text2[0] == '0') {
        message.channel.send({ embeds: [analyzerEmbed] });
      }else{
        const error4Embed = new MessageEmbed()
        .setColor('0xff0000')
        .setTitle('**Error!**')
        .setDescription('No Route Found.')
        .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. ', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
        message.channel.send({ embeds: [error4Embed] });
      }
    
  
  
  })
  }
    

if (message.content.startsWith('!tec')){
  const tecSecond = message.content.split(' ')[1];
  const tecFirst = message.content.split(' ')[2];
  async function getTec () {
    try {
      let response = await axios.get('https://api.aviationapi.com/v1/preferred-routes/search?origin='+ tecFirst + '&dest=' + tecSecond)
      let Tecc = response.data;
      return Tecc;
    
    } catch (e) {
      console.log(e.response)
    }
    }
  let TeccValue = await getTec ();
  TeccValue.map(getTeccc);
  function getTeccc(item) {
    return ('\n**Origin:** ' + item.origin + '\n** Destination:**  ' + item.destination + '\n** Route:**  ' + item.route + '\n**Altitude:**  ' + item.altitude + '\n**Flow:**  ' + item.flow + '\n**Ops:**  ' + item.area.slice(-6) + '\n').toString()
  }
  if (TeccValue[0]?.d_artcc === 'ZLA') {
  const tecEmbed = new MessageEmbed()
  .setColor('0x5f5e66')
	.setTitle(tecFirst.toUpperCase() + ' to ' + tecSecond.toUpperCase() + ' TEC Routes')
  .setDescription('' + TeccValue.map(getTeccc))
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Routes provided by AviationAPI', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	message.channel.send({ embeds: [tecEmbed] });
}else{
  const error3Embed = new MessageEmbed()
  .setColor('0xff0000')
  .setTitle('**Error!**')
  .setDescription('No TEC route found.')
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. ', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [error3Embed] });
}
  
  
}
if (message.content.startsWith('!help')){
  
  const helpEmbed = new MessageEmbed()
	  .setColor('0x5f5e66')
	  .setTitle('**Need Help?** \nBot Prefix = "!"')
    .setDescription('**For bug reports, suggestions, or feedback please fill out this Google Form.**\nhttps://forms.gle/SC2JaXmnxYM1DvEe9\n**To view all of the commands try !cmds**\n**For general inquires please contact ZLA staff members.**')
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Weather and airport information provided by AVWX. Digital ATIS provided by https://datis.clowd.io/. TEC routes provided by AviationAPI. IFR routes provided by FlightAware VATSIM stats provided by the VATSIM and VATUSA API.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.author.send({ embeds: [helpEmbed] });
  
}
if (message.content.startsWith('!stats')) {
  const statsSecond = message.content.split(' ')[1];
  async function getStats () {
    try {
      let response = await axios.get('https://api.vatusa.net/v2/user/' + statsSecond);
      let stat = response.data;
      return stat;
    } catch (e) {
      console.log(e)
    }
    }

async function getStats2 () {
try {
    let response = await axios.get('https://api.vatsim.net/api/ratings/' + statsSecond + '/rating_times/');
    let stat2 = response.data;
    return stat2;
} catch (e) {
  console.log(e)
}
}
  let statValue = await getStats();
  let stat2Value = await getStats2();
  let somet = 'data';
  if (typeof stat2Value === 'undefined'){
    const error2Embed = new MessageEmbed()
    .setColor('0xff0000')
	  .setTitle('**Error!**')
    .setDescription('No user found. Please use a valid CID. You can find yours at https://my.vatsim.net/profile')
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. ', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.channel.send({ embeds: [error2Embed] });
  } else {
  const Stats2Embed = new MessageEmbed()
  .setColor('0x5f5e66')
  .setTitle('Statistics for ' + '`' + statValue[somet].fname + ' ' + statValue[somet].lname+'`')
  .setDescription('**Facility: ** '+  '`' + statValue[somet].facility+'`' + '\n**Rating: ** ' + '`' + statValue[somet].rating_short+'`'  + '\n**--------Overall Times--------**' + '\n**Overall ATC: **' +  '`' + stat2Value.atc+'`' + '\n**Overall Pilot: **' + '`' + stat2Value.pilot+'`' + '\n**S1: **' +  '`' + stat2Value.s1+'`' + '\n**S2: **' +  '`' + stat2Value.s2+'`' + '\n**S3: **' +  '`' + stat2Value.s3+'`' + '\n**C1: **' +  '`' + stat2Value.c1+'`' + '\n**C3: **' +  '`' + stat2Value.c3+'`' + '\n**I1: **' +  '`' + stat2Value.i1+'`' + '\n**---------------------------------**' + '\n**Joined: ** ' + '`' + statValue[somet].created_at+'`'  )
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. VATSIM stats provided by the VATUSA and VATSIM API.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [Stats2Embed] });
}
}


if (message.content.startsWith('!tophours')){
  toptenText = []
  puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url, {waitUntil: 'load', timeout: 0}).then(function() {
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
	  .setColor('0x5f5e66')
	  .setTitle('**Top Three Controllers**')
    .setDescription(`**--------Local--------**\n**1st:**`+ `${toptenText[0].Localfirst}`+' `'+ `${toptenText[1].LocalTime}` + '`'+  `\n**2nd:**` + `${toptenText[2].Localsecond}`+ ' `'+ `${toptenText[3].LocalSecondTime}` + '`' + `\n**3rd:**`  + `${toptenText[4].Localthird}` + '`' + `${toptenText[5].LocalThirdTime}` +'`' +  `\n**--------Tracon-------**\n**1st:**`+ `${toptenText[6].Traconfirst}`+'`'+ `${toptenText[7].TraconTime}`+'`'+ `\n**2nd:**`+ `${toptenText[8].Traconsecond}`+'`'+ `${toptenText[9].TraconsecondTime}`+'`'+ `\n**3rd:**`+ `${toptenText[10].Traconthird}`+'`'+ `${toptenText[11].TraconThirdTime}`+'`' +`\n**--------Enroute------**\n**1st:**` + `${toptenText[12].Enroutefirst}`+'`'+`${toptenText[13].EnrouteTime}` + '`'+ `\n**2nd:**` + `${toptenText[14].Enroutesecond}`+'`'+ `${toptenText[15].EnrouteSecondTime}` +'`'+ `\n**3rd:**` +  `${toptenText[16].Enroutethird}` + '`' +`${toptenText[17].EnrouteThirdTime}`+'`')
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.channel.send({ embeds: [toptenEmbed] });
  })
  .catch(console.error);
}

if (message.content.startsWith('!wheretofly')) {
  message.reply('Please enter the maximum distance for your flight in nautical miles.');


const filter = (m) => m.author.id === message.author.id;
const collector =  client.channels.cache.get("612510959931752467").createMessageCollector({ filter, time: 5000 });

collector.on('collect', m => {
const her = isNaN(`${m.content}`)
var herr = parseInt(`${m.content}`)

if (her === true){
  const randEmbed = new MessageEmbed()
  .setColor('0xff0000')
  .setTitle('**Error!**')
  .setDescription('Input is not a number or includes extra values.. Do not add (nm) to the end. [Example input: 1000] To restart, resend the command')
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [randEmbed] });
}else if(herr <= 10 ){
  const rand2Embed = new MessageEmbed()
  .setColor('0xff0000')
  .setTitle('**Error!**')
  .setDescription('Input is smaller than or equal to 10. Please input a number greater than 10. Do not add (nm) to the end. To restart, resend the command')
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [rand2Embed] });
}else{


var debil = `${m.content}`;

var options = { minDistance: 10, maxDistance: debil, includeCountries: ['US'], majorAirportsOnly: true }
var flight = flightGenerator(options);





const randEmbed = new MessageEmbed()
.setColor('0x5f5e66')
.setTitle('**Randomly Generated Flight Plan**')
.setDescription('**DEPARTURE**' + '\n\**Airport Name: **' + '`' + flight.departure.name + '`' +  '\n**ICAO: **' + '`' +flight.departure.icao +'`' + '\n**State: **'  + '`' +flight.arrival.state + '`'+ '\n **City: **'  + '`' +flight.departure.city +'`' + '\n\n**ARRIVAL**' + '\n\**Airport Name: **' +'`' + flight.arrival.name +'`' +  '\n**ICAO: **' + '`' +flight.arrival.icao+ '`' + '\n**State: **'  + '`' +flight.arrival.state + '`'  + '\n**City: **'  + '`' +flight.arrival.city + '`' )
.setFooter({ text: 'Random flight api by gabranches. Not for real world use! Bot coded by DY and BY.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
message.channel.send({ embeds: [randEmbed] });

}
});

collector.on('end', collected => {

if (`${collected.size}` === '0'){
  const randEmbed = new MessageEmbed()
  .setColor('0xff0000')
  .setTitle('**Error!**')
  .setDescription('Timed out. You must reply within 5 seconds for the bot to work.')
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [randEmbed] });
}
});

}
if (message.content.startsWith('!traffic')){
  

  const trafvalue = message.content.split(' ')[1];
  
  if (trafvalue === undefined){
    const error5Embed = new MessageEmbed()
    .setColor('0xff0000')
    .setTitle('**Error!**')
    .setDescription('No value provided.')
    . setFooter({ text: 'Not for real world use! Bot coded by DY and BY. ', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
    message.channel.send({ embeds: [error5Embed] });
  }else{

 
  axios.get('https://api.vatusa.net/v2/public/planes')
  .then(function (response) {
    
  const hophop = trafvalue.toUpperCase()
  const dambul5 = response.data.data
  const huud = Object.values(dambul5).filter(x=> x.dep === hophop );
  const huud2 = Object.values(dambul5).filter(n=> n.arr === hophop );
 
  if ( huud.length === 0){
    const error5Embed = new MessageEmbed()
    .setColor('0xff0000')
    .setTitle('**Error!**')
    .setDescription('ICAO code is invalid or one is not provided. Please input one to meet the criteria.')
    . setFooter({ text: 'Not for real world use! Bot coded by DY and BY. ', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
    message.channel.send({ embeds: [error5Embed] });
  }else{
    const trafEmbed = new MessageEmbed()
  .setColor('0x5f5e66')
  .setTitle('**Departures and Arrivals at **'+ '`' +hophop+'`')
  .setDescription('**Departures: **' + '`' + huud.length+'`' + '\n**Arrivals: **' + '`'+huud2.length+'`')
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [trafEmbed] });
  }
});
  
}

    }

});

client.login(token);




