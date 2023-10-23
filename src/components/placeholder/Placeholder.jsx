import React, { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { FaArrowUp } from 'react-icons/fa';
import { PiArrowClockwiseBold } from 'react-icons/pi';
import classNames from 'classnames';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Placeholder = ({
  Close,
  list,
  className,
  value,
  setValue,
  addTask,
  submit,
  handleKeyDown,
  showA,
  toggleShowA,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" add-placeholder">
      <SlArrowDown onClick={Close} className="add-placeholder--close" />
      <textarea
        onKeyDown={handleKeyDown}
        value={value}
        className="w-100 bg-transparent"
        type="text"
        placeholder="напр., Проверить будильники"
        onChange={(e) => setValue(e.target.value)}
      ></textarea>

      <button
        onClick={() => setOpen(!open)}
        className={classNames(
          'add-placeholder__button',
          { [`add-placeholder__button--${list.color.name}`]: list.color.name },
          className
        )}
      >
        {list.name}
      </button>
      <div className="add-placeholder__line">
        <button className="add-placeholder__submit" onClick={addTask}> Сохранить 
          {submit ? (
            <PiArrowClockwiseBold className="add-placeholder__submit--update" />
          ) : (
            <FaArrowUp />
          )}
        </button>
      </div>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 5 }}>
        <Toast
          show={showA}
          delay={5000}
          autohide
          onClose={toggleShowA}
          bg="light"
        >
          <Toast.Header className="bg-secondary-subtle">
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Оповещение</strong>
            <small>сейчас</small>
          </Toast.Header>
          <Toast.Body>Введите задачу</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Placeholder;
