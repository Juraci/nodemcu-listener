export default (req, res, next) => {
  res.sseSetup = () => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
  };

  res.sseSend = (id, data) => {
    res.write(`id: ${id}\n`);
    res.write(`data: ${data}\n\n`);
  };

  next();
};
