import mongoose from 'mongoose';

export interface Word extends mongoose.Document {
    word: string,
    category: string,
    tips: Array<string>,
}

// Define a estrutura de um documento no MongoDB
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    tips: [{
        type: String,
    }]
});

//Cria um modelo baseado no Schema. Cada modelo é responsável pela criação e leitura
//de documentos do MongoDB
export const Word = mongoose.model<Word>('Word', wordSchema);
