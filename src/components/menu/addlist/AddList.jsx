import React, { useState, useRef, useEffect } from 'react';
import List from '../List';
import { AiOutlinePlus } from 'react-icons/ai';
import { SlArrowDown } from 'react-icons/sl';
import Badge from '../badge/Badge';
import { Transition } from 'react-transition-group';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';

const AddList = ({ colors, onAdd }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setOpenPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setOpenPopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };
  const handleKeyDown = (e) => e.key === 'Enter' && addValue(inputValue);
  const addValue = () => {
    if (!inputValue) {
      toggleShowA();
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks:[] };
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Ошибка при добавлении списка!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const nodeRef = useRef(null);
  const duration = 900;
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: 'translateY(100%)',
    position: 'absolute',
    // top: '50vh',
  };

  const transitionStyles = {
    entering: { transform: 'translateY(100%)' },
    entered: { transform: 'translateY(0)' },
    exiting: { transform: 'translateY(0)' },
    exited: { transform: 'translateY(100%)' },
  };

  return (
    <section ref={ref} className="add-list">
      <List
        onClick={() => setOpenPopup(!openPopup)}
        items={[
          {
            className: 'list__add-button',
            icon: <AiOutlinePlus />,
            name: 'Добавить список',
          },
        ]}
      />

      <Transition nodeRef={nodeRef} in={openPopup} timeout={duration}>
        {(state) => (
          <div
            className="default"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className="add-list__popup">
              <i onClick={onClose}>
                <SlArrowDown className="add-list__popup--close " />
              </i>

              <input
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
                className="field"
                type="text"
                placeholder="Название списка"
                name="list"
              ></input>
              <button onClick={addValue} className="add-list__popup--button">
                {isLoading ? 'Добавление...' : 'Добавить'}
              </button>

              <div className="add-list__popup--colors">
                {colors &&
                  colors.map((color) => {
                    return (
                      <Badge
                        onClick={() => setSelectedColor(color.id)}
                        key={color.id}
                        color={color.name}
                        className={selectedColor === color.id && 'round'}
                      />
                    );
                  })}
              </div>
              <ToastContainer
                position="top-end"
                className="p-3"
                style={{ zIndex: 5 }}
              >
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
                  <Toast.Body>Введите название списка</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          </div>
        )}
      </Transition>
    </section>
  );
};

export default AddList;
