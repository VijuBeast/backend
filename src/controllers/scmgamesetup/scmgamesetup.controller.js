import { ScmGameSetup, ScmTmplt, fileUploads } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
const gamePlayer = require("../../models");
const GamePlayer = gamePlayer.gameplayer;
const Op = require('sequelize').Op;
const Sequelize = require('sequelize');
require('dotenv');
const csv = require('fast-csv');
const fs = require('fs');

// Add ScmGameSetup
export const addScmGameSetup = async (req, res) => {
    try {
        const {
            scm_game_id,
            tmplt_id,
            game_rounds,
            game_round_duration,
            game_round_duration_unit,
            game_player_list,
            game_start_datetime,
            game_sku_list,
            game_demand_data,
            game_initializations,
            game_status
        } = req.body;
        const scmGameSetup = await ScmGameSetup.create({
            scm_game_id,
            tmplt_id,
            game_rounds,
            game_round_duration,
            game_round_duration_unit,
            game_player_list,
            game_start_datetime,
            game_sku_list,
            game_demand_data,
            game_initializations,
            game_status
        });

        return successResponse(req, res, { scmGameSetup });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Edit scmGameSetup
export const editScmGameSetup = async (req, res) => {
    try {
        const { scm_game_id } = req.params;
        const {
            tmplt_id,
            game_rounds,
            game_round_duration,
            game_round_duration_unit,
            game_player_list,
            game_start_datetime,
            game_sku_list,
            game_demand_data,
            game_initializations,
            game_status
        } = req.body;
        const scmGameSetup = await ScmGameSetup.update({
            tmplt_id,
            game_rounds,
            game_round_duration,
            game_round_duration_unit,
            game_player_list,
            game_start_datetime,
            game_sku_list,
            game_demand_data,
            game_initializations,
            game_status
        }, {
            where: {
                scm_game_id: scm_game_id
            }
        })
        return successResponse(req, res, { scmGameSetup });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get all scmGameSetup
export const getAllScmGameSetup = async (req, res) => {
    try {
        const scmGameSetup = await ScmGameSetup.sequelize.query(`
        SELECT scmgamesetups.scm_game_id, scmtmplts.tmplt_name, scmtmplts.tmplt_industry, 
        scmgamesetups.game_status FROM scmgamesetups INNER JOIN scmtmplts ON 
        scmgamesetups.tmplt_id = scmtmplts.tmplt_id;`);
        return successResponse(req, res, { scmGameSetup: scmGameSetup[0] });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

export const getallgamesetupdata = async (req, res) => {
    try {
        const scmGameSetup = await ScmGameSetup.findAll({ where: { tmplt_id: 1 } });
        return successResponse(req, res, { scmGameSetup });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get scmGameSetup by id
export const getScmGameSetupById = async (req, res) => {
    try {
        const scmGameSetup = await ScmGameSetup.sequelize.query(`
        SELECT scmgamesetups.scm_game_id, scmtmplts.tmplt_name, scmtmplts.tmplt_industry, scmgamesetups.game_status
        FROM scmgamesetups INNER JOIN scmtmplts ON scmgamesetups.tmplt_id = scmtmplts.tmplt_id where scmgamesetups.scm_game_id = ?;`, {
            replacements: [req.params.scm_game_id],
            type: Sequelize.QueryTypes.SELECT
        });
        return successResponse(req, res, { scmGameSetup: scmGameSetup[0] });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Delete scmGameSetup by id
export const deleteScmGameSetupById = async (req, res) => {
    try {
        const { scm_game_id } = req.params;
        const scmGameSetup = await ScmGameSetup.destroy({
            where: {
                scm_game_id: scm_game_id
            }
        });
        return successResponse(req, res, { scmGameSetup });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get active game 
export const getActiveGame = async (req, res) => {
    try {
        const scmGameSetup = await ScmGameSetup.sequelize.query(`select * from scmgamesetups where scmgamesetups.game_status = 1;`);
        return successResponse(req, res, { scmGameSetup: scmGameSetup[0] });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get completed game
export const getCompletedGame = async (req, res) => {
    try {
        const scmGameSetup = await ScmGameSetup.sequelize.query(`select * from scmgamesetups where scmgamesetups.game_status = 2;`);
        return successResponse(req, res, { scmGameSetup: scmGameSetup[0] });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

export const addNewGameMaster = async (req, res) => {
    try {
        const scmTmplt = await ScmTmplt.sequelize.query(`select scmtmplts.tmplt_id from scmtmplts where tmplt_name = ?`, {
            replacements: [req.body.tmplt_name],
            type: Sequelize.QueryTypes.SELECT
        });
        const scmGameSetup = await ScmGameSetup.create({
            tmplt_id: scmTmplt[0].tmplt_id,
            game_rounds: req.body.game_rounds,
            game_round_duration: req.body.game_round_duration,
            game_start_datetime: req.body.game_start_datetime,
        });
        return successResponse(req, res, { scmGameSetup });
        // if (req.file == undefined) {
        //     return errorResponse(req, res, 400, "Please upload a CSV file!");
        // }
        // let gamePlayer = [];
        // let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
        
        // fs.createReadStream(path)
        //     .pipe(csv.parse({ headers: true }))
        //     .on("error", (error) => {
        //         throw error.message;
        //     })
        //     .on("data", (row) => {
        //         gamePlayer.push(row);
        //     })
        //     .on("end", () => {
        //         GamePlayer.bulkCreate(gamePlayer)
        //             .then(() => {
        //                 return successResponse(req, res, 200, "Uploaded the file successfully!", { scmGameSetup });
        //             })
        //             .catch((error) => {
        //                 return errorResponse(req, res, 500, "Fail to import data into database!");
        //             });
        //     });
    // } catch (error) {
    //     return errorResponse(req, res, 500, "Could not upload the file!");
    // }
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}