"use client";
import { orderHistory, formatPrice, getStatusColor } from '@/utils/canteenData';

export default function OrderHistory() {
  // Format date and time
  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {orderHistory.map((order) => (
          <li key={order.id}>
            <div className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">Order #{order.id}</p>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="text-sm text-gray-700 font-medium">{formatPrice(order.totalAmount)}</p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {order.items.map(item => item.name).join(', ')}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <p>
                      Ordered on <time dateTime={order.orderDate}>{formatDateTime(order.orderDate)}</time>
                    </p>
                  </div>
                </div>
                
                {order.status === 'ready' && order.estimatedReadyTime && (
                  <div className="mt-2 bg-green-50 p-2 rounded-md">
                    <p className="text-sm text-green-700">
                      Your order is ready for pickup! Estimated ready time: {formatDateTime(order.estimatedReadyTime)}
                    </p>
                  </div>
                )}
                
                {order.status === 'pending' && (
                  <div className="mt-2 bg-yellow-50 p-2 rounded-md">
                    <p className="text-sm text-yellow-700">
                      Your order is being processed. We'll notify you when it's confirmed.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
