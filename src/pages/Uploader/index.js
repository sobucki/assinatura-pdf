import React, { Component } from 'react';

import SketckModal from '../../components/SketckModal';
import DropField from '../../components/DropField';
import Header from '../../components/Header';

import { Container } from './styles';

export default class Uploader extends Component {
  render() {
    return (
      <Container>
        <Header />
        <DropField />
        <SketckModal />
      </Container>
    );
  }
}
