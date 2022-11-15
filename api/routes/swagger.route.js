import {Router} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerUIDocument from "../../swagger.json" assert {type: "json"};
const router = Router();

router.use("/",swaggerUi.serve);
router.get("/",swaggerUi.setup(swaggerUIDocument));


export default router

