function createBasicFunctionsFor(model) {
  function createEntry(req, res) {
    // Create and Save user in the model
    return model
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

  function findAllEntries(req, res) {
    return model
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'the model is ignoring you.'
        });
      });
  }

  function findOneEntry(req, res) {
    return model
      .findByPk(req.params.id)
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

  function updateEntry(req, res) {
    const { id } = req.params;

    return model
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

  function deleteEntry(req, res) {
    const { id } = req.params;

    return model
      .destroy({
        where: { id }
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message:
              'The entry was deleted successfully, now the FBI can`t associate it with this site!'
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
  return { createEntry, findAllEntries, findOneEntry, updateEntry, deleteEntry };
}

module.exports.createBasicFunctionsFor = createBasicFunctionsFor;
