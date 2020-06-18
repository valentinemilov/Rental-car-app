import { toastSuccess, toastError } from '../../../services/toastify';

const imageFileFilter = (file) => {
  if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    return toastError('Only images can be uploaded');
  }

  if (file.size > 10000000) {
    return toastError('Image size must be below 10 MB');
  }

  return true;
};

export {
  imageFileFilter,
};
