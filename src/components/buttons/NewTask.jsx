import React, { useState, useRef } from 'react';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { Transition } from 'react-transition-group';
import Placeholder from '../placeholder/Placeholder';
import axios from 'axios';
const NewTask = ({ list, openBtn, onAddTask }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setSubmitting] = useState('');
  const ref = useRef();

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const nodeRef = useRef(null);
  const onClose = () => {
    setOpen(false);
    setInputValue('');
    openBtn(false);
  };
  const handleKeyDown = (e) => e.key === 'Enter' && addTask(inputValue);

  const addTask = () => {
    if (!inputValue) {
      toggleShowA();
      return;
    }
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setSubmitting(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        onClose();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const duration = 900;
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateY(100%)',
    position: 'absolute',
    top: '40vh',
  };

  const transitionStyles = {
    entering: { transform: 'translateY(100%)' },
    entered: { transform: 'translateY(0)' },
    exiting: { transform: 'translateY(0)' },
    exited: { transform: 'translateY(100%)' },
  };
  return (
    <section ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="border border-0 bg-transparent"
      >
        <AiOutlineCheckSquare className=" button new new-btn active bg-info  rounded-circle text-white " />
        <p className="button bt-text new new-text fw-semibold shadow-lg p-2 bg-body-tertiary rounded">
          Новая задача
        </p>
      </button>
      <Transition nodeRef={nodeRef} in={open} timeout={duration}>
        {(state) => (
          <div
            className="default"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Placeholder
              Close={onClose}
              list={list}
              value={inputValue}
              setValue={setInputValue}
              addTask={addTask}
              submit={isSubmitting}
              handleKeyDown={handleKeyDown}
              toggleShowA={toggleShowA}
              showA={showA}
            />
          </div>
        )}
      </Transition>
    </section>
  );
};

export default NewTask;
