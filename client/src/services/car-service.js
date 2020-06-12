const url = 'http://localhost:3001';
const car = 'car';
const contract = 'contract';
const available = 'available';
const headers = { 'Content-Type': 'application/json' };

const carService = {
  getAllCars() {
    return fetch(`${url}/${car}`)
      .then((x) => x.json());
  },

  getAllFreeCars() {
    return fetch(`${url}/${car}/${available}`)
      .then((x) => x.json());
  },

  getCarClasses() {
    return fetch(`${url}/${car}/classes`)
      .then((x) => x.json());
  },

  getAllContracts() {
    return fetch(`${url}/${contract}`)
      .then((x) => x.json());
  },

  closeContract(id) {
    return fetch(`${url}/${contract}/${id}`, {
      method: 'PUT',
      headers,
    })
      .then((x) => x.json());
  },

  getIndividulFreeCar(id) {
    return fetch(`${url}/${car}/${available}/${id}`)
      .then((x) => x.json());
  },

  getIndividulCar(id) {
    return fetch(`${url}/${car}/${id}`)
      .then((x) => x.json());
  },

  createContract(id, body) {
    return fetch(`${url}/${car}/${id}/${contract}`, {
      method: 'Post',
      headers,
      body: JSON.stringify(body),
    })
      .then((x) => x.json());
  },

  updateCar(id, body) {
    return fetch(`${url}/${car}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
      .then((x) => x.json);
  },

  uploadCarImage(id, body) {
    return fetch(`${url}/${car}/${id}/image`, {
      method: 'PUT',
      body,
    })
      .then((x) => x.json);
  },
};

export default carService;
