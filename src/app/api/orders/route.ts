import { NextResponse } from 'next/server';

const orders = [
  { id: 1, title: 'Order 1', date: '2017-06-29', description: 'desc' },
  { id: 2, title: 'Order 2', date: '2017-06-29', description: 'desc' },
];

export async function GET() {
  return NextResponse.json(orders);
}
