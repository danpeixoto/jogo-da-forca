import mongoose from "mongoose";
import { Player } from "../player/player.model";

export interface Competition extends mongoose.Document {
    difficulty: string,
    players: Array<mongoose.Types.ObjectId>,
};


const competitionSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        default: "moderate",
        required: true,
        enum: ["moderate", "easy", "hard"],
        unique: true,
    },
    players: [{
        type: mongoose.Types.ObjectId,
        ref: "Player",
    }]
});

export const Competition = mongoose.model<Competition>("Competition", competitionSchema);
