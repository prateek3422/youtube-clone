import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import videoService from "../services/VideoService";

const modal = () => {
  const [hide, setHide] = useState();
  const [video, setVideo] = useState()
  const [thumb, setThumb] = useState( ) 
  const [title, setTitle] = useState( ) 
  const [des, setDes] = useState( ) 
 

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
      const res =  await videoService.publishVideo(video, thumb, title, des)
    } catch (error) {
     console.log(error) 
    }

    console.log(video)
    console.log(thumb)
    console.log(title)
    console.log(des)
  }
  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={() => setHide(true)}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  "
        type="button"
      >
        upload video
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          hide ? "" : "hidden"
        } flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                upload video
              </h3>
              <button
                onClick={() => setHide(false)}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <Input lable="video file" type="file" value={video} onChange={(e) => setVideo(e.target.value)}  />
                <Input lable="Thumbnail" type="file" value={thumb} onChange={(e) => setThumb(e.target.value)} />

                <Input lable="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                <Input lable="Description" type="text" height='48' value={des} onChange={(e) => setDes(e.target.value)} />

                <Button className="mt-4">save</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default modal;

