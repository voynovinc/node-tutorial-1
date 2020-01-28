const fs = require("fs");
const http = require("http");
const url = require("url");

// Read our templates
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

// Read our app data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

// Called when our server hits a request call
const server = http.createServer((req, res) => {
    // Log to see the current route
    console.log(req.url);

    // Save the current route
    const pathName = req.url;

    // Overview page
    if (pathName === "/" || pathName === "/overview") {
        res.end("This is the overview");

        // Product page
    } else if (pathName === "/product") {
        res.end("This is the product");

        // API
    } else if (pathName === "/api") {
        // Send our json back
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);

        // Not found
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

// Creates a server and listens on localhost
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on board 8000");
});
