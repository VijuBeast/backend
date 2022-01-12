import {ScmTmpltGnw} from '../../models';
import { successResponse, errorResponse } from '../../helpers';
const Op = require('sequelize').Op;
require('dotenv');

// Add Template Master
export const addTemplateGnw = async (req, res ) => {
    try {
        const {
            tmplt_id,
            gnw_element_id,
            gnw_element_category,
            gnw_element_name,
            gnw_element_level,
            gnw_element_location,
            gnw_element_owner_name,
            gnw_element_scm_side,
            gnw_element_mathsym,
            gnw_element_cost_unit,
            gnw_element_cost,
            gnw_element_links
        } = req.body;
        const scmTmpltGnw = await ScmTmpltGnw.create({
            tmplt_id,
            gnw_element_id,
            gnw_element_category,
            gnw_element_name,
            gnw_element_level,
            gnw_element_location,
            gnw_element_owner_name,
            gnw_element_scm_side,
            gnw_element_mathsym,
            gnw_element_cost_unit,
            gnw_element_cost,
            gnw_element_links
        });
        return successResponse(req, res, {scmTmpltGnw});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Edit Template Network By ID
export const editTemplateGnw = async (req, res) => {
    try {
        const {tmplt_id} = req.params;  
        const {
            gnw_element_id,
            gnw_element_category,
            gnw_element_name,
            gnw_element_level,
            gnw_element_location,
            gnw_element_owner_name,
            gnw_element_scm_side,
            gnw_element_mathsym,
            gnw_element_cost_unit,
            gnw_element_cost,
            gnw_element_links
        } = req.body;
        const scmTmpltGnw = await ScmTmpltGnw.update({
            gnw_element_id,
            gnw_element_category,
            gnw_element_name,
            gnw_element_level,
            gnw_element_location,
            gnw_element_owner_name,
            gnw_element_scm_side,
            gnw_element_mathsym,
            gnw_element_cost_unit,
            gnw_element_cost,
            gnw_element_links
        }, {
            where: {
                tmplt_id: tmplt_id
            }
        });
        return successResponse(req, res, {scmTmpltGnw});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get All Tempalte Network
export const getTemplateGnw = async (req, res) => {
    try {
        const scmTmpltGnw = await ScmTmpltGnw.findAll();	
        return successResponse(req, res, {scmTmpltGnw});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get Template Network By Id
export const getTemplateGnwById = async (req, res) => {
    try {
        const { id } = req.params;
        const scmTmpltGnw = await ScmTmpltGnw.findAll({
            where: {
                tmplt_id: id
            }
        });
        return successResponse(req, res, {scmTmpltGnw});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Delete Template Network By Id
export const deleteTemplateGnwById = async (req, res) => {
    try {
        const { id } = req.params;
        const scmTmpltGnw = await ScmTmpltGnw.destroy({
            where: {
                tmplt_id: id
            }
        });
        return successResponse(req, res, {scmTmpltGnw});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}
