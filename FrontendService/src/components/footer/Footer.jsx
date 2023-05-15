import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark py-3">
      <Container>
        <p className="text-center text-light mb-0">
          Вопросы по проекту: <a href="https://www.google.com" className="text-light">stud0000262954@study.utmn.ru</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;