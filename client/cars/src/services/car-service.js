const carService = {
  getAllCars() {
    return fetch('http://localhost:3001/car')
      .then((x) => x.json());
  },
  async getAllContracts() {
    return fetch('http://localhost:3001/contract')
      .then((x) => x.json());
  },
  closeContract(id) {
    return fetch(`http://localhost:3001/contract/${id}`, {
      method: 'PUT',
      body: { id },
    })
      .then((x) => x.json());
  },
};

export default carService;
