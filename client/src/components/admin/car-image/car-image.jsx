import React from 'react';
import Card from 'react-bootstrap/Card';

import defaultImg from '../../../../public/img-placeholder.png';
import url from '../../../config/imageUrl';
import { renameImg } from '../../../services/validate-form';
import './car-image.css';

const CarImage = ({ image, name }) => {
  if (name) {
    return (
      <Card className="admin-car-image">
        {image && <Card.Img variant="top" src={`${url}${image.name}`} />
          || <Card.Img variant="top" src={defaultImg} />}
      </Card>
    );
  }

  return (
    <Card className="admin-car-image">
      <Card.Img variant="top" src={`${renameImg(image.picture, url)}${image.picture}`} />
    </Card>
  );
};

export default CarImage;
