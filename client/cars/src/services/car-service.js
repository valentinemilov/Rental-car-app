const carService = {
  getAllCars() {
    return fetch('http://localhost:3001/car')
      .then((x) => x.json());
  },
};

export default carService;
