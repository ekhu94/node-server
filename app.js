const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>New Message</title></head>");
    res.write(
      '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  res.end("Welcome to my node server!");
});

server.listen(3000, "localhost");
