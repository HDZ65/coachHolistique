// Schema de validation pour les newsLetter

import { Schema, model, models } from 'mongoose';

const newsLetterSchema = new Schema({
    email: { type: String, required: true, unique: true }
});

const NewsLetter = models.NewsLetter || model('NewsLetter', newsLetterSchema);

export default NewsLetter;