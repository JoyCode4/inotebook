import React from 'react'

const Alert = (props) => {
    const {message}=props;
    return (
          <div id='alert' className="alert alert-primary" role="alert">
            {message}
          </div>
        )
  }

export default Alert;
