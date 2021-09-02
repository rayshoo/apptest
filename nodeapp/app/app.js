require('dotenv').config();
// require('./schemas')();
global.contextPath = process.env.CONTEXT_PATH;
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session');
const methodOverride = require('method-override');
const chalk = require('chalk');
const cache_config = require('./config/cache');
const os = require('os');
const networkInterfaces = os.networkInterfaces();

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
  methodOverride((req) => {
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

/* Logs */
let color = 0
// app.use((req, _, next)=> {
//   let headers = req.headers
//   color === 0
//   ? (()=>{ console.log(chalk.red('-----------------------')); color = 1; })()
//   : (()=>{ console.log(chalk.blue('-----------------------')); color = 0; })();
//   console.log(`scheme: ${req.protocol}`)
//   console.log(`method: ${req.method}`)
//   console.log(`path: ${req.url}\n`)
//   console.log(`headers:`)
//   for (i in headers){
//     console.log(`${i} : ${headers[i]}`)
//   }
//   next();
// });

/* Static resources */
app.use(express.static(path.join(__dirname, './public'), cache_config));

/* Router */
app.use('/admin', adminRouter);
app.use('/', indexRouter);

/* Server */
app.listen(port, ()=>{
  for (i in networkInterfaces) {
    for (j in networkInterfaces[i]) {
      if (networkInterfaces[i][j]['family'].toUpperCase() == 'IPV4') {
        console.log(`http://${networkInterfaces[i][j]['address']}:${port}${contextPath}`);
      };
    }
  }
});