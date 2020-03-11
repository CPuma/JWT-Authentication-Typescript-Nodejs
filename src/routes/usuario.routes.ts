import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, getUser } from '../controllers/usuario.controller';

import { verificarToken, verificarAdminRole } from '../middlewares/authentication.middleware';

const router = Router();

router
	.all('**', verificarToken) // VErificamos valides de TOKENS
	.get('', getUsers)
	.get('/:id', getUser)
	.post('', verificarAdminRole, createUser)
	.put('/:id', verificarAdminRole, updateUser)
	.delete('/:id', verificarAdminRole, deleteUser);

export default router;
