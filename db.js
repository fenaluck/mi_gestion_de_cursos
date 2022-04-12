// importando librerias
const {Pool} = require ('pg')
const pt = console.log;
const chalk = require('chalk');
color = chalk.rgb(150,190,10).bold

// corriendo el servidor
const pool = new Pool({
    user:'postgres',
    host:'127.0.0.1',
    database:'cursos',
    max:20,
    min:2,
    idleTimeoutMillis:5000,
    connectionTimeoutMillis: 2000
})

// consultar usuarios
async function getcurso() {
    let client = await pool.connect();
    
    let res = await client.query(
        `select * from cursos`
    )
    client.release()
    return res.rows
}

// funcion insertar nuevos usuarios
async function newCurso(nombre, nivel, fecha, duracion) {
    // solicitamos un cliente 
    let client = await pool.connect()
    // creamos la query 
    const res = await client.query({
    text: "insert into cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) returning *",
    values: [nombre, nivel, fecha, duracion]
    })
    client.release()
    return res.rows;
}

// funcion actualizar
async function updateCurso(id, nombre, nivel, fecha, duracion  ){
   // solicitamos un cliente 
   const client = await pool.connect();
   
   // creamos nuestra query
   const res = await client.query({
    text: "update cursos set nombre = $2, nivel = $3, fecha = $4, duracion = $5 where id = $1",
    values: [id, nombre, nivel, fecha, duracion]
    })
    
    client.release()
    return res.json({todo:'ok'});
}
// eliminar usuario
async function deletCurso(id){
    // solicitamos un cliente 
    const client = await pool.connect();
    // creamos nuestra query
    const res = await client.query({
     text: "delete from cursos where id =$1",
     values: [id]
    })
    pt(res.rows)
    //finslizamos la peticion al cliente
    client.release()
    
}


module.exports = {getcurso, updateCurso, newCurso, deletCurso}


