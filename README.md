# Mr Dicetiny
[![CodeFactor](https://www.codefactor.io/repository/github/srthibaultp/mrdicetiny/badge/master)](https://www.codefactor.io/repository/github/srthibaultp/mrdicetiny/overview/master)

Un bot discord pour faire des lancers de dé selon les règles des JDR.

# Commandes

Commandes disponibles : `/roll` et `/rolls`

Syntaxe: `/rolls dxsy`
x est le nombre de côté que le dé possède.
y est les stats que le personage possède.

Exemple: `/rolls d100s10` lance un dé à cent faces avec des stats de 10 puis affiche le total du résultat avec le succès ou l'échec (critique ou non)

Syntaxe: `/roll dx`
x est le nombre de côté que le dé possède.

Exemple: `/rolls d6` lance un dé à six faces puis affiche le total du résultat avec le succès ou l'échec

Le dé affiche uniquement le résultat si il ne possède pas 6 ou 100 faces.

# Usage

1. Coller la clé de l'API Discord dans `config.json`
2. Installer [Node.js](https://nodejs.org)
2. Exécuter la commande `npm install` dans le dossier de Mr Dicetiny
3. Lancer le fichier `start.bat`

Invitation du bot discord : https://discordapp.com/oauth2/authorize?&client_id=INSERTCLIENTID&scope=bot&permissions=0

# Crédits

Fork du code [rollbot](https://github.com/mdszy/rollbot) de [mdszy](https://github.com/mdszy)
