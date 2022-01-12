import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as scmtmpltController from '../controllers/scmtmplt/scmtmplt.controller';
import * as scmtmpltgnwController from '../controllers/scmtmpltgnw/scmtmpltgnw.controller';
import * as scmskumasterController from '../controllers/scmskumaster/scmskumaster.controller';
import * as scmgamesetupController from '../controllers/scmgamesetup/scmgamesetup.controller';
import * as scmGameTransController from '../controllers/scmgametrans/scmgametrans.controller';
import * as skuDemandController from '../controllers/skudemand/skudemand.controller';
import * as gamePlayerController from '../controllers/gameplayer/gameplayer.controller';
import upload from '../middleware/upload';
const router = express.Router();

// Routes for uploading SKU Demand Model
// router.post('/uploadskudemand', upload.single("file"), skuDemandController.uploadSkuDemand);
// router.get('/getskudemand', skuDemandController.getSkuDemand);

// Routes for uploading game playerr
// router.post('/uploadgameplayer', upload.single("file"), gamePlayerController.uploadGamePlayer);
// router.get('/getgameplayer', gamePlayerController.getGamePlayer);

// Routes for login and register and logout
router.post('/login',userController.login);
router.post('/register', validate(userValidator.register), userController.register);
router.post('/logout', userController.logout);	

// Routes for users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);

// Routes for template master
router.post('/addtemplate', scmtmpltController.addTemplate);
router.put('/edittemplate/:tmplt_id', scmtmpltController.editTemplate);
router.get('/gettemplates', scmtmpltController.getTemplate);
router.get('/gettemplates/:id', scmtmpltController.getTemplateById);
router.delete('/deletetemplate/:id', scmtmpltController.deleteTemplate);

// Routes for template network
router.post('/addtemplategnw', scmtmpltgnwController.addTemplateGnw);
router.put('/edittemplategnw/:tmplt_id', scmtmpltgnwController.editTemplateGnw);
router.get('/gettemplategnw', scmtmpltgnwController.getTemplateGnw);    
router.get('/gettemplategnw/:id', scmtmpltgnwController.getTemplateGnwById);
router.delete('/deletetemplategnw/:id', scmtmpltgnwController.deleteTemplateGnwById);

// Routes for scm sku master
router.post('/addskumaster', scmskumasterController.addScmSkuMaster);
router.put('/editskumaster/:tmplt_id', scmskumasterController.editScmSkuMaster);
router.get('/getskumaster', scmskumasterController.getScmSkuMaster);
router.get('/getskumaster/:id', scmskumasterController.getScmSkuMasterById);	
router.delete('/deleteskumaster/:id', scmskumasterController.deleteScmSkuMaster);

// Routes for scm game setup
router.post('/addgamesetup', scmgamesetupController.addScmGameSetup);
router.put('/editgamesetup/:scm_game_id', scmgamesetupController.editScmGameSetup);
router.get('/getgamesetup', scmgamesetupController.getAllScmGameSetup);
router.get('/getgamesetup/:scm_game_id', scmgamesetupController.getScmGameSetupById);
router.delete('/deletegamesetup/:scm_game_id', scmgamesetupController.deleteScmGameSetupById);
router.get('/getactivegame', scmgamesetupController.getActiveGame);
router.get('/getcompletedgame', scmgamesetupController.getCompletedGame);

router.get('/getgamedata', scmgamesetupController.getallgamesetupdata);


// Routes for scm game transaction
router.post('/addgametrans', scmGameTransController.addScmGameTrans);
router.put('/editgametrans/:game_trans_id', scmGameTransController.editScmGameTrans);
router.get('/getgametrans', scmGameTransController.getAllScmGameTrans);
router.get('/getgametrans/:id', scmGameTransController.getScmGameTransById);
router.delete('/deletegametrans/:id', scmGameTransController.deleteScmGameTransById);


router.post('/addnewtemplate', upload.array("file", 4), scmtmpltController.addNewTemplate);
router.post('/addnewgame', upload.single("file"), scmgamesetupController.addNewGameMaster);


module.exports = router;
