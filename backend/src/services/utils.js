function getModelName(filepath) {
  return filepath.split('/').pop().split('.')[0];
}

module.exports.getModelName = getModelName;
