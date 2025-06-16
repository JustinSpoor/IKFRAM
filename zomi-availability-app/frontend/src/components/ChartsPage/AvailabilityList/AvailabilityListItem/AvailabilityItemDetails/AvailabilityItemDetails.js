import classes from './AvailabilityItemDetails.module.css'
import {getAvailablePlayerList} from "../../../../../services/AvailabilityService";
import {useEffect, useState} from "react";
import AvailablePlayerList from "../AvailablePlayerList/AvailablePlayerList";


function AvailabilityItemDetails({competitionDate}) {


    /* TODO
        1. say to parrent when isExpanded is true so it can show the box with player names
     */

    const [availablePlayerList, setAvailablePlayerList] = useState([])
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEmptyPlayerList, setIsEmptyPlayerList] = useState(false)

    const handleTogglePlayerNames = () => {
        console.log(availablePlayerList)
        if (!availablePlayerList.length > 0) {
            setIsEmptyPlayerList(true)
        }
        setIsExpanded((prevState) => !prevState);
    };


    useEffect(() => {
        async function fetchAvailablePlayerList() {
            try {
                const availablePlayerList = await getAvailablePlayerList(competitionDate);
                setAvailablePlayerList(availablePlayerList);
            } catch (error) {
                console.error("failed to get available player List")
            }
        }
        fetchAvailablePlayerList();
    }, [])


    return (
        <>
            <div className={classes.detailsBoxContainer}>
                <div className={classes.availabilityItemDetailsContainer}>
                    <div className={classes.dataContainer}>
                        <div className={classes.textContainer}>
                            <p>{competitionDate}</p>
                            <p>{availablePlayerList.length}/11</p>
                        </div>
                        <div className={classes.progressBar}>
                            <div
                                className={classes.progress}
                                style={{ width: `${(availablePlayerList.length / 11) * 100}%` }}
                            />
                        </div>
                        {isExpanded && !isEmptyPlayerList &&(
                            <AvailablePlayerList
                                availablePlayerList={availablePlayerList}
                            />
                        )}
                        {isExpanded && isEmptyPlayerList && (
                            <AvailablePlayerList
                                isEmptyPlayerList={isEmptyPlayerList}
                            />
                        )}
                    </div>
                    <button
                        className={`${classes.arrowButton} ${isExpanded ? classes.rotate : ''}`}
                        onClick={handleTogglePlayerNames}
                        >
                        <span className={classes.arrow}/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default AvailabilityItemDetails;
