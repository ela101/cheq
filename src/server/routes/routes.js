const express = require('express');
const VastController = new (require('../controllers/vast.controller')).VastController();

const router = express.Router();

router.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you  wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,authorization,Accept');

  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    console.log('end options');
    return res.status(200).send();
  }
  next();
});


router.post('/api/create_vast', async (request, response) => {
  try {
    const apps = await VastController.createVast(request);
    return response.status(200).json({ status: 200, data: apps, message: 'Successfully Vasts Retrieved' });
  } catch (err) {
    console.log(`${err.message}`, request, err);
    response.sendStatus(500);
  }
});

router.get('/api/fetch_vasts', async (request, response) => {
  try {
    const apps = await VastController.fetchVasts();
    return response.status(200).json({ status: 200, data: apps, message: 'Successfully Vasts Retrieved' });
  } catch (err) {
    console.log(`${err.message}`, request, err);
    response.sendStatus(500);
  }
});

router.post('/api/edit_vast', async (request, response) => {
  try {
    const apps = await VastController.editVast(request);
    return response.status(200).json({ status: 200, data: apps, message: 'Successfully Vasts Retrieved' });
  } catch (err) {
    console.log(`${err.message}`, request, err);
    response.sendStatus(500);
  }
});

router.get('/:id', async (request, response) => {
  try {
    const vast = await VastController.getVastById(request);
    return response.header('Content-Type', 'text/xml').send(vast);
  } catch (err) {
    console.log(`${err.message}`, request, err);
    response.sendStatus(500);
  }
});

module.exports = router;
