import React from 'react'

const Button = ({
    children,
    type='button',
    bgcolor='bg-red-500',
    text='text-white',
    className='',
    ...props
}) => {
  return (
    <button className={`px-4 py-2 rounded-lg  ${className} ${bgcolor} ${text} `} {...props}>
        {children}
        </button>
  )
}

export default Button