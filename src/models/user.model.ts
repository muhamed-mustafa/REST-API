import mongoose from 'mongoose';
import config from 'config';
import bcrypt from 'bcrypt';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(currentPassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(+config.get<number>('saltWorkFactor'));

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
  }

  return next();
});

userSchema.methods.comparePassword = async function (
  currentPassword: string
): Promise<Boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(currentPassword, user.password).catch((e) => false);
};

export const User = mongoose.model<UserDocument>('User', userSchema);
