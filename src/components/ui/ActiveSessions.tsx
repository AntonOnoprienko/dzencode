import { SessionPointer } from '.';

interface Props {
  count: number;
}

export const ActiveSessions = ({ count }: Props) => {
  const isActive = count > 0;

  return (
    <div
      className="d-flex align-items-center gap-1"
      title="Active sessions in real-time"
    >
      <SessionPointer isActive={isActive} />
      {isActive ? (
        <span className="fw-semibold">{count}</span>
      ) : (
        <span
          className="spinner-border spinner-border-sm text-secondary"
          role="status"
        ></span>
      )}
    </div>
  );
};
