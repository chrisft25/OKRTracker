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

  const getMembers = async (idBoards = (process.env.REACT_APP_BOARDS).split(",")) => {
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


    /**
 * Find duplicates.
 *
 * Create a new array with unique id's
 * Then, we do a map function to the result and return the original values from that.
 */

    member = Array.from(new Set(member.map((a) => a.id)))
      .map((id) => member.find((a) => a.id === id));


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
      const preData = [];
      await (
        await trello
          .lists(idList)
          .cards()
          .getCards()
      )
        .json()
        .then((data) => {
          data.map((card) => preData.push({
            id: card.id,
            hide: false,
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
          preData.map((val) => ((val.name) ? cards.push(val) : null));
        });
    }));
  };


  const updateTasks = () => {

  };
  useEffect(() => {
    async function initialData() {
      await getMembers();
      await getDoingCards();
      setTasks(cards);
      console.log(cards);
    }

    initialData();
  }, []);

  const reset = () => {
    new Promise((resolve, reject) => {
      window.document.getElementById(tasks[0].id).classList.add("bounceOutRight");
      setTimeout(() => {
        window.document.getElementById(tasks[0].id).classList.remove("bounceOutRight");
        window.document.querySelectorAll(".animated").classList.remove("bounceInUp");
        setTasks(tasks.filter((item) => item.id !== tasks[0].id));
        resolve("¡Éxito!"); // ¡Todo salió bien!
      }, 250);
    });
  };

  return (
    <>
      <div className="container-fluid">
        <button onClick={reset}>Hola</button>
        {tasks.map((task) => (
          <div className="row height-50 bounceInUp animated" id={task.id}>
            <UserCard user={task} />
            <TaskCard task={task.task} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Task;
