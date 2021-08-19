import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: () => "user"
    },
    country: {
        type: String,
    },
    about: {
        type: String
    },
    created: {
        default: Date.now,
        type: Date
    }
});

const User = model('User', UserSchema);

export default User;