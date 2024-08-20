const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const auth = require('../middleware/auth');

router.get('/', auth, organizationController.getAllOrganizations);
router.post('/', auth, organizationController.createOrganization);
router.put('/:id', auth, organizationController.updateOrganization);
router.delete('/:id', auth, organizationController.deleteOrganization);

module.exports = router;