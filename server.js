import * as http from 'http';
import { getRequest } from './actions/get.js';
import { postRequest } from './actions/post.js';
import { putRequest } from './actions/put.js';
import { deleteRequest } from './actions/delete.js';

const PORT = process.env.PORT || 4000

//create our server object
const server = http.createServer()

// We define a function that runs in response to the request event
server.on("request", (request, response) => {
  // handle request based on method then URL
  switch (request.method) {
    case "GET":
      switch (request.url) {
        // response for unexpected get requests
        default:
          response.statusCode = 400
          response.write(`CANNOT GET ${request.url}`)
          response.end()
      }
      break

    case "POST":
      break

    case "PUT":
      break

    case "DELETE":
      break

    default:
      // Send response for requests with no other response
      response.statusCode = 400
      response.write("No Response")
      response.end()
  }
})

// get the server to start listening
server.listen(PORT, err => {
  // error checking
  err ? console.error(err) : console.log(`listening on port ${PORT}`)
})