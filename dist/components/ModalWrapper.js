import { jsx, jsxs } from 'react/jsx-runtime';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { ModalCloseButton } from './ModalCloseButton.js';
import { useRsi } from '../hooks/useRsi.js';

const ModalWrapper = ({ children, isOpen, onClose }) => {
    const { rtl } = useRsi();
    return (jsx(Modal, { isOpen: isOpen, onClose: onClose, id: "rsi", variant: "rsi", closeOnEsc: false, closeOnOverlayClick: false, scrollBehavior: "inside", children: jsxs("div", { dir: rtl ? "rtl" : "ltr", children: [jsx(ModalOverlay, {}), jsx(ModalCloseButton, { onClose: onClose }), jsx(ModalContent, { children: children })] }) }));
};

export { ModalWrapper };
