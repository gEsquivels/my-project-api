const app = require('./app.js');
const config = require('./config/server');

app.listen(config.PORT, (err) => {
  if (err) throw err
  console.info(`Server is runnig in ${config.host}:${config.PORT}`);
});
