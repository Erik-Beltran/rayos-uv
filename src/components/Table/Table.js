import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function Table({ array }) {
  const options = {
    sizePerPage: 5, // which size per page you want to locate as default
    pageStartIndex: 0, // where to start counting the pages
    paginationSize: 3, // the pagination bar size.
    // prePage: "Anterior", // Previous page button text
    // nextPage: "Siguente", // Next page button text
    firstPage: "First", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: false, // Accept bool or function
    paginationPosition: "top", // default is bottom, top and both is all available
    hideSizePerPage: true, // > You can hide the dropdown for sizePerPage
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
  };
  return (
    <BootstrapTable
      data={array}
      options={options}
      tableBodyClass="table-container"
      className="table"
      striped
      hover
      pagination
    >
      <TableHeaderColumn isKey dataField="id">
        Id
      </TableHeaderColumn>
      <TableHeaderColumn dataField="ciudad">Ciudad</TableHeaderColumn>
      <TableHeaderColumn dataField="año">Año</TableHeaderColumn>
      <TableHeaderColumn dataField="mes">Mes</TableHeaderColumn>
      <TableHeaderColumn dataField="dia">Dia</TableHeaderColumn>
      <TableHeaderColumn dataField="hora">Hora</TableHeaderColumn>
      <TableHeaderColumn dataField="indice">Indice</TableHeaderColumn>
    </BootstrapTable>
  );
}

export default Table;
