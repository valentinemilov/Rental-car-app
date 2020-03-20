const validateForm = (errors) => {
  let isValid = true;
  Object.values(errors)
    .forEach(
      (x) => {
        if (x.length > 0) {
          isValid = false;
        }
      },
    );

  return isValid;
};

export default validateForm;
