import mongoose from "mongoose";
// import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  firstName: string;
	lastName: string;
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
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
		optimisticConcurrency: true,  // Enable optimistic concurrency control
		versionKey: "version", // Use 'version' field instead of the default '__v'
	}
);

// userSchema.set("versionKey", "version");
// userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };