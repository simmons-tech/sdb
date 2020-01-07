import React from "react";
import {Spinner} from "reactstrap"

export default function LoadingSpinner(props) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100%"}}>
      <Spinner style={{ color:props.color, width: '5rem', height: '5rem' }} />
    </div>
  )
}