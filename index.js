const fs = require("fs");
const http = require("http");
const url = require("url");

// Replace template variables with object properties
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    else output = output.replace(/{%NOT_ORGANIC%}/g, "");

    return output;
};

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
const dataObj = JSON.parse(data);

// Called when our server hits a request call
const server = http.createServer((req, res) => {
    // Log to see the current route
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {
            "Content-type": "text/html"
        });

        // Generat the cards html
        const cardsHtml = dataObj
            .map(el => replaceTemplate(tempCard, el))
            .join("");

        // Replace the cards template with cards html
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

        res.end(output);

        // Product page
    } else if (pathname === "/product") {
        res.writeHead(200, { "Content-type": "text/html" });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

        // API
    } else if (pathname === "/api") {
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
