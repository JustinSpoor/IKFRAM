import CompetitionListItem from "./CompetitionListItem/CompetitionListItem";
import classes from './CompetitionList.module.css'
import {getCompetitionList} from "../../../services/AvailabilityService";
import {useEffect, useState} from "react";

function CompetitionList({onSelectAvailability, userAvailabilityData, hasValidName, displayErrorModal}) {
    const [competitionList, setCompetitionList] = useState([])


    useEffect(() => {
        async function fetchCompetitionList() {
            try {
                const competitionList = await getCompetitionList();
                setCompetitionList(competitionList);
            } catch (error) {
                console.error("failed to get competition List")
            }
        }
        fetchCompetitionList();
    }, [])


    return (
        <>
            <section className={classes}>
                {competitionList.map(competitionData => {
                    return (
                        <div key={competitionData.date}>
                            <CompetitionListItem
                                competitionData={competitionData}
                                onSelectAvailability={(date ,availability) => onSelectAvailability(date, availability)}
                                userAvailabilityData={userAvailabilityData}
                                hasValidName={hasValidName}
                                displayErrorModal={displayErrorModal}
                            />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default CompetitionList;