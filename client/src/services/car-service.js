const carService = {
  getAllCars() {
    return fetch('http://localhost:3001/car')
      .then((x) => x.json());
  },
  getAllContracts() {
    return fetch('http://localhost:3001/contract')
      .then((x) => x.json());
  },
  closeContract(id) {
    return fetch(`http://localhost:3001/contract/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((x) => x.json());
  },
  getIndividulCar(id) {
    return fetch(`http://localhost:3001/car/${id}`)
      .then((x) => x.json());
  },
  createContract(id, body) {
    return fetch(`http://localhost:3001/car/${id}/contract`, {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((x) => x.json());
  },
};

export default carService;
