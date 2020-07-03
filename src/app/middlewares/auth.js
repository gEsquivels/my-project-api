const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = require('../../config/auth');

module.exports = jwt({
  secret: 'IOmaJSAWSvZGgXM8VWsED8yD6HIEiHxB',
  audience: 'https://pfc-my-project-api.herokuapp.com/',
  issuer: 'https://dev-wvdui993.us.auth0.com/'
});
