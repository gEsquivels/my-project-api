const app = require('./app.js');

app.listen(process.env.PORT || 4000, (err) => {
  if (err) throw err
  console.info(`Server is runnig`);
});
