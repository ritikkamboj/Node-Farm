//Blocking syanchronous approach
const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
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
const data =fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url, "ritik");
  if (req.url === "/" || req.url === "/overview") {
    res.end("OverView");
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
