import React from 'react'
import Switch from '@mui/material/Switch';


const Slider = (props) => {
    
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  return (
    <Switch {...label} {...props} />

  )
}

export default Slider