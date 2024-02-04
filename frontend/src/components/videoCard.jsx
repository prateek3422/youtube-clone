import React, { useEffect, useState } from 'react'


const VideoCard = ({items }) => {
console.log(items)
  return (
    <>
        <div className="video-card">
    <div className="thumbnail">
      <img
      className='rounded-lg'
        src={items.snippet?.thumbnails.maxres.url}
        alt=""
      />
    </div>
    <div className="flex gap-x-2">
      <div className="h-10 w-10 shrink-0">
        <img
          className="h-full w-full rounded-full"
          src="	https://images.pexels.com/photos/3532545/pexels-ph…jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="w-full">
        <h3 className="mb-1 font-semibold">
          {items.snippet.title}
        </h3>
        <p className="flex text-sm text-gray-600">
          {" "}
          10.3k Views · 44 minutes ago
        </p>
        <p className="text-sm text-gray-600">{items.snippet.channelTitle}</p>
      </div>
    </div>
  </div>
    </>
  )
}

export default VideoCard