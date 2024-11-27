require("dotenv").config();

const Server = require("./src/models/server");

const server = new Server();

server.listen();

// Tokencito nada insano ocupado:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMyNjc1OTEzLCJleHAiOjE3Mzc4NTk5MTN9.J5gaVgiylre19P_HqCtefGbqW7oaI48lpSRXOS5ihHE