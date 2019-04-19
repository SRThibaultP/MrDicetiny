var Discord = require("discord.js");
var fs = require('fs');
var roller = require('roller');

var dicetiny = new Discord.Client();

dicetiny.on("message", function(message) {
  var channel_id = message.channel.id;
  var match_data = message.content.match(/^\/rolls d([1-9][0-9]*)s([1-9][0-9]*)/);
  var message_content = "";
  var user = message.author;
  var sucessValCri = 5;
  var sucessValCriSIX = 1;
  var sucessTXT = "Succès "
  var sucessGIF = "LIEN DU GIF SUCCES"
  var sucessGIFCri = "LIEN DU GIF SUCESS CRITIQUE";
  var echecValCri = 95;
  var echecValCriSIX = 6;
  var echecTXT = "Échec "
  var echecGIF = "LIEN DU GIF ECHEC"
  var echecGIFCri = "LIEN DU GIF ECHEC CRITIQUE";
  var critique = "critique "
  var chanceux = "";

  if(match_data) {
    var n_sides = parseInt(match_data[1], 10);
    var n_stat = parseInt(match_data[2], 10);
    var sum = roller.roll(1, n_sides);

    console.log("Lancer de dé à " + n_sides + " faces avec " + n_stat + " de stats");

    if (n_sides == 6) {
      if(sum == sucessValCriSIX) {
        chanceux = " | " + "**" + sucessTXT + critique + "**" + sucessGIFCri;
      }

      else if (sum == echecValCriSIX) {
        chanceux = " | " + "**" + echecTXT + critique + "**" + echecGIFCri;
      }

      else if (sum <= n_stat) {
        chanceux = " | " + "**" + sucessTXT + "**" + sucessGIF;
      }

      else if (sum > n_stat) {
        chanceux = " | " + "**" + echecTXT + "**" + echecGIF;
      }
    }

    else if (n_sides == 100) {
      if (sum <= sucessValCri) {
        chanceux = " | " + "**" + sucessTXT + critique + "**" + sucessGIFCri;
      }

      else if (sum >= echecValCri) {
        chanceux = " | " + "**" + echecTXT + critique + "**" + echecGIFCri;
      }

      else if (sum <= n_stat) {
        chanceux = " | " + "**" + sucessTXT + "**" + sucessGIF;
      }

      else if (sum > n_stat) {
         chanceux = " | " + "**" + echecTXT + "**" + echecGIF;
       }
    }

     message_content = user.mention() + ": " + sum  + chanceux;
     console.log("Le résultat est " + sum + ".");
     dicetiny.sendMessage(channel_id, message_content);
  }
});

dicetiny.on("message", function(message) {
  var channel_id = message.channel.id;
  var match_data = message.content.match(/^\/roll d([1-9][0-9]*)/);

  var message_content;
  var user = message.author;

  if(match_data) {
    var n_sides = parseInt(match_data[1], 10);
    var sum = roller.roll(1, n_sides);

    console.log("Lancer de dé à " + n_sides + "faces");
    message_content = user.mention() + ": " + sum;
    console.log("Le résultat est " + sum + ".");
    dicetiny.sendMessage(channel_id, message_content);
  }
});

fs.readFile("config.json", function(err, data) {
  var auth_token =  JSON.parse(data).discord_token;
  dicetiny.loginWithToken(auth_token);
});

dicetiny.on('ready', () => {
  console.log(`Bot en ligne`);
});
