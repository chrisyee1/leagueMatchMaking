
React = require('react');
reactDom = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        summName: "",
        parsedData: [],
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.parsedData = [];
    console.log(this.state.summName);
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
        <Table playerInfo={this.state.parsedData}/>,
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
      dataHolder.teamId = gameData[key].teamId;
      dataHolder.championPoints = gameData[key].champMastery.championPoints;
      dataHolder.totalGames = gameData[key].rankedGames.totalGames;
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
      this.state.parsedData.push(dataHolder);
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