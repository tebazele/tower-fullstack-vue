import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({
    // id: { type: ObjectId },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, maxLength: 30 },
    description: { type: String, required: true, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 255 },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital', 'exhibit', 'expo', 'other'] }
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})