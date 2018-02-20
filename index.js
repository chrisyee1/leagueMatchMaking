const bluebird = require('bluebird');
const rp = require('request-promise');
const apikey = require('./apikey.js');
const urlComposer = require('./urlComposer.js');
const async = require('async');

function RiotAPIRequest(url){
    this.url = url;
    this.headers = {
        "X-Riot-Token": apikey.riotKey
    };
    this.json =  true;
}
let fetchRiotData = function() {
rp(new RiotAPIRequest(urlComposer.composeRiotURL(0, "", "Shiphtur"))).then(function (summonerBody) {
    let summonerData = {
        id: summonerBody.id,
        accId: summonerBody.accountId,
    };
    return summonerData;
}).then(function (summonerData) {
    return rp(new RiotAPIRequest(urlComposer.composeRiotURL(1, "", summonerData.id)));
}).then(function (specBody) {
    let specData = [];
    for(let key in specBody.participants) {
        let soloSpecData = new Object();
        soloSpecData = {
            id: specBody.participants[key].summonerId,
            champ: specBody.participants[key].championId,
            summonerName: specBody.participants[key].summonerName,
        };
        specData.push(soloSpecData);
    }
    return specData;
}).then(function (playerData) {
    
    console.log(playerData);
    return playerData;
    /*
    console.log(playerData);
    let playerDataArray = [];
    for(let key in playerData){
        playerDataArray.push(rp(new RiotAPIRequest(urlComposer.composeRiotURL(2, "", playerData[key].id))));
    }
    
    bluebird.all(playerDataArray)
    .spread(function (r1, r2, r3, r4, r5, r6, r7, r8, r9, r10) {    
        for(let key in playerData){
            playerData[key].rankInfo = argument[key];
        }
        return playerData;
    })
    .catch(function (err) {
        // At least one request failed.
        // Do your error handling here.
    });*/
});
}

async function makeRequest () {
    let varia = await fetchRiotData();
    console.log(varia);
    return "done"
  }

  makeRequest();