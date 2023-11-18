import React from 'react'
import styled from 'styled-components'

function Input({type, name, placeholder, value, onChange}) {
  return (
    <div>
        <StyledInput
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
    </div>
  )
}

export default Input


const StyledInput = styled.input`
padding: 10px;
margin: 10px 0;
width: 250px;

// border: none;
border-radius: 30px;
outline: #F7F2E9;
border: 1px solid #004d00;
background-color: #1E1E1E;
color: #fff;
padding: 15px 20px 15px 20px;
padding-left: 30px;
font-size: 14px;
// box-shadow: 0 0 10px rgba(32, 96, 64, 0.7);
`