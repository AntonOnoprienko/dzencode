'use client';

import '@/styles/components/delete-order-modal.scss';
import { Button, Modal } from 'react-bootstrap';
import { ProductItem } from '.';
import { Order } from '@/types';
import { Trash, X } from 'react-bootstrap-icons';

interface Props {
  order: Order | null;
  show: boolean;
  onHide: () => void;
  onDelete: (id: number) => void;
}

export const DeleteOrderModal: React.FC<Props> = ({
  order,
  show,
  onHide,
  onDelete,
}) => {
  if (!order) return null;

  return (
    <Modal className="delete-order-modal" show={show} onHide={onHide} centered>
      <button className="delete-order-modal__close-button" onClick={onHide}>
        <X size={20} />
      </button>

      <Modal.Header>
        <Modal.Title>Вы точно хотите удалить этот приход?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          {order.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isShort
              isHideDelete
            />
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button className="btn-secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onDelete(order.id);
            onHide();
          }}
        >
          <Trash size={12} color="gray" /> <span>Удалить</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
