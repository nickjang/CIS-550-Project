const Rlogic = require('../db_apis/restaurantsapi.js');

// async function get(req, res, next) {
//   try {
//     const context = {};

//     context.state = req.params.state;

//     const rows = await Rlogic.find(context);

//     res.status(200).json(rows);
//   } catch (err) {
//     next(err);
//   }
// }

async function get(req, res, next) {
  try {
    const context = {};

    context.city = req.params.city;
    context.state = req.params.state;
    context.zip = req.params.zip;

    const rows = await Rlogic.find(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getbestR(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.findbestR(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getbestcrim(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.findbestcrim(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getbestpoll(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.findbestpoll(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getworstR(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.findworstR(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getworstcrim(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.findworstcrim(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

async function getworstpoll(req, res, next) {
  try {
    const context = {};

    context.state = req.params.state;

    const rows = await Rlogic.findworstpoll(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
module.exports.getbestR = getbestR;
module.exports.getbestcrim = getbestcrim;
module.exports.getbestpoll = getbestpoll;
module.exports.getworstR = getworstR;
module.exports.getworstcrim = getworstcrim;
module.exports.getworstpoll = getworstpoll;