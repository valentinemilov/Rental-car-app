const url = 'http://localhost:3001';
const car = 'car';
const contract = 'contract';

const carService = {
  getAllCars() {
    return fetch(`${url}/${car}`)
      .then((x) => x.json());
  },
  getAllFreeCars() {
    return fetch(`${url}/${car}/available`)
      .then((x) => x.json());
  },
  getAllContracts() {
    return fetch(`${url}/${contract}`)
      .then((x) => x.json());
  },
  closeContract(id) {
    return fetch(`${url}/${contract}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((x) => x.json());
  },
  getIndividulCar(id) {
    return fetch(`${url}/${car}/${id}`)
      .then((x) => x.json());
  },
  createContract(id, body) {
    return fetch(`${url}/${car}/${id}/${contract}`, {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((x) => x.json());
  },
};

export default carService;
