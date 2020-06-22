const url = 'http://localhost:3001';
const car = 'car';
const contract = 'contract';
const available = 'available';
const image = 'image';
const headers = { 'Content-Type': 'application/json' };

const fetchObject = (method, body) => ({
  method,
  headers,
  body: JSON.stringify(body),
});

const handleResponse = (res) => {
  if (!res.ok) {
    throw Error(`Failed with status: ${res.status}`);
  }

  return res.json();
};

const carService = {
  getAllCars() {
    return fetch(`${url}/${car}`)
      .then(handleResponse);
  },

  getAllFreeCars() {
    return fetch(`${url}/${car}/${available}`)
      .then(handleResponse);
  },

  getCarClasses() {
    return fetch(`${url}/${car}/classes`)
      .then(handleResponse);
  },

  getAllContracts() {
    return fetch(`${url}/${contract}`)
      .then(handleResponse);
  },

  closeContract(id) {
    return fetch(`${url}/${contract}/${id}`, { method: 'PUT', headers })
      .then(handleResponse);
  },

  getIndividulFreeCar(id) {
    return fetch(`${url}/${car}/${available}/${id}`)
      .then(handleResponse);
  },

  getIndividulCar(id) {
    return fetch(`${url}/${car}/${id}`)
      .then(handleResponse);
  },

  createContract(id, body) {
    return fetch(`${url}/${car}/${id}/${contract}`, fetchObject('POST', body))
      .then(handleResponse);
  },

  updateCar(id, body) {
    return fetch(`${url}/${car}/${id}`, fetchObject('PUT', body))
      .then(handleResponse);
  },

  updateCarImage(id, body) {
    return fetch(`${url}/${car}/${id}/${image}`, { method: 'PUT', body })
      .then(handleResponse);
  },

  uploadCarImage(body) {
    return fetch(`${url}/${car}/${image}`, { method: 'POST', body })
      .then(handleResponse);
  },

  createNewCar(body) {
    return fetch(`${url}/${car}`, fetchObject('POST', body))
      .then(handleResponse);
  },
};

export default carService;
