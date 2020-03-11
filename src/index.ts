import app from './app';

// Database Connection
import './database';

// PORT server
const PORT = app.get('port');

app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
});
