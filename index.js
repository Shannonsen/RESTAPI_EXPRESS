const express = require("express")
const app = express()
app.use(express.json())
app.use(require("./api/profesores"))
app.use(require("./api/alumnos"))

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

app.use(function (req, res, next) {
    respuesta = {
        mensaje: 'URL no encontrada'
    }
    res.status(404).send(respuesta)
})