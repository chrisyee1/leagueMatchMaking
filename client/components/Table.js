React = require('react');
TableDragger = require('table-dragger');

class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for Dank</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
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
