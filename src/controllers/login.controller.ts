import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../errors/error-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/app';
const { CADUCIDAD, SEED } = config.token;

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
	try {
		let { body } = req;
		// Existe USer ?
		const user = await User.findOne({ email: body.email });
		if (!user) throw new ErrorHandler(400, 'User not exists');

		// Pasword Correcto ?
		const isCorrectPassword = await user.comparePassword(body.password);
		if (!isCorrectPassword) throw new ErrorHandler(400, 'Password invalid');

		// Generando Token
		let token = jwt.sign({ user }, SEED, { expiresIn: CADUCIDAD });

		return res.status(201).json({ status: 'OK', data: { user, token } });
	} catch (error) {
		next(error);
	}
};

export const probandoLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(202).send('OK');
	} catch (error) {
		next(error);
	}
};
