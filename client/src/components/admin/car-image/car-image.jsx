import React from 'react';
import Card from 'react-bootstrap/Card';

import defaultImg from '../../../../public/img-placeholder.png';
import url from '../../../config/imageUrl';

import './car-image.css';

const CarImage = ({ image }) => {

  return (
    <Card className="admin-car-image">
      {image && <Card.Img variant="top" src={`${url}${image.name}`} />
      || <Card.Img variant="top" src={defaultImg} />}
    </Card>
  );
};

export default CarImage;
