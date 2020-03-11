export default {
	server: { PORT: process.env.SERVER_PORT || 3000 },
	db: {
		HOST: process.env.DB_HOST || 'localhost',
		PORT: process.env.DB_PORT || 27017,
		DATABASE: process.env.DB_DATABASE || 'jwtcursonode',
		USER: process.env.DB_USER || '',
		PASSWORD: process.env.DB_PASSWORD || ''
	},
	token: {
		SEED: process.env.TOKEN_SEED|| 'este-es-el-secret',
		CADUCIDAD: process.env.TOKEN_CADUCIDAD || 60 * 60 * 24 * 30
	}
};
