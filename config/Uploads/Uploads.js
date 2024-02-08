const multer = require('multer')

const imageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Config/Uploads/Images')
    },
    filename: (req, file, callback) => {

        const allowedFileTypes = ['png', 'jpeg', 'jpg'];
        let extname = file.originalname.split('.');

        if (!allowedFileTypes.includes(extname[extname.length - 1])) {
            return callback(new Error('Invalid file type. Only .png, .jpeg, and .jpg files are allowed.'));
        }

        const dt = new Date();
        callback(null, `image-${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()}-${dt.getTime()}.${extname[extname.length - 1]}`);

    }
})

const imageFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true)
    }
    else {
        callback(null, false)
    }
}

const uploadImage = multer({
    storage: imageConfig,
    limits: { fileSize: '2048000' },
    fileFilter: imageFilter
}).single('image')

const resumeConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Config/Uploads/EmployeeResume')
    },
    filename: (req, file, callback) => {
        const dt = new Date();
        // const extname = file.originalname.split('.')
        callback(null, `Employee-Resume-${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()}-${dt.getTime()}.pdf`)
    }
})

const resumeFilter = (req, file, callback) => {

    if (file.mimetype === 'application/pdf') {
        callback(null, true)
    }
    else {
        callback(null, false)
    }
}

const uploadResume = multer({
    storage: resumeConfig,
    limits: {
        fileSize: 10240000
    },
    fileFilter: resumeFilter
}).single('resume')

module.exports = { uploadImage, uploadResume };