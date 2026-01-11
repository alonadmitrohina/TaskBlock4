import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nomination: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: () => new Date(),
            index: true,
        },
        songId: {
            type: Number,
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

export const AwardModel = model("Award", AwardSchema);
