const express = require('express');
const axios = require("axios");
const cors = require('cors');

// Create Express Server
const app = express();
app.use(cors());

// Configuration
const PORT = 4000;
const HOST = "localhost";

const forwardRequest = () => async(req) => {
    const options = {
      url: req.url,
      method: req.method.toLowerCase(),
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.token,
      },
    };
    return await axios(options);
  };
app.get('/images', (req, res) => {
    req.url = "https://api.pexels.com/v1/search?query=computers&per_page=30";
    req.token = "563492ad6f9170000100000166a204d30cdd490688aafeca464698c4";
    req.method = "get";
    forwardRequest()(req).then((response) => {
        return res.send({code:200,data:response.data});
      })
      .catch((err) => {
        return res.status(error.status).send(error.data);
    })
 });
// Start the Proxy
app.listen(PORT, HOST, () => {
   console.log(`Starting Proxy at ${HOST}:${PORT}`);
});