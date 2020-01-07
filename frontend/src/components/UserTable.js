import React, { Fragment } from "react"
import { Table } from "reactstrap"

function renderCell(row, col) {
  if (col === "email") {
    return(<a href={`malto:${row[col]}`}>{row[col]}</a>)
  } else {
    return row[col]
  }
}

export default function UserTable(props) {
  return (
    <Fragment>
      {props.rows.length} results
      <Table striped bordered responsive style={{backgroundColor: "white"}}>
        <thead>
          <tr>
            {
              props.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            props.rows.map((row, index) => (
              <tr key={index}>
                {
                  props.columns.map((col, index) => (
                    <td key={index}>{renderCell(row, col)}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Fragment>
  )
}