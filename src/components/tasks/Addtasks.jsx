import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PiWarningDuotone } from 'react-icons/pi';

const Addtasks = ({
  id,
  text,
  list,
  completed,
  onRemove,
  onEdit,
  onComplete,
  setCurrentModalOpen,
  currentModalOpen,
  setInputTask,
}) => {
  const onChangeCheckbox = (e) => {
    onComplete(list.id, id, e.target.checked);
  };
  return (
    <div key={id} className="tasks__items-row">
      <div className="checkbox">
        <input
          onChange={onChangeCheckbox}
          checked={completed}
          id={`task-${id}`}
          type="checkbox"
          name="checked"
        />
        <label htmlFor={`task-${id}`}>
          <FaCheck className="checkbox-icon" />
        </label>
      </div>
      <input
        type="text"
        defaultValue={text}
        onChange={(e) => setInputTask(e.target.value)}
        name="newTask"
      ></input>
      <button onClick={() => onEdit(list.id, { id, text })}>Готово</button>
      <div className="tasks__items-row-actions">
        <IoCloseOutline onClick={() => setCurrentModalOpen(id)} />
        <Modal
          key={id}
          show={currentModalOpen === id}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header onClick={() => setCurrentModalOpen(null)} closeButton>
            <Modal.Title>
              <PiWarningDuotone className="mx-3" />
              Предупреждение
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Задача будет удалена.</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => onRemove(list.id, id)}>
              Удалить
            </Button>
            <Button
              variant="secondary"
              onClick={() => setCurrentModalOpen(null)}
            >
              Отмена
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Addtasks;

