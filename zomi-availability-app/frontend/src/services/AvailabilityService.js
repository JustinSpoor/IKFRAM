export async function getCompetitionList() {
    const response = await fetch('http://localhost:2999/competition')
    const resData = await response.json();

    if(!response.ok) {
        throw new Error("failed to fetch competition list");
    }

    return resData;
}

export async function getAvailablePlayerList(competitionDate) {
    const response = await fetch(`http://localhost:2999/availability/${competitionDate}`)
    return await response.json();
}

export async function getAvailablePlayerCount() {
    const response = await fetch('http://localhost:2999/available-player-count')
    return await response.json();
}


export async function putUserAvailability(userAvailabilityData) {
    const response = await fetch(`http://localhost:2999/user/${userAvailabilityData.name}`, {
        method: 'PUT',
        body: JSON.stringify({userAvailabilityData}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    return resData.message;
}

export async function getUserAvailability(userInput) {
    if(userInput === '') {
        return;
    }

    const response = await fetch(`http://localhost:2999/user/${userInput}`)
    return await response.json();
}