import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import Burger from './components/menu/burger/Burger';
import Menu from './components/menu/Menu';
import Tasks from './components/tasks/Tasks';
import axios from 'axios';

function App() {
  const [menuActive, setmenuActive] = useState(false);
  const [lists, setLists] = useState(null);
  const [activeList, setActiveList] = useState(null);
  const [currentModalOpen, setCurrentModalOpen] = useState(null);
  const [inputTask, setInputTask] = useState('');
  let navigate = useNavigate();
  let location = useLocation();

  const onAddValueList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (listId, taskObj) => {
    if (inputTask) {
      const newList = lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.map((task) => {
            if (task.id === taskObj.id) {
              task.text = inputTask;
            }
            return task;
          });
        }
        return list;
      });
      setLists(newList);
      axios
        .patch('http://localhost:3001/tasks/' + taskObj.id, {
          text: inputTask,
        })
        .catch(() => {
          alert('Не удалось обновить задачу');
        });
    }
    // const newTaskText = window.prompt('Текст задачи', taskObj.text);

    // if (!newTaskText) {
    //   return;
    // }
  };
  
  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskId, {
        completed,
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  const onRemoveTask = (listId, taskId) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter((task) => task.id !== taskId);
      }
      return item;
    });
    setLists(newList);
    setCurrentModalOpen(null);
    axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
      alert('Не удалось обновить задачу');
    });
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then((response) => {
        setLists(response.data);
      });
  }, []);
  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveList(list);
    }
  }, [lists, location.pathname]);
  return (
    <>
      <Burger menuActive={menuActive} setmenuActive={setmenuActive} />
      <Menu
        active={menuActive}
        setActive={setmenuActive}
        lists={lists}
        onAddList={onAddValueList}
        setLists={setLists}
        activeList={activeList}
        setActiveList={setActiveList}
        navigate={navigate}
      />
      <div
        className={menuActive ? 'shift right ' : 'shift'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="todo__tasks">
          <Routes>
            <Route
              path="/"
              element={
                lists &&
                lists.map((list) => (
                  <Tasks 
                    key={list.id}
                    list={list}
                    onEditTitle={onEditListTitle}
                    onAddTask={onAddTask}
                    currentModalOpen={currentModalOpen}
                    setCurrentModalOpen={setCurrentModalOpen}
                    onRemove={onRemoveTask}
                    onEdit={onEditTask}
                    setInputTask={setInputTask}
                    onComplete={onCompleteTask}
                    inputTask={inputTask}
                    withoutEmpty
                    withButton
                  />
                ))
              }
            />
            <Route
              path="/lists/:id"
              element={
                lists &&
                activeList && (
                  <Tasks
                    list={activeList}
                    onEditTitle={onEditListTitle}
                    onAddTask={onAddTask}
                    currentModalOpen={currentModalOpen}
                    setCurrentModalOpen={setCurrentModalOpen}
                    onRemove={onRemoveTask}
                    onEdit={onEditTask}
                    setInputTask={setInputTask}
                    onComplete={onCompleteTask}
                    inputTask={inputTask}
                  />
                )
              }
            />
          </Routes>
        </div>
   
      </div>
    </>
  );
}

export default App;
