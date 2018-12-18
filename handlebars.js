const Path = require('path');
const fs = require('fs');
// Import Handlebars runtime lib
const Handlebars = require('handlebars/runtime');

const register = require('handlebars-layouts').register;
// const { registerHandlebarHelpers } = require('../../some/other/place');

// Register extra helpers
register(Handlebars);
// registerHandlebarHelpers(Handlebars);


/**
 * Handlebars runtime with custom helpers.
 * Used by handlebars-loader.
 */
module.exports = Handlebars;