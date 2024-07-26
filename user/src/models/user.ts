import mongoose from 'mongoose';
// import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  id?: string;
  email: string;
  firstName?: string; // we dont know the user's first name and last name when they sign up
  lastName?: string; // we dont know the user's first name and last name when they sign up
}

// An interface that describes the properties
// that a User Document has (single user) or an instance of a user
interface UserDoc extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  version: number;
}

// An interface that describes the properties
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    optimisticConcurrency: true, // Enable optimistic concurrency control
    versionKey: 'version', // Use 'version' field instead of the default '__v'
  }
);

// userSchema.set("versionKey", "version");
// userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    email: attrs.email,
    firstName: attrs.firstName,
    lastName: attrs.lastName,
  });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
