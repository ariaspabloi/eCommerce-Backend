import express from 'express'
import userInfoController from "../../controllers/userInfo/indexUserInfoController.js";

const router = express.Router();

router.get('/profile', userInfoController.getUserInfo)

export default router