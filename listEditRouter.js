
const express = require('express');
const listEditRouter = express.Router();

// Middleware personalizado para manejar errores
const handleErrors = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    // Verifica si el cuerpo de la solicitud está vacío
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío.' });
    }

    // Verifica si la solicitud contiene información no válida o atributos faltantes
    if (!req.body.nombre || !req.body.descripcion) {
      return res.status(400).json({ error: 'Información no válida o atributos faltantes.' });
    }
  }


  next();
};


listEditRouter.post('/crear', handleErrors);
listEditRouter.put('/editar/:id', handleErrors);

module.exports = listEditRouter;
