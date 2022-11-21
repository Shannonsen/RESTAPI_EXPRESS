const express = require("express")
const app = express()
app.use(express.json())

let alumnos = []
let profesores = []

let Alumno = {
    id: '',
    nombres: '',
    apellidos: '',
    matricula: '',
    promedio: ''
}

let Profesor = {
    id: '',
    numeroEmpleado: '',
    nombres: '',
    apellidos: '',
    horasClase: ''
}


app.listen(8080, () => {
    console.log('El servidor está inicializando en el puerto 8080')
})

app.get('/', (req, res) => {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Punto de inicio'
    }
    res.send(respuesta)
})

app.get('/alumnos/', (req, res) => {
    res.status(200).send(alumnos)
})

app.get('/alumnos/:id', (req, res) => {
    let Alumno = alumnos.find(alumno => alumno.id == req.params.id)
    if (Alumno == null) {
        res.sendStatus(404)
    }
    res.status(200).send(Alumno)
})

app.post('/alumnos/', (req, res) => {
    if (!isNaN(req.body.id) && validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && !isNaN(req.body.promedio)) {
        Alumno = {
            'id': req.body.id,
            'nombres': req.body.nombres,
            'apellidos': req.body.apelidos,
            'matricula': req.body.matricula,
            'promedio': req.body.promedio
        }
        alumnos.push(Alumno)
        res.status(201).send(alumnos)
    } else {
        res.status(400).send(alumnos)
    }
})

app.put('/alumnos/:id', (req, res) => {
    if (!isNaN(req.body.id) && validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && !isNaN(req.body.promedio)) {
        let existeAlumno = false
        alumnos = alumnos.map((alumno) => {
            if (alumno.id == req.params.id) {
                alumno.nombres = req.body.nombres
                alumno.matricula = req.body.matricula
                existeAlumno = true
            }
            return alumno
        })
        if (!existeAlumno) {
            res.sendStatus(404)
        } else {
            res.status(200).send(alumnos)
        }
    } else {
        res.status(400).send(alumnos)
    }

})

app.delete('/alumnos/:id', (req, res) => {
    const tamanoAlumnos = alumnos.length
    alumnos = alumnos.filter((alumno) => {
        return alumno.id != req.params.id ? alumno : null
    })
    if (tamanoAlumnos == alumnos.length) {
        res.sendStatus(404)
    } else {
        res.sendStatus(200)
    }
})

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
            'apellidos': req.body.apelidos,
            'horasClase': req.body.horasClase
        }
        profesores.push(Profesor)
        res.status(201).send(profesores)
    } else {
        res.status(400).send(profesores)
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
        res.status(400).send(profesores)
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


/* app.put('/alumnos/', (req, res) => {
    res.sendStatus(405)
})
app.delete('/alumnos/', (req, res) => {
    res.sendStatus(405)
})
app.post('/alumnos/:id', (req, res) => {
    res.sendStatus(405)
})
app.put('/profesores/', (req, res) => {
    res.sendStatus(405)
})
app.delete('/profesores/', (req, res) => {
    res.sendStatus(405)
})
app.post('/profesores/:id', (req, res) => {
    res.sendStatus(405)
}) */

app.use(function (req, res, next) {
    respuesta = {
        mensaje: 'URL no encontrada'
    }
    res.status(404).send(respuesta)
})

function validarHoras(data) {
    if (Math.sign(data) == 1) {
        return true;
    }
    return false;
}

function validarId(data) {
    const regex = new RegExp(/^[0-9]+/);
    return regex.test(data) ? true : false;
}

function validarTexto(data) {
    const regex = new RegExp(/^[a-zA-Z]+/)
    return regex.test(data) ? true : false
}

function validarMatrícula(data) {
    const regex = new RegExp(/^A[0-9]+/)
    return regex.test(data) ? true : false
}