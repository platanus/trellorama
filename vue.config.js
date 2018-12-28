/* global module, process */

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/trello-stats/' :
    '/',
};
