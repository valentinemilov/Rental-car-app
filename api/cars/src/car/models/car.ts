import { CarClass } from '../../common/enums/car-class';

export class CarDTO {
    id: string;
    model: string;
    class: CarClass;
    price: number;
    picture: string;
}
