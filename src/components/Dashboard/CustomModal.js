import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, children }) => (
  <Modal show={show} fullscreen={true} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Rezervasyon Ekle</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
      <Button variant="primary" onClick={handleClose}>Save Changes</Button>
    </Modal.Footer>
  </Modal>
);

export default CustomModal;