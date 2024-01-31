import React from 'react'

const signup = () => {
  const signup = async (data)=>{
    
  }
  return (
    <>
    <div className="auth flex justify-center items-center">
      <div className='card  grid grid-cols-2 '>
        <div className="auth-img flex justify-center items-center">
          <img src="/images/signup.svg" alt="signup-image" />
        </div>
        <div className='auth-details'>
          <form onSubmit={signup}></form>
        </div>
      </div>
    </div>
    </>
  )
}

export default signup