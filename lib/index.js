const requireIndex = require('requireindex');

const rootRules = requireIndex(__dirname + '/rules');
const rootConfigs = requireIndex(__dirname + '/configs');

module.exports = {
  'rules': rootRules,
  'configs': rootConfigs,
};
