import { Document, Schema, model } from "mongoose";

export interface IAttendance {
    subject: string;
    presentDates: Date[];
    medicalLeaveDates: Date[];
    absentDates: Date[];
    lastUpdated: Date;
}

export interface IUser extends Document {
    email: string;
    studentId: string;
    name: string;
    isOnboarded: boolean;
    profile: {
        username: string;
        avatar?: string;
        gender?: 'Male' | 'Female' | 'Other';
    };
    academic: {
        campus: 'blr' | 'mpl';
        batch: number;
        branch: string;
        semester: number;
        section: string;
    };
    attendance: IAttendance[];
}

const AttendanceSchema = new Schema(
    {
        subject: {
            type: String,
            ref: 'Subject',
            required: true,
        },
        presentDates: {
            type: [Date],
            default: [],
        },
        medicalLeaveDates: {
            type: [Date],
            default: [],
        },
        absentDates: {
            type: [Date],
            default: [],
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

AttendanceSchema.virtual('totalPresents').get(function () {
    return this.presentDates.length + this.medicalLeaveDates.length;
});

AttendanceSchema.virtual('totalAbsents').get(function () {
    return this.absentDates.length;
});

AttendanceSchema.virtual('effectiveTotal').get(function () {
    return this.presentDates.length + this.medicalLeaveDates.length + this.absentDates.length;
});

AttendanceSchema.virtual('attendancePercentage').get(function () {
    const totalPresents = this.presentDates.length + this.medicalLeaveDates.length;
    const effectiveTotal = totalPresents + this.absentDates.length;

    if (effectiveTotal === 0) return 0;

    return Math.ceil((totalPresents / effectiveTotal) * 100);
});

/**
 * Marks a date as medical leave for the attendance record.
 * If the date exists in absentDates, it will be removed from absentDates and added to medicalLeaveDates.
 * This ensures that a date cannot be both absent and medical leave.
 */
AttendanceSchema.methods.markMedicalLeave = function (date: Date) {
    const dateStr = date.toISOString();

    // Remove the date from absentDates if present
    this.absentDates = this.absentDates.filter((d: Date) => d.toISOString() !== dateStr);

    // Add the date to medicalLeaveDates if not already present
    if (!this.medicalLeaveDates.some((d: Date) => d.toISOString() === dateStr)) {
        this.medicalLeaveDates.push(date);
    }
};


const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        studentId: {
            type: String,
            unique: true,
            index: true,
            trim: true,
            default: '',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        isOnboarded: {
            type: Boolean,
            default: false,
        },
        profile: {
            username: {
                type: String,
                required: true,
                trim: true,
            },
            avatar: {
                type: String,
                default: '',
            },
            gender: {
                type: String,
                enum: ['Male', 'Female', 'Other'],
            },
        },
        academic: {
            campus: {
                type: String,
                enum: ['blr', 'mpl'],
                default: 'blr',
            },
            batch: {
                type: Number,
                min: 2020,
                max: new Date().getFullYear(),
            },
            branch: {
                type: String,
                enum: ['CSE', 'AI', 'DS', 'CYSEC', 'IT', 'ECE', 'ENC', 'VLSI', 'R&AI'],
                uppercase: true,
            },
            semester: {
                type: Number,
                enum: [1, 2, 3, 4, 5, 6, 7, 8],
            },
            section: {
                type: String,
                uppercase: true,
                trim: true,
            },
        },
        attendance: [AttendanceSchema],
    },
    {
        timestamps: true,
    }
);

export default model<IUser>("User", UserSchema);
