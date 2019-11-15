import mongose from 'mongoose';

export interface Player extends mongose.Document {
    nickname: string,
    score: number
};

const playerSchema = new mongose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        default: 0,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1440m' },
    }

});


export const Player = mongose.model<Player>('Player', playerSchema);
