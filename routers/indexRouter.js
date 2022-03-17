const router = require("express").Router();
const controller = require('../controllers/indexController')
const fileUpload = require("../middlewares/fileUpload");

router.get('/names', controller.getAllDoodleNames)
router.post('/image/:doodleName', fileUpload.single("image"), controller.saveDatasetImage)

module.exports = router;
