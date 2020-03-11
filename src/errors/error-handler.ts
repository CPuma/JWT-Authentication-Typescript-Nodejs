import { Response, Request, NextFunction } from 'express';

export class ErrorHandler extends Error {
	statusCode: number;
	message: string;

	constructor(statusCode: number, message: string) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

export const handlingErrors = (err: any, req: Request, res: Response, next: NextFunction): Response => {
	let statusCode: number = 500,
		message: string = 'Internal Error.';

	// ERRORES DE MANUALES
	if (err instanceof ErrorHandler) {
		statusCode = err.statusCode;
		message = err.message;
	}

	// ERRORES DE MONGOOSE
	if (err.name && err.message) {
		console.error({ error: err.name, message: err.message });
		if (err.name === 'ValidationError') {
			statusCode = 400;
			message = err.message;
		} else if (err.name === 'SyntaxError' || err.name === 'CastError') {
			statusCode = 400;
			message = 'Verifique la Sintaxis y propiedades de la consulta';
		}
	}

	return res.status(statusCode).json({
		status: 'error',
		message
	});
};
