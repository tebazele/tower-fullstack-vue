import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId
export const TicketSchema = new Schema({
    accountId: { type: ObjectId, required: true, ref: 'Account' },
    eventId: { type: ObjectId, required: true, ref: 'Event' }
},
    { timestamps: true, toJSON: { virtuals: true } })


TicketSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    ref: 'Event',
    foreignField: '_id',
    justOne: true
})