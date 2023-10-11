const express = require('express');
const app = express();
app.use(express.json());


let tareas = [];


app.post('/tareas', (req, res) => {
  const nuevaTarea = req.body;
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea); 
});


app.get('/tareas', (req, res) => {
  res.status(200).json(tareas); 
});


app.get('/tareas/:id', (req, res) => {
  const id = req.params.id;
  const tarea = tareas[id];
  if (tarea) {
    res.status(200).json(tarea);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' }); 
  }
});


app.put('/tareas/:id', (req, res) => {
  const id = req.params.id;
  const tareaActualizada = req.body;
  if (tareas[id]) {
    tareas[id] = tareaActualizada;
    res.status(200).json({ tareaActualizada }); 
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' }); 
  }
});


app.delete('/tareas/:id', (req, res) => {
  const id = req.params.id;
  if (tareas[id]) {
    tareas.splice(id, 1);
    res.status(204).send(); 
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' }); // 404 Not Found
  }
});


app.get('/tareas/completas', (req, res) => {
  const tareasCompletas = tareas.filter(tarea => tarea.completada);
  res.status(200).json(tareasCompletas); 
});


app.get('/tareas/incompletas', (req, res) => {
  const tareasIncompletas = tareas.filter(tarea => !tarea.completada);
  res.status(200).json(tareasIncompletas); 
});


app.listen(3000, () => {
  console.log('API de tareas en ejecución en el puerto 3000');
});
