const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.get('/', controllers.defaultController);
router.post('/addRecord', controllers.addRecordController);
router.post('/updateRecord/:id', controllers.updateRecordController);
router.get('/deleteRecord/:id', controllers.deleteRecordController);

module.exports = router;