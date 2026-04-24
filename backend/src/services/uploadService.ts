import fs from 'fs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(process.cwd(), 'uploads');

    // ✅ Se a pasta não existir, cria antes de salvar o arquivo
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    if (
      !allowedExtensions.includes(path.extname(file.originalname).toLowerCase())
    ) {
      return cb(new Error('Apenas arquivos de imagem são permitidos!'));
    }
    cb(null, true);
  },
});

export default upload;
