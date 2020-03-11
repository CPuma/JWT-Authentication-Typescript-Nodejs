import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/app';
import { ErrorHandler } from '../errors/error-handler';
const { SEED } = config.token;

export const verificarToken = async (
	req: Request | any,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		//Obteniendo Token Authorization
		let token: string = req.get('Authorization') || '';

		jwt.decode;
		// VErificando VALIDES del TOKEN
		const decoded: any = jwt.verify(token, SEED);

		//pasamos USEr del Token . para validar ROLE luego
		req.user = decoded.user;
		next();
	} catch (error) {
		if (error.name === 'JsonWebTokenError') error = new ErrorHandler(401, 'Unauthorized');
		next(error);
	}
};

export const verificarAdminRole = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		let { user } = req;
		if (!user || user.role !== 'ADMIN') throw new ErrorHandler(401, 'Unauthorized, User is not ADMIN');
		next();
	} catch (error) {
		next(error);
	}
};
