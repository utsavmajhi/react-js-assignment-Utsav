import React from 'react'
import dogIcon from '../../assets/icons/dogIcon.png'
const HeaderWithIcon = (props) => (
  <div>
    <img src= {dogIcon} style = {{
      width: '150px'
    }}></img>
    <h1>{`${props.text}`}</h1>    
  </div>
)

export default HeaderWithIcon