import React from 'react'

const SearchBar = () => {
  return (
    <div className='search flex justify-center items-center w-1/3'>
        <input
         className='w-96 h-8 rounded-2xl px-2 items-center '
         type="text"
        placeholder='search' 
        />
    </div>
  )
}

export default SearchBar