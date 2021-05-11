const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: { '@': path.resolve(__dirname, 'src') },
  };

  return config;
};

const { alias, aliasJest, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);

// polyfill globalThis for older nodes
globalThis = global;
