//Constante con la cual exportamos express
//Para el manejo de respuestas del servidor y middleware.
const express = require('express')

//Exportamos la conexión con SQL
const mysql = require('mysql')

//Nos ayuda a convertir el flujo de datos para facilitar
//La lectura por medio de node JS.
const bodyParser = require('body-parser')


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
app.use(bodyParser.urlencoded({extended:true}));

//Ruta para mostrar el formulario.

app.get('/',(req, res)=>{
    res.send(`
    <h2> Log In </h2>
    <form action="/login" method="POST">
        <label for="username"> Nombre de Usuario: </label>
        <input type="text" id="username" name="username"><br>
        <label for="password" id="password" name="password"><br>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" value="Iniciar sesion">
    </form>
    `);
});

//Ruta para procesar el inicio de sesión 

