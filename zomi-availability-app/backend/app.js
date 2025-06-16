import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';

import Competition from './models/competition.js';
import User from './models/user.js'
import competitionSeederData from "./seeder/competitionSeeder.js";
import userSeederData from "./seeder/userSeeder.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.static('images'));
app.use(express.json());


mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    // .then(() => runCompetitionSeeder(competitionSeederData))
    // .then(() => runUserSeeder(userSeederData))
    .catch(err => console.error('MongoDB connection error', err));

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function runCompetitionSeeder(seederData) {
    try{
        const competition = Competition.insertMany(seederData);
    } catch (error) {
        console.log(error);
    }
}

function runUserSeeder(seederData) {
    try{
        const user = User.insertMany(seederData);
    } catch (error) {
        console.log(error)
    }
}

app.get('/competition', async (req, res) => {
    try{
        const competition = await Competition.find();
        res.status(200).json(competition)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.put('/user/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { userAvailabilityData } = req.body;

        const newUserData = userAvailabilityData.userData;

        let user = await User.findOne({ name });

        if (!user) {
            user = new User({
                name: userAvailabilityData.name,
                userData: newUserData,
            });
            await User.insertMany(user);
            return res.status(201).json({ message: 'New user created', user });
        }

        const existingEntriesMap = new Map(user.userData.map(entry => [entry.date, entry]));

        newUserData.forEach((newEntry) => {
            const existingEntry = existingEntriesMap.get(newEntry.date);

            if (existingEntry) {
                existingEntry.availability = newEntry.availability;
            } else {
                user.userData.push(newEntry);
            }
        });

        await user.save();

        res.status(200).json({ message: 'User availability updated', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/user/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const user = await User.findOne( {name})

        if(user === null) {
            return;
        }

        res.status(200).json([user]);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/availability/:date', async (req, res) => {
    try {
        const date = req.params.date;

        let availableUsers = await User.find(
            { "userData.date": date, "userData.availability": true },
            { name: 1, userData: 1 }
        );

        availableUsers = availableUsers.map(user => ({
            name: user.name,
            userData: user.userData.filter(
                data => data.date === date && data.availability
            )
        })).filter(user => user.userData.length > 0);

        if (!availableUsers) {
            res.status(404).json({ message: 'No Available players found for this date'})
        }

        res.status(200).json(availableUsers)

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/available-player-count', async (req, res) => {
    try {
        const users = await User.find({}, 'userData');

        let dateCounts = {};

        users.forEach(user => {
            user.userData.forEach(data => {
                const { date, availability } = data;

                if (!dateCounts[date]) {
                    dateCounts[date] = 0;
                }

                if (availability) {
                    dateCounts[date]++;
                }
            });
        });

        const result = Object.entries(dateCounts).map(([date, count]) => ({
            date,
            count
        }));

            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ message: 'Internal Server Error' });
        }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})