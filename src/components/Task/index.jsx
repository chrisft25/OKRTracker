import React, { useState, useEffect } from "react";
import { Trello } from "trello-for-wolves";
import TaskCard from "../TaskCard";
import UserCard from "../UserCard";

const trello = new Trello({
  key: process.env.REACT_APP_TRELLO_KEY,
  token: process.env.REACT_APP_TRELLO_TOKEN,
});

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const members = [];
  let cards = [];

  const getMembers = async (idBoard = process.env.REACT_APP_MAIN_BOARD) => {
    const member = await (
      await trello
        .boards(idBoard)
        .members()
        .getMembers()
    ).json();

    await getAvatars(member);
    getDoingCards();
  };

  const getAvatars = async member =>
    Promise.all(
      member.map(async mem => {
        const { id, fullName, username } = mem;
        const { _value } = await (
          await trello.members(mem.id).getFieldValue("avatarUrl")
        ).json();
        members.push({
          id,
          fullName,
          username,
          avatar: _value,
        });
      })
    );

  const getDoingCards = async () => {
    await (
      await trello
        .lists("5e55bf69d7c0996f4c7a4b6e")
        .cards()
        .getCards()
    )
      .json()
      .then(data => {
        cards = data.map(card => ({
          id: card.idMembers[0],
          task: card.name,
          img: members.filter(mem => mem.id === card.idMembers[0])[0]
            ? `${
                members.filter(mem => mem.id === card.idMembers[0])[0].avatar
              }/original.png`
            : null,
          name: members.filter(mem => mem.id === card.idMembers[0])[0]
            ? members.filter(mem => mem.id === card.idMembers[0])[0].fullName
            : null,
        }));
      });
    setTasks(cards);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <div className="container-fluid">
        {tasks.map(task =>
          task.id ? (
            <div className="row height-50 bounceInUp animated" key={task.id}>
              <UserCard user={task} />
              <TaskCard task={task.task} />
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};
export default Task;
