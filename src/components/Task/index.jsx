import React, { useState } from "react";
import TaskCard from "../TaskCard";
import UserCard from "../UserCard";

const Trello = require("trello");

const trello = new Trello("323ba02d10dd651f558d8d56a48f45ee", "4a7071d829abcc2c31767f9f2b80603d02062f4eb2dfbf70bbfc7673748e75f3");

const Task = () => {
  const cardsPromise = trello.getListsOnBoard("ee8vLN8D");
  cardsPromise.then((cards) => {
    console.log(cards);
  });
  const [tasks, setTasks] = useState([
    {
      name: "Chris",
      img:
        "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/72627283_2602891243065079_7855503477965848576_n.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=rscJnI5wKK8AX-r9usB&_nc_ht=scontent-mia3-1.xx&oh=d204a2bbc0af26daa047c446d2f99ec6&oe=5EED2B5D",
      task: "Working on Platform",
    },
    {
      name: "Monge",
      img:
        "https://pbs.twimg.com/profile_images/1194094013059649536/JnApAONE_400x400.jpg",
      task: "Testing components",
    },
    {
      name: "Elison",
      img:
        "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/15107357_1188989514522691_1344334489557637141_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=BLqbcEmj8IkAX8C9V5n&_nc_ht=scontent-mia3-1.xx&oh=95c83366f9bb17049ad133e8c68fad1c&oe=5EB7ED1E",
      task: "Looking for Bugs",
    },
    {
      name: "Ariel",
      img:
        "https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/p960x960/64341054_2159946330961934_7967657946081394688_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=5It5RZrmJSsAX8esPq2&_nc_ht=scontent-mia3-2.xx&_nc_tp=6&oh=defc55cf98a7ccb5e545e78c496ddc42&oe=5EFF5962",
      task: "Building an app",
    },
    {
      name: "Majo",
      img:
        "https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/p960x960/73214051_2475850185856281_3224168005634097152_o.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=JYMlhvNPMJIAX9NMfYJ&_nc_ht=scontent-mia3-2.xx&_nc_tp=6&oh=b06a1e0e266ad3f9bc035c7c2347b289&oe=5F03057C",
      task: "Designing new promotion",
    },
    {
      name: "Josué",
      img:
        "https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/p960x960/45265716_1992394774172885_1881235769167708160_o.jpg?_nc_cat=108&_nc_sid=7aed08&_nc_ohc=HQFrWHFXmG8AX9_eolA&_nc_ht=scontent-mia3-1.xx&_nc_tp=6&oh=95780898a2b42de5fe336145cc42cab3&oe=5EFDD5E6",
      task: "Repairing Printer",
    },
  ]);
  return (
    <>
      <div className="container-fluid">
        {tasks.map((task) => (
          <div className="row height-50">
            <UserCard user={task} />
            <TaskCard task={task.task} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Task;
