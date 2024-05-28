import { jsxs, jsx } from 'react/jsx-runtime';
import { useStyleConfig, ModalFooter, Button } from '@chakra-ui/react';

const ContinueButton = ({ onContinue, onBack, title, backTitle, isLoading }) => {
    const styles = useStyleConfig("Modal");
    const nextButtonMobileWidth = onBack ? "8rem" : "100%";
    return (jsxs(ModalFooter, { children: [onBack && (jsx(Button, { size: "md", sx: styles.backButton, onClick: onBack, isLoading: isLoading, variant: "link", children: backTitle })), jsx(Button, { size: "lg", w: { base: nextButtonMobileWidth, md: "21rem" }, sx: styles.continueButton, onClick: onContinue, isLoading: isLoading, children: title })] }));
};

export { ContinueButton };
