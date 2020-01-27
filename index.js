const fs = require("fs");
const http = require("http");
const url = require("url");

// Called when our server hits a request call
const server = http.createServer((req, res) => {
    // Log to see the current route
    console.log(req.url);

    // Save the current route
    const pathName = req.url;

    // Decide what to do based on the route provided
    if (pathName === "/" || pathName === "/overview") {
        res.end("This is the overview");
    } else if (pathName === "/product") {
        res.end("This is the product");
    } else {
        // First set headers
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        });

        // Then send response
        res.end(`
            <h1>PAGE NOT FOUND</h1>
        `);
    }
});

// localhost
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on board 8000");
});
