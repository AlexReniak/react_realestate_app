const { Storage } = require('@google-cloud/storage');
const path = require('path')

const storage = new Storage({
    keyFilename: path.join(__dirname, '../../spry-smithy-370718-c22cf1a7a60c.json'),
    projectId: 'spry-smithy-370718'
});

module.exports = storage;