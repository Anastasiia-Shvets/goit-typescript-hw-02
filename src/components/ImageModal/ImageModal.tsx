import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

type Props = {
    urls: string;
    alt: string;
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const ImageModal = ({ urls, alt, modalIsOpen, closeModal }: Props) => {
  return (
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel={alt}>
          <img src={urls} alt={alt} />
      </Modal>
  )
}
export default ImageModal;