import { createServer } from 'node:http';
import fs from 'node:fs';


const index_html = fs.readFileSync("./index.html");
const favicon_ico = fs.readFileSync("./favicon.ico");
const server = createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(index_html);
    }
    else if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/vnd.microsoft.icon' });
        res.end(favicon_ico);
    }
});

const port = 8000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});