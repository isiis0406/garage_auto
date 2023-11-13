import multer from "multer";

// Définir le stockage de fichier
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + '-' + file.originalname);
    }
})

// Spécifier le type de fichier à accepter
function fileFilter(req, file, cb) {

    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jgeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
        cb(new Error('Choisissez une image au format png, jpg ou jpeg'))

    }
}

//Fonction pour formater la taille du fichier
export const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
        parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
};

export const upload = multer({ storage })