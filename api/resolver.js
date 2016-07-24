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
  var term = req.query.text.trim();
  var response;
  var results;

  if (term) {
    setContent(term, req, res);
  }
  else {
    response = createNewRequest(req, res);

    if (response && response.body && response.body[0] && response.body[0].content) {
      res.json({
        body: response.body[0].content
      });
    }
    else {
      res.json({
        body: "<br>"
      });
    }
  }
};

function setContent(term, req, res)
{
  res.json({
    body: term
  });
  return;
}

//This function is in place in case the user doesn't wait for a quote to appear. 
function createNewRequest(req, res)
{
  var response;
  try {
    response = sync.await(request({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }
  return response;
}
