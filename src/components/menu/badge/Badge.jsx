import React from 'react';
import classNames from 'classnames';
const Badge = ({ color,onClick, className }) => (
  <i
    onClick={onClick}
    className={classNames('badg', { [`badg--${color}`]: color }, className)}
  ></i>
);

export default Badge;
