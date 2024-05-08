import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface User extends Document {
  email: string;
  username: string;
  role: "user" | "dev" | "admin";
  password: string;
  passwordConfirmed: any;
  active: boolean;
}

interface UserDocument extends User {
  correctPassword: (
    inputPassword: string,
    passFromDB: string,
  ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [validator.isEmail, "must be a valid email address"],
  },

  username: {
    type: String,
    required: [true, "name is required"],
    minlength: 3,
  },
  role: {
    type: String,
    enum: ["user", "dev", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minLength: 8,
    // select: false, //this is not show up when we fetch the user
  },
  passwordConfirmed: {
    type: String,
    required: [true, "please enter password again"],
    validate: {
      validator: function (this: UserDocument, el: string) {
        //this only works on CREATE/SAVE
        return el === this.password;
      },
      message: "passwords do not match ",
    },
  },
  active: { type: Boolean, default: true, select: false },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmed = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword: string,
  passFromDB: string,
) {
  const result = await bcrypt.compare(inputPassword, passFromDB);
  return result;
};

export const User = mongoose.model<UserDocument>("User", userSchema);
