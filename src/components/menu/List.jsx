import React, { useState } from 'react';
import classNames from 'classnames';
import Badge from './badge/Badge';
import { IoIosClose } from 'react-icons/io';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { PiWarningDuotone } from 'react-icons/pi';

import axios from 'axios';
const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickLi,
  activeList,
}) => {
  const [currentModalOpen, setCurrentModalOpen] = useState(null);
  const removeList = (item) => {
    axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
      onRemove(item.id);
      setCurrentModalOpen(null);
    });
  };
  return (
    <ul onClick={onClick} className="list ">
      {items.map((item, index) => {
        return (
          <li
            key={index}
            onClick={onClickLi ? () => onClickLi(item) : null}
            className={classNames(item.className, {
              dynamic: activeList && activeList.id === item.id,
            })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
            {isRemovable && (
              <>
                <IoIosClose
                  className="list__remove-btn"
                  onClick={() => setCurrentModalOpen(item.id)}
                />
                <Modal
                  key={index}
                  show={currentModalOpen === item.id}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header
                    onClick={() => setCurrentModalOpen(null)}
                    closeButton
                  >
                    <Modal.Title>
                      <PiWarningDuotone className="mx-3" />
                      Предупреждение
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Все задачи в списке будут удалены.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={() => removeList(item)}>
                      Удалить список
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentModalOpen(null)}
                    >
                      Отмена
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
