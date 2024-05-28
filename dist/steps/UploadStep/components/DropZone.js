import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useStyleConfig, useToast, Box, Text, Button } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx-ugnis';
import { useState } from 'react';
import { getDropZoneBorder } from '../utils/getDropZoneBorder.js';
import { useRsi } from '../../../hooks/useRsi.js';
import { readFileAsync } from '../utils/readFilesAsync.js';

const DropZone = ({ onContinue, isLoading }) => {
    const { translations, maxFileSize, dateFormat, parseRaw } = useRsi();
    const styles = useStyleConfig("UploadStep");
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: 1,
        maxSize: maxFileSize,
        accept: {
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            "text/csv": [".csv"],
        },
        onDropRejected: (fileRejections) => {
            setLoading(false);
            fileRejections.forEach((fileRejection) => {
                toast({
                    status: "error",
                    variant: "left-accent",
                    position: "bottom-left",
                    title: `${fileRejection.file.name} ${translations.uploadStep.dropzone.errorToastDescription}`,
                    description: fileRejection.errors[0].message,
                    isClosable: true,
                });
            });
        },
        onDropAccepted: async ([file]) => {
            setLoading(true);
            const arrayBuffer = await readFileAsync(file);
            const workbook = XLSX.read(arrayBuffer, {
                cellDates: true,
                dateNF: dateFormat,
                raw: parseRaw,
                dense: true,
                codepage: 65001,
            });
            setLoading(false);
            onContinue(workbook, file);
        },
    });
    return (jsxs(Box, { ...getRootProps(), ...getDropZoneBorder(styles.dropZoneBorder), width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", flex: 1, children: [jsx("input", { ...getInputProps(), "data-testid": "rsi-dropzone" }), isDragActive ? (jsx(Text, { sx: styles.dropzoneText, children: translations.uploadStep.dropzone.activeDropzoneTitle })) : loading || isLoading ? (jsx(Text, { sx: styles.dropzoneText, children: translations.uploadStep.dropzone.loadingTitle })) : (jsxs(Fragment, { children: [jsx(Text, { sx: styles.dropzoneText, children: translations.uploadStep.dropzone.title }), jsx(Button, { sx: styles.dropzoneButton, onClick: open, children: translations.uploadStep.dropzone.buttonTitle })] }))] }));
};

export { DropZone };
