import React, { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      name: "Chris",
      img:
        "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/72627283_2602891243065079_7855503477965848576_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=rscJnI5wKK8AX-r9usB&_nc_ht=scontent-mia3-1.xx&oh=d204a2bbc0af26daa047c446d2f99ec6&oe=5EED2B5D",
      task: "Working on Platform"
    },
    {
      name: "Juan",
      img:
        "https://pbs.twimg.com/profile_images/1194094013059649536/JnApAONE_400x400.jpg",
      task: "Testing components"
    }
  ]);
  return (
    <>
      <div className="h-screen grid grid-rows-1 grid-flow-col w-screen">
        <div className="h-screen grid grid-rows-2 grid-flow-col left-0 absolute pl-16 mt-8">
          <div className="img-container">
            <div className="h-80 w-80 z-50 mt-12">
              <img
                className="img-circle"
                src={tasks[0].img}
                alt={`${tasks[0].name}'s Avatar`}
              />
              <div className="circle-behind" />
            </div>
            <h1 className="z-50 block text-6xl pt-40 pl-12">{tasks[0].name}</h1>
          </div>
          <div className="img-container">
            <div className="h-80 w-80 z-50 mt-12">
              <img
                className="img-circle"
                src={tasks[1].img}
                alt={`${tasks[0].name}'s Avatar`}
              />
              <div className="circle-behind" />
            </div>
            <h1 className="z-50 block text-6xl pt-40 pl-12">{tasks[1].name}</h1>
          </div>
        </div>
        <div className="bg-blue-400 h-screen grid grid-rows-2 grid-flow-col p-20 absolute right-0 w-8/12">
          <div className="bg-gray-100 rounded-xl m-auto h-full w-full shadow-2xl flex justify-center items-center -mt-4">
            <p className="text-4xl p-10">{tasks[0].task}</p>
          </div>
          <div className="bg-gray-100 rounded-xl m-auto h-full w-full shadow-2xl flex justify-center items-center mt-10">
            <p className="text-4xl p-10">{tasks[1].task}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tasks;
