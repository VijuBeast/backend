import { ScmSkuMaster } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
const Op = require('sequelize').Op;
require('dotenv');

// Add ScmSkuMaster
export const addScmSkuMaster = async (req, res) => {
    try {
        const {
            tmplt_id,
            sku_id,
            sku_category,
            sku_name,
            sku_unit,
            sku_scm_side,
            sku_purchase_price,
            sku_sale_price,
            sku_order_lead_time,
            sku_orderleadtime_unit,
            sku_reorder_level,
            sku_demand_history,
            sku_demand_dist_type,
            sku_payment_realize_time,
        } = req.body;
        const scmSkuMaster = await ScmSkuMaster.create({
            tmplt_id,
            sku_id,
            sku_category,
            sku_name,
            sku_unit,
            sku_scm_side,
            sku_purchase_price,
            sku_sale_price,
            sku_order_lead_time,
            sku_orderleadtime_unit,
            sku_reorder_level,
            sku_demand_history,
            sku_demand_dist_type,
            sku_payment_realize_time,
        });
        return successResponse(req, res, { scmSkuMaster })
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Edit ScmSkuMaster By ID
export const editScmSkuMaster = async (req, res) => {
    try {
        const { tmplt_id } = req.params;
        const {
            sku_id,
            sku_category,
            sku_name,
            sku_unit,
            sku_scm_side,
            sku_purchase_price,
            sku_sale_price,
            sku_order_lead_time,
            sku_orderleadtime_unit,
            sku_reorder_level,
            sku_demand_history,
            sku_demand_dist_type,
            sku_payment_realize_time
        } = req.body;
        const scmSkuMaster = await ScmSkuMaster.update({
            sku_id,
            sku_category,
            sku_name,
            sku_unit,
            sku_scm_side,
            sku_purchase_price,
            sku_sale_price,
            sku_order_lead_time,
            sku_orderleadtime_unit,
            sku_reorder_level,
            sku_demand_history,
            sku_demand_dist_type,
            sku_payment_realize_time
        }, {
            where: {
                tmplt_id: tmplt_id
            }
        });
        return successResponse(req, res, { scmSkuMaster })
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get ScmSkuMaster
export const getScmSkuMaster = async (req, res) => {
    try {
        const scmSkuMaster = await ScmSkuMaster.findAll();
        return successResponse(req, res, { scmSkuMaster })
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get ScmSkuMaster By ID
export const getScmSkuMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const scmSkuMaster = await ScmSkuMaster.findAll({
            where: { tmplt_id: id }
        });
        return successResponse(req, res, { scmSkuMaster })
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Delete SckSkuMaster By ID
export const deleteScmSkuMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const scmSkuMaster = await ScmSkuMaster.destroy({
            where: { tmplt_id: id }
        })
        return successResponse(req, res, { scmSkuMaster })
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

