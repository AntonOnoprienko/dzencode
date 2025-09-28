import { ProductsList } from '@/components/shared/ProductsList';
import { prisma } from '../../../prisma/prisma.client';

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    include: {
      order: true,
    },
  });

  return <ProductsList items={products} />;
};

export default ProductsPage;
