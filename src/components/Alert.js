import React from 'react'

const Alert = (props) => {
  const capitalize=(word)=>{
      if (word==="danger") {
        word='error';
      }
      const changedword=word.toLowerCase();
      return changedword.charAt(0).toUpperCase()+changedword.slice(1);
  }
  return (
    <div style={{height: '50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg };
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>}
    </div>
  
  )
}


export default Alert
