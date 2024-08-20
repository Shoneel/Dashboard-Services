const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const auth = require('../middleware/auth');

router.get('/', auth, roleController.getAllRoles);
router.post('/', auth, roleController.createRole);
router.put('/:id', auth, roleController.updateRole);
router.delete('/:id', auth, roleController.deleteRole);

module.exports = router;