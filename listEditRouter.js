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

const checkEmptyBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Cuerpo de solicitud vacío' });
  } else {
    next();
  }
};


const checkValidTask = (req, res, next) => {
  const nuevaTarea = req.body;
  if (!nuevaTarea.descripcion || typeof nuevaTarea.descripcion !== 'string') {
    res.status(400).json({ message: 'Información no válida o atributos faltantes' });
  } else {
    next();
  }
};

const checkValidMethod = (req, res, next) => {
  if (req.method !== 'POST' && req.method !== 'PUT') {
    res.status(400).json({ message: 'Método HTTP no válido' });
  } else {
    next();
  }
};

app.post('/crearTarea', checkEmptyBody, checkValidTask, (req, res) => {
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
  res.status(200).json({ message: 'La tarea se eliminó', tareaBorrada });
});

app.put('/actualizarTarea/:id', checkEmptyBody, checkValidTask, checkValidMethod, (req, res) => {
  const id = req.params.id; 
  let tareaCompletada = listaDeTareas.find(tarea => tarea.id === id);

  if (tareaCompletada) {
    tareaCompletada.estaCompletada = true;
    res.status(200).json({ message: "La tarea se actualizó" });
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
