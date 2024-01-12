const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  puppeteer: {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  },
};
