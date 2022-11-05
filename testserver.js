const { app } = require('./testapp');

// const port = process.env.NODE_PORT || 3000;
const server = app.listen(0, () => { });

module.exports = server;
