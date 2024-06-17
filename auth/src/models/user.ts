import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
// This is essentially the entire collection of users
// and the functions that we can use on that collection
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // doc is the document that is being converted
      // ret is the properties that are going to be returned
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// to handle any async code inside of a mongoose function
// we use the pre function to run some code before we save
// a user to the database (this is a middleware function)
// we use the done callback to tell mongoose that we are done
// with the async code and to continue with the save process
userSchema.pre('save', async function (done) {
  // if we used an arrow function here, the value of this would be
  // the entire user document, but we need to use a normal function
  // because we need to use the this keyword to access the password
  // property of the user document that is being saved to the database
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// This pattern is used to build a user so TS can have insight
// in what the correct values are. How we get TS involved!
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
