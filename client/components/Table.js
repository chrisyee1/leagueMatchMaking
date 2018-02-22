React = require('react');
TableDragger = require('table-dragger');

class ShoppingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        summName: "",
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="shopping-list">
        <table id="table">
          <thead>
          <tr>
            <th className='handle'>header1</th>
            <th className='handle'>header2</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>conten1</td>
            <td>conten2</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
    }

    componentDidMount() {  
      var el = document.getElementById('table');
      var dragger = tableDragger(el);
      dragger.on('drop',function(from, to){
        let x = from;
        from = to;
        to = from;
        console.log(from);
        console.log(to);
      });
    }
  }

module.exports = {
    ShoppingList
}
