import { jsx, jsxs } from 'react/jsx-runtime';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import { useRsi } from '../../hooks/useRsi.js';

const ConfirmCloseAlert = ({ isOpen, onClose, onConfirm }) => {
    const { translations } = useRsi();
    const cancelRef = useRef(null);
    return (jsx(AlertDialog, { isOpen: isOpen, onClose: onClose, leastDestructiveRef: cancelRef, isCentered: true, id: "rsi", children: jsx(AlertDialogOverlay, { children: jsxs(AlertDialogContent, { children: [jsx(AlertDialogHeader, { children: translations.alerts.confirmClose.headerTitle }), jsx(AlertDialogBody, { children: translations.alerts.confirmClose.bodyText }), jsxs(AlertDialogFooter, { children: [jsx(Button, { ref: cancelRef, onClick: onClose, variant: "secondary", children: translations.alerts.confirmClose.cancelButtonTitle }), jsx(Button, { colorScheme: "red", onClick: onConfirm, ml: 3, children: translations.alerts.confirmClose.exitButtonTitle })] })] }) }) }));
};

export { ConfirmCloseAlert };
