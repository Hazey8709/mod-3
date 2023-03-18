const http = require("http");
require("dotenv").config();
const app = require("./app/app");

http.createServer(app).listen(process.env.port || 3000, () =>
    console.log(`Server up on PORT: ${process.env.port}`)
);
