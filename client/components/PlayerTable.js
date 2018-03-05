React = require('react');
tableDragger = require('table-dragger');
TableRow = require('./TableRow');

class PlayerTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redTeam: props.redTeam,
      blueTeam: props.blueTeam,
      red: [],
      blue: [],
      filler: []
    }
  }

  render() {
    for(let key in this.state.redTeam){
      this.state.red.push(this.state.redTeam[key]);
    }

    for(let key in this.state.blueTeam){
      this.state.blue.push(this.state.blueTeam[key]);
    }
    return (
      <div className="tableContainer">
        <table className="blueTable" id="blueTab">
          <thead>
            <tr>
              <th>Name</th>
              <th>Champion</th>
              <th>Games Played</th>
            </tr>
          </thead>
          <tbody className="blueTableBody">
            {this.state.blue.map((row, index) => {
                return <TableRow.BlueTableRow className={"blue"} key={new Date().getTime() + row.summonerName} row={row} index={index}/>
              })}
          </tbody>
        </table>
        <table className="dataTable" id="fillTable">
          <tbody>
            {this.state.filler.map(row => {
                return <TableRow.MiddleTableRow className={"middle"} key={new Date().getTime() + row.summonerName} row={row}/>
              })}
          </tbody>
        </table>
        <table className="redTable" id="redTab">
          <thead>
            <tr>
              <th>Games Played</th>
              <th>Champion</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody className="redTableBody">
            {this.state.red.map((row, index) => {
                return <TableRow.RedTableRow className={"red"} key={new Date().getTime() + row.summonerName} row={row} index={index}/>
              })}
          </tbody>
        </table>
      </div>
    );
  }
  
  componentDidMount() { 
    let elBlue = document.getElementById('blueTab');
    let draggerB = tableDragger(elBlue, {
      mode: 'row',
      onlyBody: true,
      dragHandler: ".handle",
    });
    draggerB.on('drag',function(from, to){
    });
    
    let elRed = document.getElementById('redTab');
    let draggerR = tableDragger(elRed, {
      mode: 'row',
      onlyBody: true,
      dragHandler: ".handle",
    });
    draggerR.on('drop',function(from, to){
    });
    
    elBlue.classList.remove("sindu_origin_table");
    elRed.classList.remove("sindu_origin_table");
  }
}

module.exports = PlayerTable;
