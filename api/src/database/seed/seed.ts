import { createConnection, Repository } from 'typeorm';

import { Car } from '../entities/car.entity';

const seed = async () => {
    const connection = await createConnection();
    const carRepository: Repository<Car> = connection.getRepository(Car);

    // Creating cars
    const astonMartin = carRepository.create();
    astonMartin.model = 'Aston Martin';
    astonMartin.class = 'A';
    astonMartin.price = 100;
    astonMartin.picture = 'https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202018/Cars/December/CR-Cars-InlineHero-American-2018-Chevrolet-Corvette-GS-12-18';
    astonMartin.isAvailable = true;

    await carRepository.save(astonMartin);


    const dodge = carRepository.create();
    dodge.model = 'Dodge Viper';
    dodge.class = 'A';
    dodge.price = 100;
    dodge.picture = 'https://charge.cars/preview.jpg?rnd=1574201666989';
    dodge.isAvailable = true;

    await carRepository.save(dodge);


    const bmw = carRepository.create();
    bmw.model = 'BMW';
    bmw.class = 'B';
    bmw.price = 80;
    bmw.picture = 'https://media.zigcdn.com/media/model/2019/Sep/bmw_x1_360x240.jpg';
    bmw.isAvailable = true;

    await carRepository.save(bmw);


    const mercedes = carRepository.create();
    mercedes.model = 'Mercedes';
    mercedes.class = 'B';
    mercedes.price = 80;
    mercedes.picture = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-mercedes-benz-cla-99leadgallery2-1546632355.jpg?crop=0.705xw:0.864xh;0.264xw,0.0916xh&resize=640:*';
    mercedes.isAvailable = true;

    await carRepository.save(mercedes);


    const audi = carRepository.create();
    audi.model = 'Audi';
    audi.class = 'C';
    audi.price = 70;
    audi.picture = 'https://upload.wikimedia.org/wikipedia/commons/3/31/2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg';
    audi.isAvailable = true;

    await carRepository.save(audi);


    const infinity = carRepository.create();
    infinity.model = 'Infinity';
    infinity.class = 'C';
    infinity.price = 70;
    infinity.picture = 'https://image.shutterstock.com/image-photo/hong-kong-china-april-13-260nw-648548638.jpg';
    infinity.isAvailable = true;

    await carRepository.save(infinity);


    const volkswagen = carRepository.create();
    volkswagen.model = 'Volkswagen';
    volkswagen.class = 'D';
    volkswagen.price = 60;
    volkswagen.picture = 'https://img.tipcars.com/fotky_velke/48107036_1/1568643196/E/volkswagen-touareg-4-2-v8-tdi-r-line.jpg';
    volkswagen.isAvailable = true;

    await carRepository.save(volkswagen);


    const opel = carRepository.create();
    opel.model = 'Opel';
    opel.class = 'D';
    opel.price = 60;
    opel.picture = 'https://st.mascus.com/imagetilewm/product/pkoleasing/opel-insignia-2-0-c,w0lgt6e17g1030500_1.jpg';
    opel.isAvailable = true;

    await carRepository.save(opel);


    const moskvich = carRepository.create();
    moskvich.model = 'Moskvich';
    moskvich.class = 'E';
    moskvich.price = 40;
    moskvich.picture = 'https://upload.wikimedia.org/wikipedia/commons/5/56/AZLK-407_%22Moskvich%22_in_Armenia.jpg';
    moskvich.isAvailable = true;

    await carRepository.save(moskvich);


    const lada = carRepository.create();
    lada.model = 'Lada';
    lada.class = 'E';
    lada.price = 40;
    lada.picture = 'https://i.dailymail.co.uk/i/pix/scaled/2012/04/17/article-2130942-12A29778000005DC-378_308x185.jpg';
    lada.isAvailable = true;

    await carRepository.save(lada);

    console.log(`Data seeded successfully`);
}

seed().catch(console.error);