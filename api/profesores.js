const { Router } = require('express')
const app = Router();

let profesores = []

let Profesor = {
    id: '',
    numeroEmpleado: '',
    nombres: '',
    apellidos: '',
    horasClase: ''
}
app.get('/profesores/', (req, res) => {
    res.status(200).send(profesores)
})

app.get('/profesores/:id', (req, res) => {
    let Profesor = profesores.find(profesor => profesor.id == req.params.id)
    if (Profesor == null) {
        res.sendStatus(404)
    }
    res.status(200).send(Profesor)
})

app.post('/profesores/', (req, res) => {
    if (!isNaN(req.body.id) && !isNaN(req.body.numeroEmpleado) && validarTexto(req.body.nombres) && validarTexto(req.body.apelidos) && !isNaN(req.body.horasClase)) {
        Profesor = {
            'id': req.body.id,
            'numeroEmpleado': req.body.numeroEmpleado,
            'nombres': req.body.nombres,
            'apellidos': req.body.apellidos,
            'horasClase': req.body.horasClase
        }
        profesores.push(Profesor)
        res.status(201).send(profesores)
    } else {
        res.status(400).json({ error: 'datos invalidos' })
    }
})

app.put('/profesores/:id', (req, res) => {
    if (!isNaN(req.body.id) && !isNaN(req.body.numeroEmpleado) && validarTexto(req.body.nombres) && validarTexto(req.body.apelidos) && !isNaN(req.body.horasClase) && validarHoras(req.body.horasClase)) {
        let existeProfesor = false
        profesores = profesores.map((profesor) => {
            if (profesor.id == req.params.id) {
                profesor.numeroEmpleado = req.body.numeroEmpleado
                profesor.nombres = req.body.nombres
                profesor.apellidos = req.body.apellidos
                profesor.horasClase = req.body.horasClase
                existeProfesor = true
            }
            return profesor
        })
        if (!existeProfesor) {
            res.sendStatus(404)
        } else {
            res.status(200).send(profesores)
        }
    } else {
        res.status(400).json({ error: 'datos invalidos' })
    }

})

app.delete('/profesores/:id', (req, res) => {
    const tamanoProfesores = profesores.length
    profesores = profesores.filter((profesor) => {
        return profesor.id != req.params.id ? profesor : null
    })
    if (!req.params) {
        res.sendStatus(405)
    }
    else if (tamanoProfesores == profesores.length) {
        res.sendStatus(404)
    } else {
        res.sendStatus(200)
    }
})

app.delete('/profesores', (req, res) => {
    res.status(405).send(profesores)
})

function validarHoras(data) {
    if (Math.sign(data) == 1) {
        return true;
    }
    return false;
}

function validarTexto(data) {
    const regex = new RegExp(/^[a-zA-Z]+/)
    return regex.test(data) ? true : false
}

module.exports = app;

