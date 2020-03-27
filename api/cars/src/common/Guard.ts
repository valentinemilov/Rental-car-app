import { CarError } from "./exceptions/car.error"

const should = (rule, message = "Invalid input") => {
  if(!rule) {
    throw new CarError(message, 400);
  }
}

const exists = (object, message = "Invalid input") => {
  if(!object) {
    throw new CarError(message, 404);
  }
}


export default {
  should,
  exists
}