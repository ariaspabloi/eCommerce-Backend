import {Router} from 'express';
import upload from '../../middlewares/uploadMiddleware.js';
import uploadController from "../../controllers/upload/indexUploadController.js";

export default class UploadRouter {
    #router

    constructor() {
        this.#router = new Router()
            .post('/', upload.single('image'), uploadController.uploadPostController);
    }

    get() {
        return this.#router
    }
}