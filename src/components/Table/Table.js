import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

function Table({ array }) {
  const options = {
    sizePerPage: 5,
    pageStartIndex: 0,
    paginationSize: 3,
    firstPage: "First",
    lastPage: "Last",
    paginationShowsTotal: false,
    paginationPosition: "bottom",
    hideSizePerPage: true,
    alwaysShowAllBtns: true,
    withFirstAndLast: false,
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
      <TableHeaderColumn isKey dataField="id" hidden>
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
