import { OrdersList } from '@/components/shared';
import { prisma } from '../../../prisma/prisma.client';

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({ include: { products: true } });
  return <OrdersList items={orders} />;
};

export default OrdersPage;
