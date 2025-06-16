import CompetitionList from "./CompetitionList/CompetitionList";
import {useEffect, useState} from "react";
import NameInput from './NameInput/NameInput'
import classes from './HomePage.module.css'
import {getUserAvailability, putUserAvailability} from "../../services/AvailabilityService";
import Modal from "../Modal/Modal";


function HomePage() {
    const [userAvailabilityData, setUserAvailabilityData] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [userInput, setUserInput] = useState({
        name: ''
    });

    useEffect(() => {
        setUserAvailabilityData([])
        if (userInput.name.trim() === '') {
            if (userAvailabilityData.length !== 0) {
                setUserAvailabilityData([]);
            }
            return
        }

        const timeout = setTimeout(() => {
            fetchUserAvailability(userInput.name)
        }, 300)

        return () => clearTimeout(timeout);
    }, [userInput.name])


    function handleSelectAvailability(date, availability) {
        if (checkIsValidName()) {
            displayErrorModal()
            return;
        }

        if(userAvailabilityData.name === userInput.name) {
        }

        let userExists = userAvailabilityData.find((user) => user.name.toLowerCase().trim() === userInput.name.toLowerCase().trim())

        if(userExists) {
            let userDateExists = userExists.userData.find((entry) => entry.date === date);
            if(userDateExists) {
                userDateExists.availability = availability;
            } else {
                userExists.userData.push({date: date, availability: availability})
            }
        } else {
            userAvailabilityData.push({name: userInput.name.toLowerCase().trim(), userData: [{date: date, availability: availability}]})
        }

    }

    function checkIsValidName() {
        return userInput.name.trim() === '';
    }

    function displayErrorModal() {
        setShowErrorModal(true);
    }

    function displayConfirmationModal() {
        setShowConfirmationModal(true);
    }

    function handleSubmit() {
        if (checkIsValidName()) {
            displayErrorModal()
            return;
        }
        putUserAvailability(userAvailabilityData[0]).then(() => {
            displayConfirmationModal(true);
        });
    }

     function handleUserInputChange(userInput) {
         setUserInput( (prevUserInput) => ({
                ...prevUserInput,
                name: userInput
            }));
     }

    async function fetchUserAvailability(name) {
        try {
            const user = await getUserAvailability(name.toLowerCase().trim());

            if(user){
                setUserAvailabilityData(user);

            } else {
                setUserAvailabilityData([])
            }
        } catch (error) {
            console.error('Error fetching user availability:', error);
        }
    }

    return (
        <>
            {showErrorModal && (
                <Modal
                    message="Please enter a name before proceeding."
                    onClose={() => setShowErrorModal(false)}
                />
            )}
            {showConfirmationModal && (
                <Modal
                    message="Availability successfully submitted."
                    onClose={() => setShowConfirmationModal(false)}
                />
            )}

            <NameInput userInput={userInput} onChange={handleUserInputChange}/>
            <CompetitionList
                onSelectAvailability={handleSelectAvailability}
                userAvailabilityData={userAvailabilityData[0]}
                hasValidName={checkIsValidName()}
                displayErrorModal={displayErrorModal}
            />
            <div className={classes.submitButtonContainer}>
                <button onClick={handleSubmit} className={classes.submit}>Submit</button>
            </div>
        </>
    );
}

export default HomePage;