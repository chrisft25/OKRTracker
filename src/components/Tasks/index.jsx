import React from "react";

const Tasks = () => (
  <>
    <div className="h-screen grid grid-rows-1 grid-flow-col w-screen">
      <div className="h-screen grid grid-rows-2 grid-flow-col left-0 absolute pl-16 mt-8">
        <div className="img-container">
          <div className="h-80 w-80 z-50 mt-12">
            <img
              className="img-circle"
              src="https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/72627283_2602891243065079_7855503477965848576_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=rscJnI5wKK8AX-r9usB&_nc_ht=scontent-mia3-1.xx&oh=d204a2bbc0af26daa047c446d2f99ec6&oe=5EED2B5D"
              alt=""
            />
            <div className="circle-behind" />
          </div>
          <h1 className="z-50 block text-6xl pt-40 pl-12">Chris</h1>
        </div>
        <div className="img-container">
          <div className="h-80 w-80 z-50 mt-12">
            <img
              className="img-circle"
              src="https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/72627283_2602891243065079_7855503477965848576_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=rscJnI5wKK8AX-r9usB&_nc_ht=scontent-mia3-1.xx&oh=d204a2bbc0af26daa047c446d2f99ec6&oe=5EED2B5D"
              alt=""
            />
            <div className="circle-behind" />
          </div>
          <h1 className="z-50 block text-6xl pt-40 pl-12">Chris</h1>
        </div>
      </div>
      <div className="bg-blue-400 h-screen grid grid-rows-2 grid-flow-col p-20 absolute right-0 w-8/12">
        <div className="bg-gray-100 rounded-xl m-auto h-full w-full shadow-2xl flex justify-center items-center -mt-4">
          <p className="text-4xl p-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At labore
            reprehenderit nam dolorem exercitationem suscipit aperiam, vel
            dignissimos odit eos distinctio quisquam quasi eligendi fugit
            dolorum iusto quam dolor! Illum.
          </p>
        </div>
        <div className="bg-gray-100 rounded-xl m-auto h-full w-full shadow-2xl flex justify-center items-center mt-10">
          <p className="text-4xl p-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At labore
            reprehenderit nam dolorem exercitationem suscipit aperiam, vel
            dignissimos odit eos distinctio quisquam quasi eligendi fugit
            dolorum iusto quam dolor! Illum.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Tasks;
