const rp = require('request-promise');
const apikey = require('./apikey.js');
const urlComposer = require('./urlComposer.js');

function RiotAPIRequest(url){
    this.url = url;
    this.headers = {
        "X-Riot-Token": apikey.riotKey
    };
    this.json =  true;
}
async function fetchRiotData() {
    let response;
    let playerData = [];
    let promiseList = [];
    response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(0, "", "nourisop")));
    console.log(response);
    response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(1, "", response.id)));
    console.log(response);
    for(let key in response.participants) {
        let soloSpecData = new Object();
        soloSpecData = {
            id: response.participants[key].summonerId,
            champ: response.participants[key].championId,
            summonerName: response.participants[key].summonerName,
        };
        playerData.push(soloSpecData);
    }
    console.log(playerData);
    for(let key in playerData) {
        playerData[key].rankStats = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(2, "", playerData[key].id)));
    }
    for(let key in playerData) {
        playerData[key].champMastery = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(3, "", playerData[key].id, playerData[key].champ)));
    }
    console.log(playerData);
    for(let key in playerData) {
        playerData[key].playerInfo = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(5, "", playerData[key].id)));
    }   
    console.log(playerData);
    for(let key in playerData) {
        playerData[key].rankedGames = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(4, "",  playerData[key].playerInfo.accountId, playerData[key].champ)));
    }   
    console.log(playerData);
}

fetchRiotData();