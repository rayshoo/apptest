const express = require('express');
const router = express.Router();
const wol = require('node-wol');
// const PCS = require('../schemas/pcs');

router.get('/', async (req,res,next)=> {
  // const pcs = await PCS.find().sort({ name: 1 });
  let pcs = [
    {
    "name" : "홍길동",
    "mac": "11:11:11:11:11:11",
    "port": 9
    }
  ]

  if (req.session.user) {
    res.render('index', { pcs, session: req.session.user });
  } else {
    res.render('index', { pcs });
  }
});

router.post('/power', (req,_)=>{
  const { mac, port } = req.body;

  wol.wake(mac, function(err, res){
    console.log(res);
  });
  
  wol.wake('00:4e:01:c6:48:0f', {
    address: '192.168.127.255',
    port
  }, error => {
    if(error) {
      console.log(error);
      return;
    }
  });
});

router.post('/add', async(req,res,next)=>{
  if (!req.session.user) { res.sendStatus(401); return; }

  const { name, mac, port } = req.body;
  console.log(`name: ${name}, mac: ${mac}, port: ${port}`)

  try {
    const result = await pc.save();
    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
    console.error(err);
    next(err);
  }
});

router.delete('/remove', async(req,res,next)=>{
  if (!req.session.user) { res.sendStatus(401); return; }

  const { name, mac, port } = req.body;
  console.log(`name: ${name}, mac: ${mac}, port: ${port}`)
  try {
    // const result = await PCS.remove({name, mac, port});
    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
    console.error(err);
    next(err);
  }
});

module.exports = router;
