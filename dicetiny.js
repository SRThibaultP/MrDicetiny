var Discord = require("discord.js");
var fs = require('fs');
var roller = require('roller');

var dicetiny = new Discord.Client();

dicetiny.on("message", function(message) {
  var channel_id = message.channel.id;
  var match_data = message.content.match(/^\/roll ([1-9][0-9]*)d([1-9][0-9]*)s([1-9][0-9]*)/);

  if(match_data) {
    var n_dice = parseInt(match_data[1], 10);
    var n_sides = parseInt(match_data[2], 10);
    var n_stat = parseInt(match_data[3], 10);

    if(n_dice > 9000) {
      dicetiny.sendMessage(channel_id, "It's over nine thousand");
      return;
    }

    console.log("Lancer de " + n_dice + " dé à " + n_sides + " faces avec des stats de " + n_stat);
    var dice = roller.roll(n_dice, n_sides);

    var message_content = "";
    var roll_user = message.author;
    var sum;
    var sucessValCri = 6;
    var sucessValCriSIX = 1;
    var sucessTXT = "Succès "
    var sucessGIF = "LIEN DU GIF SUCCES"
    var sucessGIFCri = "LIEN DU GIF SUCESS CRITIQUE";
    var echecValCri = 94;
    var echecValCriSIX = 6;
    var echecTXT = "Échec "
    var echecGIF = "LIEN DU GIF ECHEC"
    var echecGIFCri = "LIEN DU GIF ECHEC CRITIQUE";
    var critique = "critique "
    var chanceux = "";

    if(n_dice > 1) {
      sum = dice.reduce(function(prev, curr) {
        return prev + curr;
      });

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
        if(sum < sucessValCri) {
          chanceux = " | " + "**" + sucessTXT + critique + "**" + sucessGIFCri;
        }

        else if (sum > echecValCri) {
          chanceux = " | " + "**" + echecTXT + critique + "**" + echecGIFCri;
        }
        else if (sum <= n_stat) {
          chanceux = " | " + "**" + sucessTXT + "**" + sucessGIF;
        }

        else if (sum > n_stat) {
           chanceux = " | " + "**" + echecTXT + "**" + echecGIF;
         }
      }

      else {
        if (sum <= n_stat) {
          chanceux = " | " + "**" + sucessTXT + "**" + sucessGIF;
        }

       else if (sum > n_stat) {
          chanceux = " | " + "**" + echecTXT + "**" + echecGIF;
        }
      }

      message_content = roll_user.mention() + ": " + dice.join(" & ") + " | Total = " + sum  + chanceux;
      console.log("Le résultat est " + sum + ".");
    }

    else {
    sum = dice[0];

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
      if(sum < sucessValCri) {
        chanceux = " | " + "**" + sucessTXT + critique + "**" + sucessGIFCri;
      }

      else if (sum > echecValCri) {
        chanceux = " | " + "**" + echecTXT + critique + "**" + echecGIFCri;
      }
      else if (sum <= n_stat) {
        chanceux = " | " + "**" + sucessTXT + "**" + sucessGIF;
      }

      else if (sum > n_stat) {
         chanceux = " | " + "**" + echecTXT + "**" + echecGIF;
       }
    }

    else {
      if (sum <= n_stat) {
        chanceux = " | " + "**" + sucessTXT + "**" + sucessGIF;
      }

     else if (sum > n_stat) {
        chanceux = " | " + "**" + echecTXT + "**" + echecGIF;
      }
    }

     message_content = roll_user.mention() + ": " + sum  + chanceux;
     console.log("Le résultat est " + sum + "." + chanceux);

    if(message_content.length > 2000) {
      var sum_message = "Texte trop long, résultat: " + sum;

      dicetiny.sendMessage(channel_id, sum_message);
      return;
    }
  }
  dicetiny.sendMessage(channel_id, message_content);
}
});

fs.readFile("config.json", function(err, data) {
  var auth_token =  JSON.parse(data).discord_token;
  dicetiny.loginWithToken(auth_token);
  console.log("Bot en ligne");
});
