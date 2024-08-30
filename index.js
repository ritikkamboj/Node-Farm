//Blocking syanchronous approach
const fs = require("fs");
const http = require("http");
const url = require("url");
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// // gethering the data what we have t insert in the file

// const textOut = `We gets the info about the avacado : ${textIn}.\n. The file added on ${new Date()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('done writing in the file');

//lets see how non blocking asynchronous approach works :

// const readFile = fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=>{
//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt` , 'utf-8',(err, data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3)=>{
//             console.log(data3);
//             // now we have to write the data2 and data3 in final file
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', (err, _)=>{
//                 console.log('if any error ');

//             })
//         })
//     })

// })

// SERVER

//belowe is creating of the server

function replaceTemplate(temp, product) {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%ORGANIC%}/g, "not-organic");
  }

  return output;
}
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
  console.log(req.url, "ritik");
  if (req.url === "/" || req.url === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    console.log(cardHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);

    res.end(output);
  } else if (req.url === "/product") {
    res.end("this is the Product");
  } else if (req.url === "/url") {
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
