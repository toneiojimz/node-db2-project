  
const server = require('./api/server.js');

const port = process.env.PORT || 5858;

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})