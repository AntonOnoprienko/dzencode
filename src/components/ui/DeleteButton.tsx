import { Trash } from 'react-bootstrap-icons';

export const DeleteButton = ({
  onClick,
}: {
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <button className="btn btn-link" onClick={handleClick}>
      <Trash size={12} color="gray" />
    </button>
  );
};
