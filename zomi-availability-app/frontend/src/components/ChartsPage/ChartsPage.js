import AvailabilityList from "./AvailabilityList/AvailabilityList";
import classes from './ChartsPage.module.css'
import {useEffect, useState} from "react";
import {getCompetitionList} from "../../services/AvailabilityService";
import AvailabilityChart from "./AvailabilityChart/AvailabilityChart";


function ChartsPage() {
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
            <AvailabilityChart
                competitionList={competitionList}
            />
            <AvailabilityList
                competitionList={competitionList}
            />
        </>
    )
}

export default ChartsPage;