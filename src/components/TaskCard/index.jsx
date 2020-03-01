import React from "react";

const TaskCard = ({ task = {} }) => (
  <>
    <div className="col-12 col-md-7 bg-blue-600 p-12">
      <div className="bg-gray-100 rounded-xl m-auto h-full w-full shadow-2xl flex justify-center items-center -mt-4">
        <p className="text-4xl p-10">{task}</p>
      </div>
    </div>
  </>
);

export default TaskCard;
