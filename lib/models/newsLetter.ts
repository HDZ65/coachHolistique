// Schema models newsLetter

import { Schema, model, models } from 'mongoose';

const newsLetterSchema = new Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const NewsLetter = models.NewsLetter || model('NewsLetter', newsLetterSchema);

export default NewsLetter;