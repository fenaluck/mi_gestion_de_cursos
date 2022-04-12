// importando librerias
const {getcurso, updateCurso, newCurso, deletCurso} = require('./db.js')
const express = require('express');
const chalk = require('chalk');
const app = express();
const pt = console.log;
app.use(express.static('static'));
color = chalk.rgb(150,190,10).bold

//post de curso
app.post('/curso', async (req, res)=>{
    try{
        let body=""
        req.on("data", (data)=>{
            body += data
        })
        
        req.on("end", async()=>{
        //creamos nuestra variable
        const datos = JSON.parse(body);
        await newCurso(datos.nombre, datos.nivelTecnico, datos.fechaInicio, datos.duracion)
        
        res.json({datos});
        })
    } catch (error){
        pt('Error al realizar la consulta')
        res.status(400).send({error})
    }
});

//
app.get('/cursos', async (req, res)=>{
    let curso
    try {
        curso = await getcurso()
        res.json(curso)
        
        //res.send(JSON.stringify(curso))
        
    } catch (error) {
        pt(error)
    }
});

//actualizar curso
app.put('/curso', async (req, res)=>{
    
    pt('probando conexion')
 /*   
    try{
        let body=""
        req.on("data", (data)=>{
        body += data
        })
        //desempaquetamos la respuesta
        req.on("end", async()=>{
        // recuperamos el id 
        id = req.query.id
        id2= req.data.id
        pt(id2)
        nombre = req.query.nombre
        nivel = req.query.nivel
        fecha = req.query.fecha
        duracion = req.query.duracion
        pt(color(id));
        //transformamos el string del body a un objeto
        const datos = JSON.parse(body);
        //llamamos a la funcion
        await updateCurso(datos.id, datos.nombre, datos.nivel, datos.fecha, datos.duracion)
       
        res.json({datos});
    })
    } catch (error){
        pt('Error al realizar la consulta')
    }
    */
})

//borrar ucursos
app.delete('/curso/:id', async (req, res)=>{
    try{
        let id = parseInt(req.params.id)
        pt(id)
        
        //lamamos a la funcion
        await deletCurso(id)
        
    } catch (error){
        pt('Error al intentar eliminar el curso')
    }
    res.json({datos:'eliminados'});
});

//apertura del puerto
app.listen(3000, () => {
    pt(color(`Server started on port 3000`));
});