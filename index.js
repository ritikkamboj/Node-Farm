//Blocking syanchronous approach
const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate.js");

console.log(slugify("RITIK KAMBOJ", { lower: true }));

// SERVER

//belowe is creating of the server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// console.log(data);

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

// console.log(tempOverview);

const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
  // console.log(req.url, "ritik");
  // console.log(url.parse(req.url,true));
  const upperData = dataObj.map((el) =>
    slugify(el.productName, { upper: true })
  );
  console.log(upperData);

  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);

    res.end(output);
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    res.writeHead(200, { "content-type": "text/html" });
    // console.log(query);
    const x = replaceTemplate(tempProduct, product);

    res.end(x);
  } else if (pathname === "/url") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    res.writeHead(200, { "content-type": "application.json" });
    res.end(data);
    //   console.log(productData);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end(`<h1> Page not found</h1>`);
  }
});

// now we see the how to start the server
server.listen(8000, "127.0.0.1", () => {
  console.log("jai maatad di");
});
