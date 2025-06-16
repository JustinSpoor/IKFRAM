import classes from './CompetitionItemDetails.module.css'
import {useEffect, useState} from "react";

function CompetitionItemDetails({competitionData, onSelectAvailability, userAvailabilityData, hasValidName, displayErrorModal}) {

    const [selectedButton, setSelectedButton] = useState(null);

    useEffect(() => {
        const userEntry = userAvailabilityData?.userData?.find(
            (entry) => entry.date === competitionData.date
        );

        if (userEntry) {
            setSelectedButton(userEntry.availability ? 'thumb-up' : 'thumb-down');
        } else {
            setSelectedButton(null);
        }
    }, [userAvailabilityData, competitionData.date]);

    const handleAvailabilityClick = () => {
        if (hasValidName){
            displayErrorModal();
            return;
        }
        setSelectedButton((prev) => (prev === 'thumb-up' ? null : 'thumb-up'));
        onSelectAvailability(competitionData.date, true);
    };

    const handleUnavailabilityClick = () => {
        if (hasValidName){
            displayErrorModal();
            return;
        }
        setSelectedButton((prev) => (prev === 'thumb-down' ? null : 'thumb-down'));
        onSelectAvailability(competitionData.date, false);
    };


    return (
        <>
            <div className={classes.detailsBoxContainer}>
                <div className={classes.competitionItemDetailsContainer}>
                    <div className={classes.homeTeamContainer}>
                        <img className={classes.teamLogo} src={competitionData.homeTeamLogo} alt={`${competitionData.homeTeam} team logo`}/>
                        <p>{competitionData.homeTeam}</p>
                    </div>
                    <p>VS</p>
                    <div className={classes.awayTeamContainer}>
                        <p>{competitionData.awayTeam}</p>
                        <img className={classes.teamLogo} src={competitionData.awayTeamLogo} alt={`${competitionData.awayTeam} team logo`}/>
                    </div>
                    <div className={classes.buttonContainer}>
                        <button  onClick={handleAvailabilityClick}
                                 className={selectedButton === 'thumb-up' ? classes.thumbUp : undefined}
                                 disabled={selectedButton === 'thumb-up'}>
                            <img src='thumb-up.png' alt='Thumb up icon'   />
                        </button>
                        <button onClick={handleUnavailabilityClick}
                                className={selectedButton === 'thumb-down' ? classes.thumbDown : undefined}
                                disabled={selectedButton === 'thumb-down'}>
                            <img src='thumb-down.png' alt='thumb down icon'/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompetitionItemDetails;