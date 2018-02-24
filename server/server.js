const rp = require('request-promise');
const apikey = require('./apikey.js');
const urlComposer = require('./urlComposer.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

app.get('/', function (req, res) {
    res.send({status: "Success."});
})

app.post('/', function (req, res) {
    console.log(req.body);
    fetchRiotData(req.body.summName).then((data) => {
        if(data instanceof Error){
            console.log(data);
            res.status(500);
            res.send({code:500, error:data.message});
        } else {
            res.send(data);
        }
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


// RiotAPIRequest options object for use by Request
function RiotAPIRequest(url){
    this.url = url;
    this.headers = {
        "X-Riot-Token": apikey.riotKey
    };
    this.json =  true;
}

// Function that fetches all the data from the riot API
async function fetchRiotData(summName) {
    let response;
    let playerData = [];
    let promiseList = [];
    // Fetch summoner info using summoner name
    try{
        response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(0, "", summName)));
    }
    catch(e){
        return new Error(e.message +  " Summoner cannot be acquired.");
    }
    // Fetch current game using summoner id
    try{
        response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(1, "", response.id)));
    }
    catch(e){
        return new Error(e.message + " An existing game cannot be acquired.");
    }
    for(let key in response.participants) {
        let soloSpecData = new Object();
        soloSpecData = {
            id: response.participants[key].summonerId,
            champ: response.participants[key].championId,
            summonerName: response.participants[key].summonerName,
            teamId: response.participants[key].teamId,
            gameQueue: response.gameQueueConfigId,
        };
        playerData.push(soloSpecData);
    }
    // Fetch ranked stats using summoner id
    try {
        for(let key in playerData) {
            playerData[key].rankStats = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(2, "", playerData[key].id)));
        }
    }
    catch(e){
        console.log(e.message);
    }
    // Fetch champ mastery using champion id of current champ being played and summoner id
    try{
        for(let key in playerData) {
            playerData[key].champMastery = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(3, "", playerData[key].id, playerData[key].champ)));
        }
    }
    catch(e){
        console.log(e.message);
    }
    // Fetch account id using summoner id
    try{
        for(let key in playerData) {
            playerData[key].playerInfo = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(5, "", playerData[key].id)));
        }   
    }
    catch(e){
        return new Error(e.message + " Unexpected error fetching data.");
    }
    // Fetch recent games played using account id
    try{
        for(let key in playerData) {
            playerData[key].rankedGames = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(4, "",  playerData[key].playerInfo.accountId, playerData[key].champ)));
        }
    }
    catch(e){
        console.log(e.message);
    }
    return playerData;
}

