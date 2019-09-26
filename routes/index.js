const express = require('express');
const DashboardRouter = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
DashboardRouter.get('/', forwardAuthenticated, (req, res) => res.render('register'));

// Dashboard
DashboardRouter.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('index', {
    user: req.user
  })
);

module.exports = DashboardRouter;