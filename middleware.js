const express = require('express');
const listEditRouter = express.Router();



const validatePostRequest = (req, res, next) => {
  if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).json({ error: 'Solicitud POST con cuerpo vacío' });
  }



  
  next();
};

listEditRouter.use(validatePostRequest);


const validatePutRequest = (req, res, next) => {
  if (req.method === 'PUT' && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).json({ error: 'Solicitud PUT con cuerpo vacío' });
  }
  next();
};


listEditRouter.use(validatePutRequest);


const validateHttpMethod = (req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE']; 

  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }

  next();
};

app.use(validateHttpMethod);


const validateParameters = (req, res, next) => {
  const { id } = req.params;


  if (isNaN(id)) {
    return res.status(400).json({ error: 'Parámetro no válido' });
  }

  next();
};


listViewRouter.use('/:id', validateParameters);








