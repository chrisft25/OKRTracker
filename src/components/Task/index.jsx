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
  const cards = [];

  const getMembers = async (idBoards = (process.env.REACT_APP_MAIN_BOARD).split(",")) => {
    let member = [];
    let preData = [];
    console.log(idBoards);
    await Promise.all(idBoards.map(async (idBoard) => {
      preData = await (
        await trello
          .boards(idBoard)
          .members()
          .getMembers()
      ).json();
      preData.map((val) => { member = [...member, val]; });
    }));

    member = member.filter((mem, key) => key === member.indexOf(mem));
    console.log(member);

    await getAvatars(member);
  };

  const getAvatars = async (member) => Promise.all(
    member.map(async (mem) => {
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
    }),
  );

  const getDoingCards = async (idLists = (process.env.REACT_APP_DOING_LISTS).split(",")) => {
    await Promise.all(idLists.map(async (idList) => {
      await (
        await trello
          .lists(idList)
          .cards()
          .getCards()
      )
        .json()
        .then((data) => {
          data.map((card) => cards.push({
            id: card.idMembers[0],
            task: card.name,
            img: members.filter((mem) => mem.id === card.idMembers[0])[0]
              ? `${
                members.filter((mem) => mem.id === card.idMembers[0])[0].avatar
              }/original.png`
              : null,
            name: members.filter((mem) => mem.id === card.idMembers[0])[0]
              ? members.filter((mem) => mem.id === card.idMembers[0])[0].fullName
              : null,
          }));
        });
    }));

    console.log(cards);
    setTasks(cards);
  };

  useEffect(() => {
    async function initialData() {
      await getMembers();
      await getDoingCards();
    }

    initialData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        {tasks.map((task) => (task.id ? (
          <div className="row height-50 bounceInUp animated" key={task.id}>
            <UserCard user={task} />
            <TaskCard task={task.task} />
          </div>
        ) : (
          ""
        )))}
      </div>
    </>
  );
};
export default Task;
