
React = require('react');
reactDOM = require('react-dom');
const PlayerTable = require('./PlayerTable');

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
    this.setState({parseData: []});
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
      return data.json();
    }). then(data => {
      this.parseData(data);
      console.log(this.state.parsedData);
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
    console.log(gameData);
    for(let key in gameData){
      let dataHolder = {};
      dataHolder.summonerName = gameData[key].summonerName;
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