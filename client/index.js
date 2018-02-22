const react = require('react');
const reactDOM = require('react-dom');
const SummonerQuery = require('./components/Query');
const Table = require('./components/Table');

reactDOM.render(
    <SummonerQuery />,
    document.getElementById('app')
)