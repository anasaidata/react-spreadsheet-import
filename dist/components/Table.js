import { jsx } from 'react/jsx-runtime';
import DataGrid from 'react-data-grid';
import { useRsi } from '../hooks/useRsi.js';

const Table = ({ className, ...props }) => {
    const { rtl } = useRsi();
    return jsx(DataGrid, { className: "rdg-light " + className || "", direction: rtl ? "rtl" : "ltr", ...props });
};

export { Table };
