"use strict";
const router = require('express').Router();
const express = require('express');
const userController = require('../controller/auth.controller');
router.post('/signup', userController.SignUp);
router.post('/signin', userController.SignIn);
module.exports = router;
