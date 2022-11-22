const express = require("express")
const app = express()
app.use(express.json())
app.use(require("./api/profesores"))
app.use(require("./api/alumnos"))

app.listen(8080, () => {
    console.log('El servidor está iniciando')
})

app.get('/', (req, res) => {
    respuesta = {
        mensaje: 'Home'
    }
    res.send(respuesta)
})

app.use(function (req, res) {
    respuesta = {
        mensaje: 'URL no encontrada'
    }
    res.status(404).send(respuesta)
})