import nextConnect from "next-connect";
import {nanoid} from 'nanoid'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/media/");
  },
  filename: function (_, file, cb) {
    const nameSegment = file.originalname.split('.')
    const fileNameHash = nanoid()
    cb(null, `${fileNameHash}.${nameSegment[1]}`);
  },
});

const upload = multer({ storage });

const route = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

route.use(upload.single("file"));
route.post((req, res) => {
    res.json({
        file: req.file.filename
    })
});

export const config = {
    api: {
      bodyParser: false,
    },
  };
export default route
