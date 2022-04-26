import { Overlay, ModalWindow, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  const { largeImageURL, tags } = largeImage;

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <ModalImg src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
