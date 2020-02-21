import { CarClass } from '../../common/enums/car-class';

export class CarDTO {
    model: string;
    class: CarClass;
    price: number;
    picture: string;
}
