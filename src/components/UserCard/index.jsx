import React from "react";

const UserCard = ({ user = {} }) => (
  <>
    <div className="col-12 col-md-5 m-auto">
      <div className="row p-auto">
        <div className="col-8 col-md-7 flex m-auto relative pl-10">
          <img
            className="img-circle img-size m-auto z-10"
            src={
              user.img !== "null/original.png" && user.img
                ? user.img
                : "https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
            }
            alt={`${user.name}'s Avatar`}
          />
          <div className="bg-blue-700 rounded-full z-0 flex-shrink-0 md:w-full absolute md:h-full" />
        </div>
        <div className="col-12 col-md-5 flex content-center">
          <h1 className="text-6xl m-auto">{user.name}</h1>
        </div>
      </div>
    </div>
  </>
);

export default UserCard;
