import CompetitionItemDetails from "./CompetitionItemDetails/CompetitionItemDetails";
import classes from './CompetitionListItem.module.css'

function competitionListItem({competitionData, onSelectAvailability, userAvailabilityData, hasValidName, displayErrorModal}) {
    return (
        <>
            <div className={classes.dateAndLocationContainer}>
                <span className={classes.date}>{competitionData.date}</span>
                <span className={classes.location}>{competitionData.location}</span>
            </div>
            <CompetitionItemDetails
                competitionData={competitionData}
                onSelectAvailability={(date, availability) => onSelectAvailability(date, availability)}
                userAvailabilityData={userAvailabilityData}
                hasValidName={hasValidName}
                displayErrorModal={displayErrorModal}
            />
        </>
    )
}

export default competitionListItem;