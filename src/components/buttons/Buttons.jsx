import React, { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import NewTask from './NewTask';
// import Regular from './Regular';
// import Habbit from './Habbit';
import { CSSTransition } from 'react-transition-group';

const Buttons = ({ list, onAddTask }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const nodeRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <section ref={ref}>
      <button
        className="border border-0 bg-transparent "
        onClick={() => setOpen(!open)}
      >
        <AiOutlinePlus className=" plus new new-btn  bg-info  rounded-circle text-white" />
      </button>
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={300}
        classNames="group"
        unmountOnExit
      >
        <div className="group">
          <NewTask list={list} openBtn={setOpen} onAddTask={onAddTask}/>
          {/* <Regular />
          <Habbit /> */}
        </div>
      </CSSTransition>
    </section>
  );
};

export default Buttons;
