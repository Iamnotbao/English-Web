"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
//auth
router.post('/signup', auth_controller_1.SignUp);
router.post('/signin', auth_controller_1.SignIn);
router.get('/signout', auth_controller_1.SignOut);
router.get('/refresh', auth_controller_1.userFreshToken);
exports.default = router;
