const storage = require('../config/storage');
const stream = require('stream');
const bucket = storage.bucket('bucket_rre_images_storage123');

const uploadImg = (image) => new Promise((resolve, reject) => {
        const { originalname, buffer, } = image

        const file = bucket.file(originalname);

          const passthroughStream = new stream.PassThrough();
          passthroughStream.write(buffer);
          passthroughStream.end()

          passthroughStream.pipe(file.createWriteStream({
            resumable: false
          }))
          .on('error', (error) => {
            reject(error);
          })
          .on('finish', () => {
            resolve(`https://storage.googleapis.com/${bucket.name}/${originalname}.jpg`)
          })
})

module.exports = uploadImg;