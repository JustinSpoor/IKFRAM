import AvailabilityItemDetails from "./AvailabilityItemDetails/AvailabilityItemDetails";

function AvailabilityListItem({competitionDate}) {
    return (
        <>
            <AvailabilityItemDetails
                competitionDate={competitionDate}
            />
        </>
    )
}

export default AvailabilityListItem;