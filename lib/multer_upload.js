const multer = require('multer');

const path = require('path')

const uuidv4 = require('uuid')
const multer_upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(process.env.UPLOAD_FOLDER));
        },
        filename: (req, file, cb) => {
            const unique_name = uuidv4() + '-' + Date.now();
            let extArray = file.mimetype.split('/');
            let extension = extArray[extArray.length - 1];
            cb(null, unique_name + '.' + extension);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
            return cb(new Error('Only images allowed'));
        }

        cb(null, true);
    },
});

module.exports= multer_upload;