import React from 'react'

const Alert = (props) => {
    const {message}=props;
  return (
    <div class="alert alert-primary" role="alert">
        {message}
    </div>
  )
}

export default Alert;
