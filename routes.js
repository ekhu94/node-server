const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>New Message</title></head>");
    res.write(
      '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && req.method === "POST") {
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
          return res.end();
        }
      });
    });
  }
  res.end("Welcome to my node server!");
};

module.exports = {
  handler: requestHandler,
};
