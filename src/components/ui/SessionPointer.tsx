export const SessionPointer = ({ isActive }: { isActive: boolean }) => {
  return (
    <div
      className={`rounded-circle me-2`}
      style={{
        width: '12px',
        height: '12px',
        backgroundColor: isActive ? 'green' : 'gray',
      }}
    ></div>
  );
};
