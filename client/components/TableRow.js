const BlueTableRow = ({className, row, index}) => (
    <tr className={"blueRow"}>
        <td className={className + "Name" + " handle"}>{row.summonerName}</td>
        <td className={className + "Champ"}>
            <BlueChampionInfo imgSrc={row.champIcon} champName={row.champName}/>
        </td>
        <td className={className + "Mastery"}>{row.totalGames.toString()}</td>
    </tr>
);

const RedTableRow = ({className, row, index}) => (
    <tr className={"redRow"}>
        <td className={className + "Mastery"}>{row.totalGames.toString()}</td>
        <td className={className + "Champ"}>
            <RedChampionInfo imgSrc={row.champIcon} champName={row.champName}/>
        </td>
        <td className={className + "Name"+ " handle"}>{row.summonerName}</td>
    </tr>
);

const MiddleTableRow = ({className, key, row}) => (
    <tr>
        <td>Filler</td>
    </tr>
);

const BlueChampionInfo = ({imgSrc, champName}) => (
    <div className="people">  
        <div className='col mid'>
            <img className="champIcon" src={imgSrc}/>     
        </div>
        <div className='image-list'>
            <ul>
                <li>
                    <label>{champName}</label>
                </li>
                <li>
                    <a href="#">Games Played</a>
                </li>
            </ul>
        </div>
    </div>
)

const RedChampionInfo = ({imgSrc, champName}) => (
    <div className="people">  
        <div className='image-list'>
            <ul>
                <li>
                    <label>{champName}</label>
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