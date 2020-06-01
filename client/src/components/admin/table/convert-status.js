const convertCarStatus = (bool = true) => {
  if (bool) {
    return 'Available';
  }

  return 'Borrowed';
};

export default convertCarStatus;
