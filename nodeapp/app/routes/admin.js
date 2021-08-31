const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/login', (req,res,next)=> {
  if (req.session.user) res.redirect('/')
  else res.render('admin/login');
});

router.post('/login', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
    return;
  }

  const { id, password } = req.body;
  if (id == process.env.ID && password == process.env.PASSWORD) {
    req.session.user = {
      id,
      password,
    };
    res.redirect('/');
  } else {
    res.render('error', { message : '아이디와 로그인을 확인하세요' });
  }
});

router.get('/logout', (req,res,next)=> {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
