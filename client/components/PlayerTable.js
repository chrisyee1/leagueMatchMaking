React = require('react');
tableDragger = require('table-dragger');

class PlayerTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redTeam: props.redTeam,
      blueTeam: props.blueTeam,
      sumArray: [],
      red: [],
      blue: [],
      filler: []
    }
    
    for(let key in this.state.redTeam){
      this.state.red.push(this.state.redTeam[key]);
    }

    for(let key in this.state.blueTeam){
      this.state.blue.push(this.state.blueTeam[key]);
    }
    /*
    let maxSize;
    (this.state.redTeam.length < this.state.blueTeam.length ? maxSize = this.state.blueTeam.length : maxSize = this.state.redTeam.length);

    for(let i = 0; i < maxSize; i++){
      let rowObj = {};
      rowObj.blueSum = this.state.blueTeam[i].summonerName;
      rowObj.matchUp = "Filler";
      rowObj.redSum = this.state.redTeam[i].summonerName;
      this.state.sumArray.push(rowObj);
    }
    */
  }

  render() {

    console.log(this.state.sumArray);
    const TableRow = ({key, row}) => (
      <tr>
        <td key={key}>{row.summonerName}</td>
      </tr>
    );

    return (
      <div>
        <table className="dataTable" id="blueTable">
          <tbody>
            {this.state.blue.map(row => {
                return <TableRow key={row.uniqueId} row={row}/>
              })}
          </tbody>
        </table>
        <table className="dataTable" id="fillTable">
          <tbody>
            {this.state.filler.map(row => {
                return <TableRow key={row.uniqueId} row={row}/>
              })}
          </tbody>
        </table>
        <table className="dataTable" id="redTable">
          <tbody>
            {this.state.red.map(row => {
                return <TableRow key={row.uniqueId} row={row}/>
              })}
          </tbody>
        </table>
      </div>
    );
  }
  
  componentDidMount() { 
    let elBlue = document.getElementById('blueTable');
    let draggerB = tableDragger(elBlue, {
      mode: 'row',
    });
    draggerB.on('drag',function(from, to){
    });
    
    let elRed = document.getElementById('redTable');
    let draggerR = tableDragger(elRed, {
      mode: 'row',
    });
    draggerR.on('drop',function(from, to){
    });
    
    elBlue.classList.remove("sindu_origin_table");
    elRed.classList.remove("sindu_origin_table");
  }
}

module.exports = PlayerTable;
