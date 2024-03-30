//Constante con la cual exportamos express
//Para el manejo de respuestas del servidor y middleware.
const express = require('express')

//Exportamos la conexión con SQL
const mysql = require('mysql')

//Nos ayuda a convertir el flujo de datos para facilitar
//La lectura por medio de node JS.
const bodyParser = require('body-parser')


const app = express();
const port = 2000;

//Ahora configuramos la conexión con MYSQL.

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'autentication'
});

//Creamos la conexión a la base de datos.

connection.connect((err) =>{
    if(err){
        console.log('Error al conectar la base de datos.') + err.stack
    }
});

//Creamos el middleware para analizar las solicitudes que llegan.
app.use(bodyParser.urlencoded({extended: true}));

//Ruta para mostrar el formulario.

app.get('/',(req, res)=>{
    res.send(`
    <h2> Log In </h2>
    <form action="/login" method="POST">
        <label for="username"> Nombre de Usuario: </label><br>
        <input type="text" id="username" name="username"><br>
        <label for="password">Contraseña: </label><br>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" value="Iniciar sesion">
    </form>
    `);
});

//Ruta para procesar el inicio de sesión 

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?";
    connection.query(query, [username,password], (error, results) => {
        if(error) throw error;

        if(results.length > 0){
            const user = results[0];
            res.send(`Inicio de sesión exitoso. Bienvenido, ${user.nombre_usuario}!`);
        } else {
            res.send('Inicio de sesión fallido. Verifica tu nombre de usuario y contraseña.')
        }
    });
});

//Iniciar el servidor 

app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`)
});