import React, { useState } from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Buttons from '../buttons/Buttons';
import Addtasks from './Addtasks';
import { NavLink } from 'react-router-dom';

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  setCurrentModalOpen,
  currentModalOpen,
  onRemove,
  onEdit,
  onComplete,
  setInputTask,
  withButton,
}) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const editTitle = () => {
    if (inputValue) {
      onEditTitle(list.id, inputValue);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: inputValue,
        })
        .then(handleClose())
        .catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="tasks overflow-scroll">
        <NavLink to={`/lists/${list.id}`}>
          <h2 style={{ color: list.color.hex }} className="tasks__title">
            {list.name}
            <MdOutlineEdit onClick={handleShow} className="tasks__title-edit" />

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Введите новое название</Form.Label>
                    <Form.Control
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      type="text"
                      placeholder="Список:"
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Отмена
                </Button>
                <Button variant="primary" onClick={editTitle}>
                  Сохранить
                </Button>
              </Modal.Footer>
            </Modal>
          </h2>
        </NavLink>
        <div className="tasks__items">
          {!withoutEmpty && list.tasks && !list.tasks.length && (
            <h3>Нажмите + для добавления задачи</h3>
          )}
          {list.tasks &&
            list.tasks.map((task) => (
              <Addtasks
                key={task.id}
                list={list}
                onEdit={onEdit}
                onRemove={onRemove}
                setInputTask={setInputTask}
                currentModalOpen={currentModalOpen}
                setCurrentModalOpen={setCurrentModalOpen}
                onComplete={onComplete}
                {...task}
              />
            ))}
        </div>
      </div>
      {withButton? "":<Buttons key={list.id} list={list} onAddTask={onAddTask} />}
  
    </div>
  );
};

export default Tasks;
