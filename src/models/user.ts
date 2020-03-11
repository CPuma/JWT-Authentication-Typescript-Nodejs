import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import uniquerValidator from 'mongoose-unique-validator';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: string;
	status: boolean;
	google: boolean;
	comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 50 },
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(email: string) {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(email);
			},
			message: 'The email field cannot be empty'
		}
	},
	password: { type: String, required: true },
	// role: { type: String, required: true, enum: [ rolesENUM, 'Rol invalido' ] },
	role: { type: String, required: true, enum: [ 'ADMIN', 'USER' ], uppercase: true },

	status: { type: Boolean, required: true, default: true },
	google: { type: Boolean, required: true, default: false }
});
UserSchema.pre<IUser>('save', async function(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	return next();
});

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
	console.log('PASSWORD GUARDADO\t', this.password);
	console.log('PASSWORD PARA COMPRAR\t', password);
	return await bcrypt.compare(password, this.password);
};

// eliminado PASSWORD del JSOn al LEER USER
UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

// UNIQUE VALIDATOR
UserSchema.plugin(uniquerValidator);

// Exportamos el model 'User' y retornamos UserSchema
export default mongoose.model<IUser>('User', UserSchema);
