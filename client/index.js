const react = require('react');
const reactDOM = require('react-dom');
const App = require('./components/App');
const PlayerTable = require('./components/PlayerTable');


reactDOM.render(
    <App />,
    document.getElementById('app')
)
