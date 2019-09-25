import React, { Component } from 'react';

import { Container, Field, Button } from './styles';

export default class Uploader extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Field>
          <span>Arraste ou clique aqui</span>
        </Field>
        <Button>Assinar</Button>
      </Container>
    );
  }
}
