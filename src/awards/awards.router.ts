import {Router} from "express";
import * as AwardsController from "./awards.controller";

const awardsRouter = Router();

awardsRouter.post('/', AwardsController.post);
awardsRouter.get('/', AwardsController.getBySong);
awardsRouter.post('/_counts', AwardsController.getCounts);

export default awardsRouter;
