import InfoRouter from "./InfoRouter.js";
import infoController from "../../controllers/info/indexInfoController.js";

const infoRouter = new InfoRouter(infoController)

export default infoRouter.get()