const app = require('./app.js');
const config = require('./config/server');

app.listen(3000, (err) => {
  if (err) throw err
  console.info(`Server is runnig`);
});
