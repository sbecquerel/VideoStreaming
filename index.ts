import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';
import * as path from 'path';

http.createServer((req: http.ServerRequest, res: http.ServerResponse) => {
  const file = path.resolve(__dirname, 'videos/intro.mp4');

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        return res.end();
      }
      return res.end(err);
    }

    const range = req.headers.range;
    if (!range) {
      res.statusCode = 416;
      return res.end();
    }
    if (typeof range === 'string') {
      const positions = range.replace(/bytes=/, "").split("-");
      const start = parseInt(positions[0], 10);
      const total = stats.size;
      const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      const chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });
      const stream: fs.ReadStream = fs.createReadStream(file, { start: start, end: end })
        .on("open", () => {
          stream.pipe(res)
        })
        .on("error", err => res.end(err));
    } else {
      res.end();
    }
  })
}).listen(8080);