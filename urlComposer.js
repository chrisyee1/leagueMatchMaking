 
/* Takes in the API Type as an integer and field values
 * Returns a URL string to process
 * Case 0: Summoner information
 * Case 1: Spectator information
 * Case 2: Summoner Ranked Stats information
 * Case 3: Summoner Champion Mastery information
 * Case 4: Summoner Last 100 Games information
 */

let composeRiotURL = function(type, region, field1, field2){
  switch (type) {
    case 0:
        // Get summoner information using summoner name
        url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + field1;
        break;
    case 1:
        // Get current game information using summoner id
        url = "https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/" + field1;
        break;
    case 2:
        // Get ranked stats information using summoner id
        url =  "https://na1.api.riotgames.com//lol/league/v3/positions/by-summoner/" + field1;
        break;
    case 3:
        // Get champion mastery information using summoner id
        url = "https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/" 
            + field1 + "/by-champion/" + field2;
        break;
    case 4:
        // Get any games played with a specific champion in the last 100 games played using account id
        url = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/" + field1 
            + "beginTime=0&champion=" + field2;
        break;
    default:
        url = "error";
  }
  return url;    
}

module.exports = {
    composeRiotURL : composeRiotURL
}