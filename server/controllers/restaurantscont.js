const Rlogic = require('../db_apis/restaurantsapi.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.find(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;