import multer from "multer";

const storageImg = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/profile-img')
    },
    filename:  (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const subirImg=multer({storage: storageImg})

export default subirImg;
