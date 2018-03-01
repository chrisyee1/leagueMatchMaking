const BlueTableRow = ({className, row, index}) => (
    <tr className={"blueRow" + index % 2}>
        <td className={className + "Name" + " handle"}>{row.summonerName}</td>
        <td className={className + "Champ"}>
            <BlueChampionInfo imgSrc="http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/Warwick.png"/>
        </td>
        <td className={className + "Mastery"}>{row.totalGames.toString()}</td>
    </tr>
);

const RedTableRow = ({className, row, index}) => (
    <tr className={"redRow" + index % 2}>
        <td className={className + "Mastery"}>{row.totalGames.toString()}</td>
        <td className={className + "Champ"}>
            <RedChampionInfo imgSrc="http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/Warwick.png"/>
        </td>
        <td className={className + "Name"+ " handle"}>{row.summonerName}</td>
    </tr>
);

const MiddleTableRow = ({className, key, row}) => (
    <tr>
        <td>Filler</td>
    </tr>
);

const BlueChampionInfo = ({imgSrc}) => (
    <div className="people">  
        <div className='col mid'>
            <img className="champIcon" src={imgSrc}/>     
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

const RedChampionInfo = ({imgSrc}) => (
    <div className="people">  
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
        <div className='col mid'>
            <img className="champIcon" src={imgSrc}/>     
        </div>
    </div>
)

module.exports = {
    BlueTableRow,
    RedTableRow,
    MiddleTableRow
}