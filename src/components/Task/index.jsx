import React, { useState, useEffect } from "react";
import { Trello } from "trello-for-wolves";
import TaskCard from "../TaskCard";
import UserCard from "../UserCard";

const trello = new Trello({
  key: process.env.REACT_APP_TRELLO_KEY,
  token: process.env.REACT_APP_TRELLO_TOKEN,
});

const Task = () => {
  let animation = true;
  const [tasks, setTasks] = useState([]);
  const members = [];
  let cards = [];

  const getMembers = async (
    idBoards = process.env.REACT_APP_BOARDS.split(",")
  ) => {
    let member = [];
    let preData = [];
    console.log(idBoards);
    await Promise.all(
      idBoards.map(async idBoard => {
        preData = await (
          await trello
            .boards(idBoard)
            .members()
            .getMembers()
        ).json();
        preData.map(val => {
          member = [...member, val];
        });
      })
    );

    /**
     * Find duplicates.
     *
     * Create a new array with unique id's
     * Then, we do a map function to the result and return the original values from that.
     */

    member = Array.from(new Set(member.map(a => a.id))).map(id =>
      member.find(a => a.id === id)
    );

    await getAvatars(member);
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

  const getDoingCards = async (
    type = 1,
    idLists = process.env.REACT_APP_DOING_LISTS.split(",")
  ) => {
    console.log({ type });
    cards = [];
    let preData = [];
    await Promise.all(
      idLists.map(async idList => {
        await (
          await trello
            .lists(idList)
            .cards()
            .getCards()
        )
          .json()
          .then(data => {
            data.map(card =>
              preData.push({
                id: card.id + Date.now(),
                id_task: card.id,
                task: card.name,
                img: members.filter(mem => mem.id === card.idMembers[0])[0]
                  ? `${
                      members.filter(mem => mem.id === card.idMembers[0])[0]
                        .avatar
                    }/original.png`
                  : null,
                name: members.filter(mem => mem.id === card.idMembers[0])[0]
                  ? members.filter(mem => mem.id === card.idMembers[0])[0]
                      .fullName
                  : null,
              })
            );
          });
      })
    );
    preData.sort((a, b) => Math.random() - 0.5);
    preData = preData.filter(val => {
      if (tasks.length > 0) {
        if (val.name && val.id_task !== tasks[tasks.length - 1].id_task) {
          return val;
        }
      } else if (val.name) return val;
    });
    if (type === 1) {
      cards = preData;
      console.log({ cards });
      console.log({ preData });
      return false;
    }
    console.log({ preData });
    console.log("voy a retornar valor");
    return preData;
  };

  const updateTasks = async () => {
    await getMembers();
    const prueba = await getDoingCards(2);
    console.log({ prueba });
  };

  useEffect(() => {
    async function initialData() {
      await getMembers();
      await getDoingCards();
      setTasks(cards);
      console.log(cards);
      animation = false;
    }

    initialData();
  }, []);

  useEffect(() => {
    async function checkingChanges() {
      if (tasks.length <= 2) {
        await getMembers();
        await getDoingCards();
        setTasks(tasks.concat(cards));
        console.log(tasks);
      }
    }

    checkingChanges();
  });

  const slideNextTask = () => {
    Promise.resolve()
      .then(async () => {
        if (tasks.length <= 3) {
        }
      })
      .then(() => {
        const animation = new Promise((resolve, reject) => {
          tasks.map(item => {
            window.document
              .getElementById(item.id)
              .classList.remove("bounceInUp");
          });
          window.document.getElementById(tasks[0].id).classList.add("slow");
          window.document
            .getElementById(tasks[0].id)
            .classList.add("bounceOutRight");
          setTimeout(() => {
            window.document
              .getElementById(tasks[0].id)
              .classList.remove("bounceOutRight");

            setTasks(tasks.filter(item => item.id !== tasks[0].id));
            resolve("¡Éxito!"); // ¡Todo salió bien!
          }, 900);
        });
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      window.document.getElementById("triggerbutton").click();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <button className="hidden" id="triggerbutton" onClick={slideNextTask}>
          Hola
        </button>
        {tasks.map(task => (
          <div
            className={`row height-50 animated ${
              animation === true ? "bounceInUp slow" : ""
            }`}
            id={task.id}
          >
            <UserCard user={task} />
            <TaskCard task={task.task} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Task;
