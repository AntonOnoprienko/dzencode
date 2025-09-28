'use client';

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RegisterForm } from '.';
import { X } from 'react-bootstrap-icons';
import '@/styles/components/register-modal.scss';

interface Props {
  show: boolean;
  onHide: () => void;
}

export const RegisterModal: React.FC<Props> = ({ show, onHide }) => {
  return (
    <Modal className="register-modal" show={show} onHide={onHide} centered>
      <button className="register-modal__close-button" onClick={onHide}>
        <X size={20} />
      </button>

      <Modal.Header>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <RegisterForm onClose={onHide} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
