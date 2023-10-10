const express = require('express');
const app = express();
const port = 3000;

let listaDeTareas = [
  {
    id: "1",
    descripcion: "sacar al perro",
    estaCompletada: false
  },
  {
    id: "2",
    descripcion: "pagar la luz",
    estaCompletada: false
  }
];


const checkValidParams = (req, res, next) => {

  const id = req.params.id;
  if (!id || isNaN(id) || id <= 0) {
    res.status(400).json({ message: 'Parámetros incorrectos' });
  } else {
    next();
  }
};

app.get('/mostrarTareas/:id', checkValidParams, (req, res) => {
  const id = req.params.id;
  const tarea = listaDeTareas.find(t => t.id === id);
  if (tarea) {
    res.json(tarea);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
