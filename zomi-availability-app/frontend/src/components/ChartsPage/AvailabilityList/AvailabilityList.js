import classes from "./AvailabilityList.module.css";
import AvailabilityListItem from "./AvailabilityListItem/AvailabilityListItem";


function AvailabilityList({competitionList}) {




    return(
        <>
            <section className={classes}>
                {competitionList.map(competitionData => {
                    return (
                        <div key={competitionData.date}>
                            <AvailabilityListItem
                                competitionDate={competitionData.date}
                            />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default AvailabilityList;