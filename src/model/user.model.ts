import {Document, model, Model, Schema} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    userName: string;
    userEmail: string;
    userPassword: string;
}

export interface IUserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        userEmail: {
            type: String,
            required: true,
            unique: true,
        },
        userPassword: {
            type: String,
            required: true,
        },
    }
);

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("userPassword")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.userPassword = await bcrypt.hash(this.userPassword, salt);
        next();
    } catch (err) {
        next(err as Error);
    }
});

userSchema.method('comparePassword', async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.userPassword);
})

const User = model<IUser, UserModel>('User', userSchema);
export default User;
