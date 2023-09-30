const express = require('express');
const app = express();
const port = 8000;

let listaDeTareas = [
  {
    id: "1",
    descripcion: "Campeonato Piña",
    estaCompletada: false
  },
  {
    id: "2",
    descripcion: "Sintetica en la bombonera",
    estaCompletada: false
  }
];

app.use(express.json());

app.post('/crearTarea', (req, res) => {
  const nuevaTarea = req.body; 
  listaDeTareas.push(nuevaTarea);
  res.status(201).json({ message: 'Tarea agregada correctamente' });
});

app.get('/verTareas', (req, res) => {
  res.status(200).json(listaDeTareas);
});

app.delete('/borrar/:id', (req, res) => {
  const idABorrar = req.params.id; 
  const tareaBorrada = listaDeTareas.find(tarea => tarea.id === idABorrar);

  if (!tareaBorrada) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  listaDeTareas = listaDeTareas.filter(tarea => tarea.id !== idABorrar);
  res.status(200).json({ message: 'La tarea se elimino', tareaBorrada });
});

app.put('/actualizarTarea/:id', (req, res) => {
  const id = req.params.id; 
  let tareaCompletada = listaDeTareas.find(tarea => tarea.id === id);

  if (tareaCompletada) {
    tareaCompletada.estaCompletada = true;
    res.status(200).json({ message: "la tarea se actualizo" });
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


