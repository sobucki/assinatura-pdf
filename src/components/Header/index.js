import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { Container } from './styles';

const Header = () => (
  <Container>
    <FontAwesomeIcon icon={faPenNib} size="lg" />
    <span>Assinador de PDF</span>
  </Container>
);

export default Header;
