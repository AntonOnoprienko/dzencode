import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
}

export const AddButton: React.FC<Props> = ({ size = 'medium', ...props }) => {
  const sizeMap = {
    small: 30,
    medium: 50,
    large: 70,
  };

  const buttonSize = sizeMap[size];
  const plusSize = buttonSize / 3;

  const buttonStyle: React.CSSProperties = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: '50%',
    backgroundColor: '#19bd3fff',
    border: '3px solid #128e2fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: plusSize,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
    transition: 'all 0.2s ease',
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: '#218838',
    border: '2px solid #1c7430',
    boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
  };

  const [hover, setHover] = React.useState(false);

  return (
    <button
      {...props}
      style={{ ...buttonStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      +
    </button>
  );
};
