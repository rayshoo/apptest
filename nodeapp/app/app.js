require('dotenv').config();
// require('./schemas')();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session');
const methodOverride = require('method-override');
// const fs = require('fs');
// const etag = require('etag')
// const stream = require('stream');
// const dateFormat = require('dateformat');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

/* Setting */
app.set('view engine', 'html');

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(
  session({
    secret: 'made by devops chan',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(methodOverride('X-HTTP-Method')); //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override')); //      IBM
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

/* CORS */
// app.use((_, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', ['*']);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

/* Cache-Control */
// app.use((req,res,next)=> {
//   res.setHeader('Cache-Control', 'public, max-age=5')
// });

/* Logs */
app.use((req,res,next)=> {
  let headers = req.headers
  console.log(`-----------------------`)
  console.log(`scheme: ${req.protocol}`)
  console.log(`method: ${req.method}`)
  console.log(`path: ${req.url}\n`)
  console.log(`headers:`)
  for (i in headers){
    console.log(`${i} : ${headers[i]}`)
  }
  next();
});

/* Static resources */
app.use(express.static(path.join(__dirname, './public'), { maxAge: 3000 }));

/* Router */
// app.use('/', (req,res,next)=> {
//   let filePath = path.join(__dirname, `public/${req.url}`);
//   fs.stat(filePath, (err, stats) => {
//     if(err) { next(); return; }
//     let r = fs.createReadStream(filePath);
//     let ps = new stream.PassThrough();
//     stream.pipeline(
//       r, ps,
//       (err) => {
//         if (err) {
//           if(err.errno !== -21) {
//             res.status(400);
//             console.log(err.errno)
//           }
//           next();
//         }
//       }
//     )
//     let date = `${dateFormat(stats.mtime, "ddd, dd mmm yyyy HH:MM:ss")} GMT`;
//     res.status(200);
//     res.append('Last-Modified', date);
//     res.setHeader('ETag', 'W/' + etag(`${req.url}, ${date}`))
//     ps.pipe(res);
//   });
// });
app.use('/admin', adminRouter);
app.use('/', indexRouter);
  
/* Server */
app.listen(port, ()=>{
  console.log(`http://127.0.0.1:${port}`);
});
