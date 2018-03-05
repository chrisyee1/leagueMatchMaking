
React = require('react');
reactDOM = require('react-dom');
const PlayerTable = require('./PlayerTable');
const champData = require('../champData.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        summName: "",
        redTeam: [],
        blueTeam: [],
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    reactDOM.render(
      <div className="loader"></div>,
      document.getElementById('table-div')
    )
    this.setState({redTeam: []});
    this.setState({blueTeam: []});
    let error = false;
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summName: this.state.summName,
      })
    }). then(data => { 
      if(data.status != 200){
        error = true;
      }
      return data.json();
    }). then(data => {
      if(error == true) {
        reactDOM.render(
          <p>{data.error}</p>,
          document.getElementById('table-div')
        )
        return;
      }
      this.parseData(data);
      reactDOM.render(
        <PlayerTable redTeam={this.state.redTeam} blueTeam={this.state.blueTeam}/>,
        document.getElementById('table-div')
      )
    });
  }

  handleChange(event) {
    this.setState({summName: event.target.value});
  }

  parseData(gameData) {
    for(let key in gameData){
      let dataHolder = {};
      dataHolder.summonerName = gameData[key].summonerName;
      console.log(gameData[key].champ);
      for(let champID in champData.data){
        console.log(champData.data[champID].id);
        if(champData.data[champID].id == gameData[key].champ){
          dataHolder.champName = champData.data[champID].name;
          dataHolder.champIcon = this.createChampionURL(champData.version, champData.data[champID].image.full);
        }
      }
      dataHolder.champ = gameData[key].champ;
      if(gameData[key].champMastery === undefined){
        dataHolder.championPoints = 0;
      }
      else {
        dataHolder.championPoints = gameData[key].champMastery.championPoints;
      }
      if(gameData[key].rankedGames === undefined){
        dataHolder.totalGames = 0;
      }
      else {
        dataHolder.totalGames = gameData[key].rankedGames.totalGames;
      }

      dataHolder.rankedData = [];
      for(let ranks in gameData[key].rankInfo){
        let rankInfo = {};
        rankInfo.queueType = gameData[key].rankInfo[ranks].queueType;
        rankInfo.tier = gameData[key].rankInfo[ranks].tier;
        rankInfo.rank = gameData[key].rankInfo[ranks].rank;
        rankInfo.wins = gameData[key].rankInfo[ranks].wins;
        rankInfo.losses = gameData[key].rankInfo[ranks].losses;
        dataHolder.rankedData.push(rankInfo);
      }

      if(gameData[key].teamId == 100){
        let prevState = this.state.blueTeam;
        prevState.push(dataHolder);
        this.setState({blueTeam: prevState});
      }
      else{
        let prevState = this.state.redTeam;
        prevState.push(dataHolder);
        this.setState({redTeam: prevState});
      }
    }
  }

  createChampionURL(version, champURL){
    return "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/" + champURL;
  }

  render() {
    return (
      <div className="container">
      <fieldset>
          <form onSubmit={this.handleSubmit}>
          <input name="summName" type="text" className="ghost-input" value={this.state.summName} onChange={this.handleChange} placeholder="Enter a summoner name" required  />
          <input type="submit" className="ghost-button" value="Get Game Info"/>
          </form>
      </fieldset>
      </div>
    );
  }
}
module.exports = App;