import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import _ from 'underscore';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let desde = Number(req.query.desde) || 0;
		let limite = Number(req.query.limite) || 5;

		const users = await User.find({ status: true }, ' name email status role ').skip(desde).limit(limite);
		const count = await User.countDocuments({ status: true });
		return res.status(200).json({ status: 200, message: 'OK', data: { users, count } });
	} catch (error) {
		console.log(error);
		return next('error');
	}
};
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const users = await User.find({ _id: id });
		return res.status(200).json({ status: 200, message: 'OK', data: users });
	} catch (error) {
		return next('error');
	}
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
	try {
		let newUser = new User(req.body);
		await newUser.validate();
		newUser = await newUser.save();
		return res.status(202).json({ status: 202, message: 'OK', data: newUser });
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
	try {
		const { id } = req.params;

		// selecciona solo los campos permitidos,,evita el UNDEFINED
		const body = _.pick(req.body, [ 'name', 'role', 'status' ]);

		// ---- Busca devuelve y actualiza
		// runvalidator --activa VALIDACIONES al actualizar
		// NEW __ true -- return NEW USER..  false -- return OLD USER
		let data = await User.findByIdAndUpdate({ _id: id }, body, { runValidators: true, new: true });

		// ---- solo ACtualiza
		// let data = await User.updateOne({ _id: id }, req.body, { runValidators: true });

		return res.status(200).json({ status: 200, message: 'OK', data });
	} catch (error) {
		next(error);
	}
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
	try {
		const { id } = req.params;
		let data = await User.remove({ _id: id });
		return res.status(200).json({ status: 200, message: 'OK', data });
	} catch (error) {
		next(error);
	}
};
