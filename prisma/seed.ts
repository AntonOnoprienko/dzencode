import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Очистка таблиц (удаляем продукты и заказы)
  await prisma.product.deleteMany({});
  await prisma.order.deleteMany({});

  // 2️⃣ Данные для сидирования
  const ordersData = [
    {
      title: 'Order 1',
      description: 'desc',
      date: new Date('2017-06-29T12:09:33'),
    },
    {
      title: 'Order 2',
      description: 'desc',
      date: new Date('2017-06-29T12:09:33'),
    },
    {
      title: 'Order 3',
      description: 'desc',
      date: new Date('2017-06-29T12:09:33'),
    },
  ];

  for (const orderData of ordersData) {
    const order = await prisma.order.create({
      data: {
        ...orderData,
        products: {
          create: productsForOrder(orderData.title),
        },
      },
    });
    console.log(`Created order: ${order.title}`);
  }
}

function productsForOrder(orderTitle: string) {
  const productsData = [
    {
      serialNumber: 1234,
      isNew: true,
      photo: '/assets/monitor.avif', // ✅ поменял на валидный путь
      title: 'Product 1',
      type: 'Monitors',
      specification: 'Specification 1',
      guaranteeStart: new Date('2017-06-29T12:09:33'),
      guaranteeEnd: new Date('2017-06-29T12:09:33'),
      priceUSD: 100,
      priceUAH: 2600,
      date: new Date('2017-06-29T12:09:33'),
    },
    {
      serialNumber: 1235,
      isNew: true,
      photo: '/assets/monitor.avif', // ✅ валидный путь
      title: 'Product 2',
      type: 'Monitors',
      specification: 'Specification 1',
      guaranteeStart: new Date('2017-06-29T12:09:33'),
      guaranteeEnd: new Date('2017-06-29T12:09:33'),
      priceUSD: 150,
      priceUAH: 3900,
      date: new Date('2017-06-29T12:09:33'),
    },
  ];

  if (orderTitle === 'Order 1') return [productsData[0]];
  if (orderTitle === 'Order 2') return [productsData[1]];
  if (orderTitle === 'Order 3') return [...productsData];
  return [];
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
