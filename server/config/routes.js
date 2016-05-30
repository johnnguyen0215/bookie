/**
 * Routes for express app
 */
var express = require('express');
var campuses = require('../controllers/campuses');
var users = require('../controllers/users');
var passport = require('passport');
var mongoose = require('mongoose');
var _ = require('lodash');
var path = require('path');



module.exports = function(app) {
  // user routes
  app.post('/api/login', users.postLogin);
  app.post('/api/signup', users.postSignUp);
  app.post('/api/logout', users.postLogout);

  app.get('/api/campus', function(req, res){
    campuses.get(req, res);
  });


  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', function(req, res,next){
    passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      state: req.query.campus})(req, res, next);
  });

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    })); 

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string


};
