import { ScmGameTrans } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
const Op = require('sequelize').Op;
require('dotenv');

// Add ScmGameTrans
export const addScmGameTrans = async (req, res) => {
    try {
        const {
            game_trans_id,
            scm_game_id,
            round_number,
            player_id,
            demand_skus,
            purchase_skus,
            bank_bal,
            date_time_stamp,
            status
        } = req.body;
        const scmGameTrans = await ScmGameTrans.create({
            game_trans_id,
            scm_game_id,
            round_number,
            player_id,
            demand_skus,
            purchase_skus,
            bank_bal,
            date_time_stamp,
            status
        });
        return successResponse(req, res, { scmGameTrans })
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

// Edit ScmGameTrans
export const editScmGameTrans = async (req, res) => {
    try {
        const { game_trans_id } = req.params;
        const {
            scm_game_id,
            round_number,
            player_id,
            demand_skus,
            purchase_skus,
            bank_bal,
            date_time_stamp,
            status
        } = req.body;
        const scmGameTrans = await ScmGameTrans.update({
            scm_game_id,
            round_number,
            player_id,
            demand_skus,
            purchase_skus,
            bank_bal,
            date_time_stamp,
            status
        }, {
            where: {
                game_trans_id: game_trans_id
            }
        });
        return successResponse(req, res, { scmGameTrans })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

// Get All scmGameTrans
export const getAllScmGameTrans = async (req, res) => {
    try {
        const scmGameTrans = await ScmGameTrans.findAll();
        return successResponse(req, res, { scmGameTrans })
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

// Get all the scmGameTrans with offset and limit query parameters 
export const getScmGameTransWithOffsetLimit = async (req, res) => {
    try {
        // const { offset, limit } = req.query;
        limit = req.query.limit 
        offset = req.query.offset
        const scmGameTrans = await ScmGameTrans.findAll({
            offset: offset,
            limit: limit,
        });
         return successResponse(req, res, { scmGameTrans})
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}


// Get ScmGameTrans By ID
export const getScmGameTransById = async (req, res) => {
    try {
        const { id } = req.params;
        const scmGameTrans = await ScmGameTrans.findOne({
            where: { game_trans_id: id }
        })
        return successResponse(req, res, {scmGameTrans})
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}

// Delete ScmGameTrans By ID
export const deleteScmGameTransById = async (req, res) => {
    try {
        const { id } = req.params;
        const scmGameTrans = await ScmGameTrans.destroy({
            where: { game_trans_id: id}
        })
        return successResponse(req, res, {scmGameTrans})
    } catch (error) {
        return errorResponse(req, res, error.message)
    }
}