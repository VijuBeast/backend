import { successResponse, errorResponse } from "../../helpers";
const skuDemand = require("../../models");
const SkuDemand = skuDemand.skudemand;
const fs = require("fs");
const csv = require("fast-csv");

export const uploadSkuDemand = async (req, res) => {
  try {
    if (req.file == undefined) {
      return errorResponse(req, res, 400, "Please upload a CSV file!");
    }

    let skudemand = [];
    let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        skudemand.push(row);
      })
      .on("end", () => {
        SkuDemand.bulkCreate(skudemand)
          .then(() => {
            return successResponse(req, res, 200, "Uploaded the file successfully!");
          })
          .catch((error) => {
            return errorResponse(req, res, 500, "Fail to import data into database!");
          });
      });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, 500, "Could not upload the file!");
  }
};

export const getSkuDemand = async (req, res) => {
  try {
    SkuDemand.findAll()
      .then((data) => {
        return successResponse(req, res, 200, data);
      })
      .catch((err) => {
        return errorResponse(req, res, 500, err);
      });
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, 500, err);
  }
}
