import mongoose, { Schema, Document } from 'mongoose';

interface InterfaceBlockedHour extends Document {
  dateTime: string;
}

const BlockedHourSchema: Schema = new Schema({
  dateTime: { type: String, required: true },
});

export default mongoose.models.BlockedHour || mongoose.model<InterfaceBlockedHour>('BlockedHour', BlockedHourSchema);