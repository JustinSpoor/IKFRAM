import mongoose from "mongoose";


const competitionSchema = new mongoose.Schema({
    date: {type: String, required: true},
    location: {type: String, required: true},
    homeTeam: {type: String, required: true},
    homeTeamLogo: {type: String, required: true},
    awayTeam: {type: String, required: true},
    awayTeamLogo: {type: String, required: true},
});

const Competition = mongoose.model('Competition', competitionSchema);

export default Competition;