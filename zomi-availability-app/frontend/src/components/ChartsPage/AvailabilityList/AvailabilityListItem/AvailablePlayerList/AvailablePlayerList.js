import classes from './AvailablePlayerList.module.css'

function AvailablePlayerList({availablePlayerList, isEmptyPlayerList}) {
    return (
        <>
            {!isEmptyPlayerList && (
                <div className={classes.expandedBox}>
                    <div className={classes.gridContainer}>
                        {availablePlayerList.map((player, index) => (
                            <div className={classes.gridItem} key={player.name}>
                                {index + 1}. {player.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isEmptyPlayerList && (
                <div className={classes.expandedBox}>
                    <div className={classes.gridContainer}>
                        <div>
                            {"No players available yet!"}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AvailablePlayerList;