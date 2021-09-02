const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/login', (req,res,next)=> {
  if (req.session.user) res.redirect(`${contextPath}/`)
  else res.render('admin/login', { contextPath });
});

router.post('/login', (req, res, next) => {
  if (req.session.user) {
    res.redirect(`${contextPath}/`);
    return;
  }

  const { id, password } = req.body;
  if (id == process.env.ID && password == process.env.PASSWORD) {
    req.session.user = {
      id,
      password,
    };
    res.redirect(`${contextPath}/`);
  } else {
    res.render('error', { contextPath, message : '아이디와 로그인을 확인하세요' });
  }
});

router.get('/logout', (req,res, _)=> {
  req.session.destroy();
  res.redirect(`${contextPath}/`);
});

module.exports = router;
