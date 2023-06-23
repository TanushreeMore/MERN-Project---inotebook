import React from "react";

function Alert(props) {
  const capitalize = (word)=>{
      if(word === "danger"){word = "error"} //bcoz it was showing danger word on alert, so we are replacing it here with error
      
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
      <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
         <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
      </div>}
      </div>
  )
}

export default Alert;
