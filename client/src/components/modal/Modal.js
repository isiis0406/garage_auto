import React from 'react';
import styled from 'styled-components';

function Modal({ isOpen, onClose, onNext, title, children, setViewItems }) {
  if (!isOpen) return null;

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setViewItems(true);
    onClose();
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ButtonGroup>
            <CloseButton onClick={(e) => {
              handleCloseModal(e);
            }}>x</CloseButton>
            {onNext && <NextButton onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}>Suivant</NextButton>}
          </ButtonGroup>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalBackdrop>
  );
}

export default Modal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #1E1E1E;
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  max-width: 800px;
  overflow-y: auto;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #455558;
  margin: 20px 0;
`;

const ModalTitle = styled.h3`
  color: #F7F2E9;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  line-height: 1;
  color: #F7F2E9;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    color: #252D2F;
  }
`;

const NextButton = styled.button`
  padding: 10px 30px;
  border: none;
  background-color: #252D2F;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #13191A;
  }
`;
