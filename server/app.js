const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// Config
const { routes } = require('./config.json');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());

for (route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
      pathRewrite: (path, req) => {
        return '?id=' + req.query.id; // Could use replace, but take care of the leading '/'
      }
    })
  );
}

app.listen(3000, () => {
  console.log('Proxy listening on port 3000');
});
