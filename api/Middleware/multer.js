// import multer from "multer";

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB
//     files: 4
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

// export const processFileUpload = upload.array('images', 4);




import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 4
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});


const documentUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 4
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const residencedocs=multer({
  storage,
  limits:{
    fileSize:10*1024*1024,
    files:4
  },
  fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
      cb(null,true)
    }else{
cb(new Error("only image file are allowed!"),false)
    }
  }
})

export const processresidencedocs = residencedocs.array('residencedocument', 4)

export const processFileUpload = upload.array('images', 4);

export const processDocumentUpload = documentUpload.array('document', 4);
