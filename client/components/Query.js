
React = require('react');

class SummonerQuery extends React.Component {
    render() {
      return (
        <div className="container">
        <fieldset>
            <form action="/" method="post">
            <input name="summName" type="text" className="ghost-input" placeholder="Enter a summoner name" required />
            <input type="submit" className="ghost-button" value="Get Game Info"/>
            </form>
        </fieldset>
        </div>
      );
    }
}
module.exports = SummonerQuery;