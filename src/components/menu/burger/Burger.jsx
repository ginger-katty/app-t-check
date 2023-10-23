import React from 'react';

const Burger = ({ menuActive, setmenuActive }) => {
  return (
    <nav className="w-100 bg-body  ">
      <div
        className={menuActive ? 'burger-btn action' : 'burger-btn'}
        onClick={() => setmenuActive(!menuActive)}
      >
        <span></span>
      </div>
    </nav>
  );
};

export default Burger;
