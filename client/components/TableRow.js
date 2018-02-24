const BlueTableRow = ({className, row}) => (
    <tr>
        <td className={className + "Name" + " handle"}>{row.summonerName}</td>
        <td className={className + "Champ"}>
            <ChampionInfo imgSrc="http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/Warwick.png"/>
        </td>
        <td className={className + "Mastery"}>{row.championPoints.toString() + "\n" + row.totalGames.toString()}</td>
    </tr>
);

const RedTableRow = ({className, row}) => (
    <tr>
        <td className={className + "Mastery"}>{row.championPoints.toString() + "\n" + row.totalGames.toString()}</td>
        <td className={className + "Champ"}>
            <ChampionInfo imgSrc="http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/Warwick.png"/>
        </td>
        <td className={className + "Name"+ " handle"}>{row.summonerName}</td>
    </tr>
);

const MiddleTableRow = ({className, key, row}) => (
    <tr>
        <td>Filler</td>
    </tr>
);

const ChampionInfo = ({imgSrc}) => (
    <div className="people">  
        <div className='col mid'>
            <a href="#">
                <img className="champIcon" src={imgSrc}/>     
            </a>
        </div>
        <div className='image-list'>
            <ul>
                <li>
                    <label>Champion Name</label>
                </li>
                <li>
                    <a href="#">Games Played</a>
                </li>
            </ul>
        </div>
    </div>
)

module.exports = {
    BlueTableRow,
    RedTableRow,
    MiddleTableRow
}