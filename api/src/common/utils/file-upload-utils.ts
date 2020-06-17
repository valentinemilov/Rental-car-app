/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { extname } from 'path';
import { diskStorage } from 'multer';

import { randomStringGenerator } from './uuid-generator.utils';
import { ApplicationError } from '../exceptions/app.error';

const imageErrorMsg = 'Only image files are allowed';

const editFileName = (req, file, callback): string => {
  const randomName: string = randomStringGenerator();
  const fileExtension: string = extname(file.originalname);

  return callback(null, `${randomName}${fileExtension}`);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new ApplicationError(imageErrorMsg, 404), false);
  }

  callback(null, true);
};

const multerObject = {
  storage: diskStorage({
    destination: './pictures',
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
  limits: { fileSize: 10000000 },
};

export default multerObject;
