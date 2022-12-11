const { Router } = require('express')
const app = Router();

/* let alumnos = []

let Alumno = {
    id: '',
    nombres: '',
    apellidos: '',
    matricula: '',
    promedio: ''
} */

const {alumnos} = require ("../models");

app.get('/alumnos/', (req, res) => {
    alumnos.findAll().then((users) =>{
        res.status(200).send(users);
    });
})

app.get('/alumnos/:id', (req, res) => {

    alumnos.findOne({where: {id: req.params.id}}).then((user) => {
        if (!user) {
            res.status(404).json({error: 'alumno no encontrado'});
        } else {
            res.status(200).send(user)
        } 
    });

/*     let Alumno = alumnos.find(alumno => alumno.id == req.params.id)
    if (Alumno == null) {
        res.sendStatus(404)
    }
    res.status(200).send(Alumno) */
})

app.post('/alumnos/', (req, res) => {
    if (validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && !isNaN(req.body.promedio) && validarPromedio(req.body.promedio)) {
       /*  Alumno = {
            'id': req.body.id,
            'nombres': req.body.nombres,
            'apellidos': req.body.apellidos,
            'matricula': req.body.matricula,
            'promedio': req.body.promedio
        }
        alumnos.push(Alumno) */
        alumnos.create({
            nombres : req.body.nombres,
            apellidos: req.body.apellidos,
            matricula: req.body.matricula,
            promedio: req.body.promedio,
            fotoPerfilUrl: req.body.fotoPerfilUrl,
        }).then((alumnos) =>{
            res.status(201).send(alumnos)
        })
    } else {
        res.status(400).json({error: 'datos invalidos'})
    }
})

app.put('/alumnos/:id', (req, res) => {
    if (validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && !isNaN(req.body.promedio) && validarPromedio(req.body.promedio)) {
       /*  let existeAlumno = false
 */
    alumnos.findOne({where: {id: req.params.id}}).then((user) => {
        if (!user) {
            res.status(404).json({error: 'alumno no encontrado'});
        } else {
            user.update(
                {
                    nombres : req.body.nombres,
                    apellidos: req.body.apellidos,
                    matricula: req.body.matricula,
                    promedio: req.body.promedio,
                    fotoPerfilUrl: req.body.fotoPerfilUrl,
                }
            ).then(() =>{
                res.status(200).send(user)
            });
        } 
    });
    

        /* alumnos = alumnos.map((alumno) => {
            if (alumno.id == req.params.id) {
                alumno.nombres = req.body.nombres
                alumno.apellidos = req.body.apellidos
                alumno.matricula = req.body.matricula
                alumno.promedio = req.body.promedio
                existeAlumno = true
            }
            return alumno
        })

        if (!existeAlumno) {
            res.sendStatus(404)
        } else {
            res.status(200).send(alumnoModificado)
        } */
    } else {
        res.status(400).json({error: 'datos invalidos'})
    }

})

app.delete('/alumnos/:id', (req, res) => {

    alumnos.findOne({where: {id: req.params.id}}).then((user) => {
        if (!user) {
            res.status(404).json({error: 'alumno no encontrado'});
        } else {
            user.destroy().then(() =>{
                res.status(200).send(user)
            });
        } 
    });

/*     const tamanoAlumnos = alumnos.length
    alumnos = alumnos.filter((alumno) => {
        return alumno.id != req.params.id ? alumno : null
    })
    if (tamanoAlumnos == alumnos.length) {
        res.sendStatus(404)
    } else {
        res.sendStatus(200)
    } */
})

app.delete('/alumnos', (req, res) => {
    res.status(405).send(alumnos)
})

function validarTexto(data) {
    const regex = new RegExp(/^[a-zA-Z]+/)
    return regex.test(data) ? true : false
}

function validarMatrícula(data) {
    const regex = new RegExp(/^A[0-9]+/)
    return regex.test(data) ? true : false
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
function validarPromedio(data) {
    if (Number.isInteger(data) || isFloat(data)) {
        return true;
    } else {
        return false
    }
}


module.exports = app;