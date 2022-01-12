import {ScmTmplt, ScmTmpltGnw} from '../../models';
import { successResponse, errorResponse } from '../../helpers';
const Op = require('sequelize').Op;
require('dotenv');

const skuDemand = require("../../models");
const gamePlayer = require("../../models");
const SkuDemand = skuDemand.skudemand;
const GamePlayer = gamePlayer.gameplayer;
const fs = require("fs");
const csv = require("fast-csv");

export const addNewTemplate = async (req, res) => {
    const messages = [];
    const messages1 = [];
    try {
        const {tmplt_name, tmplt_objective} = req.body
        const tmplt = await ScmTmplt.create({ tmplt_name, tmplt_objective });
        messages.push(tmplt);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
    try {
        const {gnw_element_level} = req.body;
        const tmpltGnw = await ScmTmpltGnw.create({ gnw_element_level });
        messages.push(tmpltGnw);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
	for (const file of req.files) {
        try {
            // Parsing CSV Files to data array objects
            const csvParserStream = fs.createReadStream(__basedir + "/resources/static/assets/uploads/" + file.filename)
            .pipe(csv.parse({ headers: true }));
            // First file
            var end = new Promise(function(resolve, reject) {
                let skudemand = [];
                let gameplayer = [];	
                // let gameplayer = [];
                csvParserStream.on('data', object => {
                    skudemand.push(object);
                    gameplayer.push(object);
                    console.log(object);
                });
                // csvParserStream.on('data', object => {
                //     gameplayer.push(object);
                //     console.log(object);
                // });
                csvParserStream.on('end', () => {
                    resolve(skudemand);
                    resolve(gameplayer);
                });
                // csvParserStream.on('end', () => {
                //     resolve(gameplayer);
                // });
                csvParserStream.on('error', error => {
                    console.error(error);
                    reject
                }); 
            });
            // Async for first file
            await (async function() {
                let skudemand = await end;
                let gameplayer = await end;
                // let gameplayer = await end;
                await SkuDemand.bulkCreate(skudemand).then(() => {
                    const result = {
                        status: "ok",
                        filename: file.originalname,
                        message: "Upload Successfully!",
                    }
                    messages.push(result);
                }); 
                await GamePlayer.bulkCreate(gameplayer).then(() => {
                    const result = {
                        status: "ok",
                        filename: file.originalname,
                        message: "Upload Successfully!",
                    }
                    messages1.push(result);
                });
            }());
            // Async for second file
            // await (async function() {
            //     let gameplayer = await end1;
            //     // save GamePlayer to MySQL/PostgreSQL database
            //     await GamePlayer.bulkCreate(gameplayer).then(() => {
            //         const result = {
            //             status: "ok",
            //             filename: file.originalname,
            //             message: "Upload Successfully!",
            //         }
            //         messages.push(result);
            //     }); 
            // }());
        }
        catch(error){
            console.log(error);
            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }
            messages.push(result);
        }
	}
	return res.json(messages);
}



// Add Template
export const addTemplate = async (req, res) => {
    try {
        const { 
            tmplt_id,
            tmplt_name,
            tmplt_company_name,
            tmplt_industry,
            tmplt_desc,
            tmplt_objective,
            tmplt_function,
            tmplt_remarks,
        } = req.body;
        const scmTmplt = await ScmTmplt.create({ 
            tmplt_id,
            tmplt_name,
            tmplt_company_name,
            tmplt_industry,
            tmplt_desc,
            tmplt_objective,
            tmplt_function,
            tmplt_remarks,
        });
        return successResponse(req, res, {scmTmplt});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};

// Edit The Template
export const editTemplate = async (req, res) => {
    try {
        const {tmplt_id} = req.params;
        const { 
            tmplt_name,
            tmplt_company_name,
            tmplt_industry,
            tmplt_desc,
            tmplt_objective,
            tmplt_function,
            tmplt_remarks,
        } = req.body;
        const scmTmplt = await ScmTmplt.update({ 
            tmplt_name,
            tmplt_company_name,
            tmplt_industry,
            tmplt_desc,
            tmplt_objective,
            tmplt_function,
            tmplt_remarks,
        }, {
            where: {
                tmplt_id: tmplt_id
            }
        });
        return successResponse(req, res, {scmTmplt});
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get All The Templates
export const getTemplate = async (req, res) => {
    try {
        const scmTmplt = await ScmTmplt.findAll();
        return successResponse(req, res, { scmTmplt });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Get The Template By Id
export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const scmTmplt = await ScmTmplt.findAll({
            where: {
                tmplt_id: id
            }
        });
        return successResponse(req, res, { scmTmplt });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// Delete Template By ID
export const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const scmTmplt = await ScmTmplt.destroy({
            where: {
                tmplt_id: id
            }
        });
        return successResponse(req, res, { scmTmplt });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}


// export const uploadSkuDemand = async (req, res) => {
//     try {
//       if (req.file == undefined) {
//         return errorResponse(req, res, 400, "Please upload a CSV file!");
//       }
  
//       let skudemand = [];
//       let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
  
//       fs.createReadStream(path)
//         .pipe(csv.parse({ headers: true }))
//         .on("error", (error) => {
//           throw error.message;
//         })
//         .on("data", (row) => {
//           skudemand.push(row);
//         })
//         .on("end", () => {
//           SkuDemand.bulkCreate(skudemand)
//             .then(() => {
//               return successResponse(req, res, 200, "Uploaded the file successfully!");
//             })
//             .catch((error) => {
//               return errorResponse(req, res, 500, "Fail to import data into database!");
//             });
//         });
//     } catch (error) {
//       console.log(error);
//       return errorResponse(req, res, 500, "Could not upload the file!");
//     }
//   };