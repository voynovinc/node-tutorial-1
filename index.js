const fs = require("fs");
const http = require("http");
const url = require("url");

// Read our data file and parse it
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

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
    } else if (pathName === "/api") {
        // Send our json back
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
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
