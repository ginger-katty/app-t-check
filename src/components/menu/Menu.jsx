import React, { useState, useEffect } from 'react';
import { CiGrid31 } from 'react-icons/ci';
import List from './List';
import AddList from './addlist/AddList';
import axios from 'axios';

const Menu = ({
  active,
  setActive,
  lists,
  setLists,
  activeList,
  setActiveList,
  onAddList,
  navigate,
}) => {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/colors').then((response) => {
      setColors(response.data);
    });
  }, []);

  return (
    <div
      className={active ? 'menu full' : 'menu'}
      onClick={() => setActive(false)}
    >
      <div className="blur" />
      <div className="menu__content" onClick={(e) => e.stopPropagation()}>
        <List
          onClickLi={(list) => {
            navigate('/');
          }}
          items={[
            {
              icon: <CiGrid31 />,
              name: 'Главный экран',
              active: !activeList,
            },
          ]}
        />
        <span className="menu__title">Списки задач</span>
        {lists ? (
          <List
            onClickLi={(list) => {
              navigate(`/lists/${list.id}`);
            }}
            items={lists}
            onRemove={(id) => {
              const newLists = lists.filter((item) => item.id !== id);
              setLists(newLists);
            }}
            isRemovable
            activeList={activeList}
          />
        ) : (
          'Загрузка...'
        )}

        <AddList onAdd={onAddList} colors={colors} />
      </div>
    </div>
  );
};

export default Menu;
