const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const port = 8000;

//Implementando el JWT en mi proyecto

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


app.use((req, res, next) => {
  const beareHeader = req.headers["authorization"];

  if (typeof beareHeader !== "undefined") {
    const bearerToken = beareHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
});

app.get("/api", (req, res) => {
  res.json({
    message: "Bienvenido sergio"
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    nombre: "Nicolas",
    email: "nicolas@gmail.com"
  }
  jwt.sign({ user }, "secreto", { expiresIn: "32s" }, (err, token) => {
    res.json({
      token
    })
  })
})

app.post("/api/post", (req, res) => {
  jwt.verify(req.token, "secreto", (error, authData) => {
    if (error) {
      res.json({
        message: "No tienes acceso"
      });
    } else {
      res.json({
        message: "Post fue creado",
        authData
      })
    }
  })
});


app.use((req, res, next) => {
  jwt.verify(req.token, "secreto", (error, authData) => {
    if (error) {
      res.status(403).json({ message: "No tienes acceso" });
    } else {
      next();
    }
  });
});

app.post('/api/crearTarea', (req, res) => {
  const nuevaTarea = req.body;
  listaDeTareas.push(nuevaTarea);
  res.status(201).json({ message: 'Tarea agregada correctamente' });
});

app.get('/api/verTareas', (req, res) => {
  res.status(200).json(listaDeTareas);
});

app.delete('/api/borrar/:id', (req, res) => {
  const idABorrar = req.params.id;
  const tareaBorrada = listaDeTareas.find(tarea => tarea.id === idABorrar);

  if (!tareaBorrada) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  listaDeTareas = listaDeTareas.filter(tarea => tarea.id !== idABorrar);
  res.status(200).json({ message: 'La tarea se eliminó', tareaBorrada });
});

app.put('/api/actualizarTarea/:id', (req, res) => {
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
