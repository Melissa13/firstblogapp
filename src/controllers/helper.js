const db = require('../models');
const Op = db.Sequelize.Op;

function createEntry(req, res, database) {
  // Create and Save user in the database
  database
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'creation of the entry failed... what did you do wrong now?'
      });
    });
}

function findAllEntry(res, database, findparameter) {
  const where = findparameter ? { findparameter: { [Op.iLike]: `%${findparameter}%` } } : null;

  database
    .findAll({ where })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'the database is ignoring you.'
      });
    });
}

function findOneEntry(res, database, id) {
  database
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Are you sure that this Entry with id=${id} Exist?`,
        err
      });
    });
}

function updateEntry(req, res, database, id) {
  database
    .update(req.body, {
      where: { id }
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry data updated successfully. Now the FBI can't find it"
        });
      } else {
        res.send({
          message: `Cannot update Entry with id=${id}. Maybe the police already get them, RUN!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Entry with id=${id}`,
        err
      });
    });
}

function deleteEntry(res, database, id) {
  database
    .destroy({
      where: { id }
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'The entry was deleted successfully, now the FBI can`t associate it with this site!'
        });
      } else {
        res.send({
          message: `Cannot delete Entry with id=${id}. Maybe the entry was not found, maybe is already dead... who knows...`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Entry with id=${id}`,
        err
      });
    });
}

function deleteAllEntries(res, database) {
  database
    .destroy({
      where: {},
      truncate: false
    })
    .then((nums) => {
      res.send({
        message: `${nums} Entries were deleted successfully, it was time!`
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while removing all entries in that table... you just can`t go there killing people'
      });
    });
}

function searchByParam(res, database, searchParameter) {
  database
    .findAll({ where: searchParameter })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Entries.'
      });
    });
}

module.exports.createEntry = createEntry;
module.exports.findAllEntry = findAllEntry;
module.exports.findOneEntry = findOneEntry;
module.exports.updateEntry = updateEntry;
module.exports.deleteEntry = deleteEntry;
module.exports.deleteAllEntries = deleteAllEntries;
module.exports.searchByParam = searchByParam;
