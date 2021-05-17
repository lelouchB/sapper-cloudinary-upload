require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  let secureUrls;

  cloudinary.api.resources(
    { type: "upload", prefix: "firex" },
    function (error, result) {
      secureUrls = JSON.stringify(
        result.resources.map((pic) => {
          return { secureUrl: pic.secure_url };
        })
      );

      res.end(secureUrls);
    }
  );
}

export function post(req, res) {
  const image = req.body.imageDataUrl;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  cloudinary.uploader.upload(image).then((response) => {
    res.end(JSON.stringify({ imageUrl: response.secure_url }));
  });
}
