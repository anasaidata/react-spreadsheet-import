import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useStyleConfig, IconButton } from '@chakra-ui/react';
import { CgClose } from 'react-icons/cg';
import { ConfirmCloseAlert } from './Alerts/ConfirmCloseAlert.js';
import { useState } from 'react';

const ModalCloseButton = ({ onClose }) => {
    const [showModal, setShowModal] = useState(false);
    const styles = useStyleConfig("Modal");
    return (jsxs(Fragment, { children: [jsx(ConfirmCloseAlert, { isOpen: showModal, onClose: () => setShowModal(false), onConfirm: () => {
                    setShowModal(false);
                    onClose();
                } }), jsx(IconButton, { right: "14px", top: "20px", variant: "unstyled", sx: styles.closeModalButton, "aria-label": "Close modal", icon: jsx(CgClose, {}), color: "white", position: "fixed", transform: "translate(50%, -50%)", onClick: () => setShowModal(true), zIndex: "toast", dir: "ltr" })] }));
};

export { ModalCloseButton };
