import React from 'react';
import ReactTable from "react-table";

const Table = ({
    data,
    loadTable,
    columns,
}) => {
    return (
        <>
            <ReactTable
                data={data}
                filterable
                columns={columns}
                defaultPageSize={10}
                showPaginationTop
                previousText="Anterior"
                nextText="Siguiente"
                loadingText="Cargando..."
                noDataText="No se encontraron filas"
                pageText="Página"
                ofText="de"
                rowsText="filas"
                showPaginationBottom={false}
                className="-striped -highlight"
            />
            <button onClick={loadTable}>Refrescar</button>
        </>
    );
}

export default Table;