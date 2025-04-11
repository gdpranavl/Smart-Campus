import OrderHistory from '@/components/canteen/OrderHistory';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your recent orders and track their status.
        </p>
      </div>
      
      <div className="mb-6">
        <OrderHistory />
      </div>
    </div>
  );
}
