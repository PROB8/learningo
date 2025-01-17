
require('dotenv').config();

const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
// const {JWT_SECRET} = require('../secret')
// const config = require('../config');
const {User} = require('../models');
const {DATABASE_URL,JWT_SECRET} = require('../config');


const basicStrategy = new BasicStrategy(
(username, password, done) => {
  let user;
  User
    .findOne({username})
    .then(_user => {
			console.log('Look _user',_user)
		user = _user;
		if (!user) {
			return Promise.reject({
			reason: 'LoginError',
			message: 'Incorrect username or password',
			});
		}
		return user.validatePassword(password);
    })
    .then(isValid => {
		if (!isValid) {
			return Promise.reject({
			reason: 'LoginError',
			message: 'Incorrect username or password',
			});
		}
		return done(null, user)
    })
    .catch(err => {
		if (err.reason === 'LoginError') {
			return done(null, false, err);
		}
		return done(err, false);
    });
});

const jwtStrategy = new JwtStrategy({
    secretOrKey:  JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user)
  }
);
module.exports = {basicStrategy, jwtStrategy};
