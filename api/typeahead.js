var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

function isJSONObject(object) {
  try {
    JSON.stringify(object);
  } catch (ex) {
    return false;
  }
}

module.exports = function(req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var results = _.chain(response)
    .reject(function(obj) {
      return !obj || !obj[0] || !obj[0].content;
    })
    .map(function(obj) {
      return {
        title: obj[0].content, 
        text: obj[0].content,
      };
    });

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};
