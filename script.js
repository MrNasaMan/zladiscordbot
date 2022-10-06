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




const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] }); 

const prefix = '!';

const token = 'put token here';


client.once('ready', () => {
  console.log('The ZLA Bot has Booted up the Scope!')

  

});



client.on('message', async message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();


  const tecFirst = command.slice(0,3);
  const tecSecond = command.slice(3, 6);
  const tecThird = command.slice(6, 9);
  const statsSecond = command.slice(5, 13);
  const statsfirst = command.slice(0, 5);
  const topten = command.slice(0, 8);
  const online1 = command.slice(0, 6);
  const analyzer1 = command.slice(8, 16);
  const analyzer2 = command.slice(0, 4);
  const analyzer3 = command.slice(4, 8);
 

  if (analyzer1 === 'ifrroute'){
    const url3 = 'https://flightaware.com/analysis/route.rvt?origin=' + analyzer2.toUpperCase() + '&destination=' + analyzer3.toUpperCase()
    puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
    return page.goto(url3).then(function() {
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
      .setColor('#1811A6')
      .setTitle(analyzer2.toUpperCase() + ' to ' + analyzer3.toUpperCase() + ' IFR Routes in Terms of **Popularity**')
      .setDescription(text2.toString())
      .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM,VATUSA, and Flight Aware.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
      if (text2[0] == '0') {
        message.channel.send({ embeds: [analyzerEmbed] });
      }else{
        message.channel.send('No IFR Route Found')
      }
    
  
  
  })
  }
  if (command == 'wheretofly'){
    const randomEmbed = new MessageEmbed()
	  .setColor('#33FFC1')
	  .setTitle('**Looking for Somewhere to Fly?**')
    .setURL('https://flightaware.com/live/airport/random')
    .setDescription('Click Here to View the Details and Diagram of the Random Aiport ↑')
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM, VATUSA, and Flightaware. TEC routes provided by AviationAPI.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.channel.send({ embeds: [randomEmbed] });
  }
    

if (tecThird === 'tec'){
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
  .setColor('#5E33FF')
	.setTitle(tecFirst.toUpperCase() + ' to ' + tecSecond.toUpperCase() + ' TEC Routes')
  .setDescription('' + TeccValue.map(getTeccc))
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM, VATUSA, and Flightaware. TEC routes provided by AviationAPI.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	message.channel.send({ embeds: [tecEmbed] });
}else{
  message.channel.send('No TEC Route Found')
}
  
  
}
if (command == 'help'){
  const helpEmbed = new MessageEmbed()
	  .setColor('#FF333F')
	  .setTitle('**Need Help?** \nBot Prefix = "!"')
    .setDescription('**For bug reports, suggestions, or feedback please fill out this Google form**\nhttps://forms.gle/SC2JaXmnxYM1DvEe9\n**To view all of the commands try !cmds**\n**For general inquires please contact ZLA staff members.**')
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM, VATUSA, and Flightaware. TEC routes provided by AviationAPI.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.author.send({ embeds: [helpEmbed] });
  
}
if (statsfirst === 'stats'){
  let getStats= async () => {
    let response = await axios.get('https://api.vatusa.net/v2/user/' + statsSecond);
    let stat = response.data;
    return stat;
}
  let getStats2= async () => {
    let response = await axios.get('https://api.vatsim.net/api/ratings/' + statsSecond + '/rating_times/');
    let stat2 = response.data;
    return stat2;
}
  let statValue = await getStats();
  let stat2Value = await getStats2();
  let somet = 'data';
  let somet2 = 'no';
  if (statValue[somet].isMentor = 'false'){
    somet2 = 'No'
  }

  const Stats2Embed = new MessageEmbed()
  .setColor('#1AAD1A')
  .setTitle('Statistics for ' + statValue[somet].fname + ' ' + statValue[somet].lname)
  .setDescription('**Facility: ** '+  statValue[somet].facility + '\n**Rating: ** ' + statValue[somet].rating_short  + '\n**Mentor: ** ' + somet2 + '\n**--------Overall Times--------**' + '\n**Overall ATC: **' +  stat2Value.atc + '\n**Overall Pilot: **' + stat2Value.pilot + '\n**S1: **' +  stat2Value.s1 + '\n**S2: **' +  stat2Value.s2 + '\n**S3: **' +  stat2Value.s3 + '\n**C1: **' +  stat2Value.c1 + '\n**C3: **' +  stat2Value.c3 + '\n**I1: **' +  stat2Value.i1 + '\n**---------------------------------**' + '\n**Joined: ** ' + statValue[somet].created_at  )
  .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM, VATUSA, and Flightaware. TEC routes provided by AviationAPI.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
  message.channel.send({ embeds: [Stats2Embed] });

}

if (topten == 'tophours'){
  toptenText = []
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
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM, VATUSA, and Flightaware. TEC routes provided by AviationAPI.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.channel.send({ embeds: [toptenEmbed] });
  })
  .catch(console.error);
}
if (online1 == 'online'){
  eventText = []
  puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => {
    return page.goto(url2).then(function() {
      return page.content();
    });
  })
  .then(html => {
    const $ = cheerio.load(html);
    $('#onlinedata > div:nth-child(2)').each(function() {
      eventText.push({
        eventLink: $(this).text(),
      });
    });
    
  
    const eventsEmbed = new MessageEmbed()
	  .setColor('#11A655')
	  .setTitle('**Online Controllers**')
    .setDescription(`${eventText[0].eventLink}`)
    .setFooter({ text: 'Not for real world use! Bot coded by DY and BY. Information provided by VATSIM, VATUSA, and Flightaware. TEC routes provided by AviationAPI.', iconURL: 'https://cdn.discordapp.com/icons/612373312051478662/7fad3012e32dd58264ea884473a2552e.webp?size=96' });
	  message.channel.send({ embeds: [eventsEmbed] });
  

  });
  

  }
  

});

client.login('put here');
