import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const Todo = () => {
  let [task, settask] = useState("");
  let [taskerror, setTaskError] = useState("");
  let [taskpull, setTaskPull] = useState([]);
  let [taskInput, setTaskInput] = useState(false);
  let [taskedit, setTaskEdit] = useState(false);
  let [updatetask, setUpdateTask] = useState("");
  let [id, setId] = useState("");
  let [updatealert, setUpdateAlert] = useState("")

  function handleTask(e) {
    settask(e.target.value);
    setTaskError = "";
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (task == "") {
      setTaskError("PLEASE ADD A TASK");
    } else {
      const db = getDatabase();
      set(push(ref(db, "task/")), {
        taskname: task,
      }).then(() => {
        settask("");
        alert("Task Added!");
        setTaskInput(false);
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, "task/");
    onValue(todoRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ value: item.val(), id: item.key });
        setTaskPull(array);
      });
    });
  }, []);
  let handleTaskInput = () => {
    setTaskInput(true);
    setTaskEdit(false);
  };

  let handleDelete = (d) => {
    const db = getDatabase();
    console.log(d);
    remove(ref(db, "task/" + d));
  };
  let handleEdit = (item) => {
    setTaskEdit(true);
    setTaskInput(false);
    setId(item);
  };
  let handleUpdateTask = (ut) => {
    setUpdateTask(ut.target.value);
    setUpdateAlert("")
  };
  let handlePushUpdate = (ut) => {
    console.log(updatetask);
    const db = getDatabase();
    update(ref(db, "task/" + id), {
      taskname: updatetask,
    });
  };

  return (
    <div className="pb-[50px]">
      {taskInput && (
        <div className="max-w-sm mx-auto text-center mt-[50px] ">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-[25px] font-mono font-[600] tracking-[2px] mb-[20px] "
            >
              Your task
            </label>
            <input
              value={task}
              onChange={handleTask}
              maxLength={40}
              className="bg-[black] border-[1px] w-[90%] border-transparent text-white text-[20px] font-mono min-h-[100%]
            text-sm rounded-lg px-[15px] py-[15px] outline-[#fff] placeholder:text-center"
              placeholder="E n t e r  t a s k"
              required=""
            ></input>
            <h1 className="text-[15px] font-[500] text-white mt-[10px] ">
              {taskerror}
            </h1>
          </div>
          <div className="flex justify-center gap-[20px]">
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-[20px] font-[500] font-mono px-[15px] py-0 bg-[#000000] text-[#fff] border-[2px] 
          border-transparent rounded-[5px] hover:bg-transparent hover:border-[#000000] hover:text-[#000000] transition duration-300 ease-out "
            >
              Submit
            </button>
            <button
              onClick={() => setTaskInput(false)}
              type="submit"
              className="text-[20px] font-[500] font-mono px-[15px] py-0 bg-[#000000] text-[#fff] border-[2px] 
          border-transparent rounded-[5px] hover:bg-transparent hover:border-[#000000] hover:text-[#000000] transition duration-300 ease-out "
            >
              Cancle
            </button>
          </div>
        </div>
      )}

      <div className="relative">
        <h2 class="mb-4 text-black opacity-[.6] font-[700] text-[20px] mt-[40px] font-mono tracking-[2px] flex">
          All Tasks-
          <button
            onClick={handleTaskInput}
            className="text-[15px] ml-[13px] px-[10px] py-[3px] bg-black border-[2px] border-transparent text-white rounded-[5px]
             hover:bg-transparent hover:border-[#000000] hover:text-black transition duration-300 ease-out "
          >
            Add Task
          </button>
        </h2>
        <ul class="max-w-md space-y-1 text-gray-800 list-disc list-inside flex-row ">
          {taskpull.map((item) => (
            <li className=" font-mono text-[20px] outline-dotted px-[10px] pt-[5px] flex justify-between overflow-y-auto ">
              {item.value.taskname}
              <div className="list_btns  pt-[4px]">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="mr-[15px]"
                >
                  <BiEdit className="text-[25px] hover:text-white hover:opacity-[.5] " />
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <MdDelete className="text-[25px] hover:text-white hover:opacity-[.5]  " />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {taskedit && (
          <div className="text-center w-[102%] absolute top-[43px] left-[50%] transform translate-x-[-50%] backdrop-blur-sm py-[200px] ">
            <label
              htmlFor="email"
              className="block text-[25px] font-mono font-[600] tracking-[2px] mb-[20px] "
            >
              Edit Task
            </label>
            <input
              onChange={handleUpdateTask}
              maxLength={40}
              className="bg-[black] border-[1px] w-[90%] border-transparent text-white text-[20px] font-mono min-h-[100%]
            text-sm rounded-lg px-[15px] py-[15px] outline-[#fff] placeholder:text-center"
              placeholder="U p d a t e Y o u r T a s k"
              required=""
            ></input>
            <div className="all_edit_buttons flex justify-center gap-[10px] mt-[20px]">
              <button
                onClick={handlePushUpdate}
                type="submit"
                className="text-[20px] font-[500] font-mono px-[15px] py-0 bg-[#000000] text-[#fff] border-[2px] 
          border-transparent rounded-[5px] hover:bg-transparent hover:border-[#000000] hover:text-[#000000] transition duration-300 ease-out "
              >
                Update
              </button>
              <button
                onClick={() => setTaskEdit(false)}
                type="submit"
                className="text-[20px] font-[500] font-mono px-[15px] py-0 bg-[#000000] text-[#fff] border-[2px] 
          border-transparent rounded-[5px] hover:bg-transparent hover:border-[#000000] hover:text-[#000000] transition duration-300 ease-out "
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
