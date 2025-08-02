import { Schema, model, Document } from "mongoose";

export interface ISubject extends Document {
    code: string,
    name: string,
    semester: number,
    credit: number,
    totalClasses: number
}

const SubjectSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true
    },
    credit: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    totalClasses: {
        type: Number,
        min: 1,
        required: true
    }
}, {
    timestamps: true
});

export default model<ISubject>("Subject", SubjectSchema);
