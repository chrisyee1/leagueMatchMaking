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
    let rankStats = [];
    let champMastery = [];
    let playerInfo = [];
    let rankedGames = [];
    response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(0, "", "Angels")));
    response = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(1, "", response.id)));
    for(let key in response.participants) {
        let soloSpecData = new Object();
        soloSpecData = {
            id: response.participants[key].summonerId,
            champ: response.participants[key].championId,
            summonerName: response.participants[key].summonerName,
        };
        playerData.push(soloSpecData);
    }
    rankStats = await Promise.all(playerData.map(x => rp(new RiotAPIRequest(urlComposer.composeRiotURL(2, "", x.id)))));
    console.log(rankStats);
    champMastery = await Promise.all(playerData.map(x => rp(new RiotAPIRequest(urlComposer.composeRiotURL(3, "", x.id, x.champ)))));
    console.log(champMastery);
    playerData.playerInfo = await Promise.all(playerData.map(x => rp(new RiotAPIRequest(urlComposer.composeRiotURL(5, "", x.id)))));
    console.log(playerInfo);
    rankedGames = await Promise.all(playerData.map(x => rp(new RiotAPIRequest(urlComposer.composeRiotURL(4, "",  playerData[key].playerInfo.accountId, x.champ)))));
    console.log(rankStats);
    /*
    for(let key in playerData) {
        playerData[key].champMastery = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(3, "", playerData[key].id, playerData[key].champ)));
    }
    for(let key in playerData) {
        playerData[key].playerInfo = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(5, "", playerData[key].id)));
    }   
    for(let key in playerData) {
        playerData[key].rankedGames = await rp(new RiotAPIRequest(urlComposer.composeRiotURL(4, "",  playerData[key].playerInfo.accountId, playerData[key].champ)));
    }   
    */
}

fetchRiotData();