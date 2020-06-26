import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const configObject = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 4000,
  hideProgressBar: true,
  transition: Slide,
};

const toastSuccess = (msg = 'Successfull operation') => {
  toast.success(msg, configObject);
};

const toastError = (msg = 'Something went wrong') => {
  toast.error(msg, configObject);
};

export {
  toastSuccess,
  toastError,
};
