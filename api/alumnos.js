const { Router } = require('express')
const app = Router();

let alumnos = []

let Alumno = {
    id: '',
    nombres: '',
    apellidos: '',
    matricula: '',
    promedio: ''
}

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
    if (!isNaN(req.body.id) && validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && !isNaN(req.body.promedio) && validarPromedio(req.body.promedio)) {
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
        res.status(400).json({error: 'datos invalidos'})
    }
})

app.put('/alumnos/:id', (req, res) => {
    if (!isNaN(req.body.id) && validarTexto(req.body.nombres) && validarTexto(req.body.apellidos) && validarMatrícula(req.body.matricula) && !isNaN(req.body.promedio) && validarPromedio(req.body.promedio)) {
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
        res.status(400).json({error: 'datos invalidos'})
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