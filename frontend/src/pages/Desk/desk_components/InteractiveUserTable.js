import React, { Fragment } from "react"
import { Table } from "reactstrap"

export default function InteractiveUserTable(props) {
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
                  row.map((cell, index) => (
                    <td key={index} onClick={() => props.handleOnClick(row)}>
                        {cell}
                    </td>
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