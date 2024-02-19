import React from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()
  // const authStatus = useSelector(state => state.auth.status)
  const sideList = [
    {
      name:'Home',
      slug:'/',
    },

    {
      name:'Liked-videos',
      slug:'/liked-videos',
    },
    {
      name:'History',
      slug:'/history',
    },

    {
      name:'Collection',
      slug:'/collection',
    },

    {
      name:'My-Content',
      slug:'/content',

    },
    {
      name:'Subscribers',
      slug:'/subscribers',
    },
  ]

  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      {
        sideList.map((item)=>{
          return(
            <div key={item.name}>
              <button onClick={()=> navigate(item.slug)} >{item.name}</button>
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default SideBar