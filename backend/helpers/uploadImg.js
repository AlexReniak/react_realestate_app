const storage = require('../config/storage');
const stream = require('stream');
const bucket = storage.bucket('bucket_rre_images_storage123');
const { v4: uuidv4 } = require('uuid');

const uploadImg = (image) => new Promise((resolve, reject) => {
        const { originalname, buffer, } = image
        const imageId = uuidv4();
        
        const uniqueName = `${originalname.replace(/\.(jpe?g|png)$/i, '')}${imageId}.jpg`

        const file = bucket.file(uniqueName);

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
          resolve(`https://storage.googleapis.com/${bucket.name}/${uniqueName}`)
        })

})

module.exports = uploadImg;