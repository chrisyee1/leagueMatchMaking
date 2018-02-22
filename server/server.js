const rp = require('request-promise');
const apikey = require('./apikey.js');
const urlComposer = require('./urlComposer.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.render('index', {summName: null, error: null});
})

/*
app.post('/', function (req, res) {
    console.log(req.body);
    fetchRiotData(req.body.summName).then((data) => {
        if(data instanceof Error){
            console.log(data);
            res.render('index', {summName: null, error: data});
        } else {
            res.render('index', {summName: JSON.stringify(data), error: null});
        }
    });
  })
  */

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
        return new Error("Summoner cannot be found.");
    }
    // Fetch current game using summoner id
    try{
        response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(1, "", response.id)));
    }
    catch(e){
        return new Error("Summoner is currently not in a game.");
    }
    for(let key in response.participants) {
        let soloSpecData = new Object();
        soloSpecData = {
            id: response.participants[key].summonerId,
            champ: response.participants[key].championId,
            summonerName: response.participants[key].summonerName,
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
        console.log("At least one summoner is unranked.");
    }
    // Fetch champ mastery using champion id of current champ being played and summoner id
    try{
        for(let key in playerData) {
            playerData[key].champMastery = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(3, "", playerData[key].id, playerData[key].champ)));
        }
    }
    catch(e){
        console.log("At least one summoner has not played the champ they are playing.");
    }
    // Fetch account id using summoner id
    try{
        for(let key in playerData) {
            playerData[key].playerInfo = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(5, "", playerData[key].id)));
        }   
    }
    catch(e){
        return new Error("Unexpected error");
    }
    // Fetch recent games played using account id
    try{
        for(let key in playerData) {
            playerData[key].rankedGames = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(4, "",  playerData[key].playerInfo.accountId, playerData[key].champ)));
        }
    }
    catch(e){
        console.log("At least one summoner has no match history.");
    }
    return playerData;
}

