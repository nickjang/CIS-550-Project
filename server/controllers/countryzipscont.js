const CZlogic = require('../db_apis/countryzipsapi.js');

async function getC(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await CZlogic.findC(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getZ(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await CZlogic.findZ(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.getZ = getZ;
module.exports.getC = getC;