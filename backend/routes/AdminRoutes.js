const express = require('express');
const router = express.Router();
const { createAdmin, adminLogin, forgotPassword } = require('../controllers/AdminController'); 

// Admin routes
router.post('/create-admin', createAdmin); 
router.post('/login', adminLogin);  
router.post('/forgot-password', forgotPassword);  

module.exports = router;
