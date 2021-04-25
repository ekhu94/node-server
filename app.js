const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>New Message</title></head>");
    res.write(
      '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("./message.txt", message, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(302, {
            Location: "/",
          });
        }
      });
    });
  }
  res.end("Welcome to my node server!");
});

server.listen(3000, "localhost");
