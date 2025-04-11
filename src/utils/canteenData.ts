// Types for canteen data
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    isVegetarian: boolean;
    isAvailable: boolean;
    preparationTime: number; // in minutes
  }
  
  export interface Category {
    id: string;
    name: string;
    description: string;
  }
  
  export interface CartItem {
    menuItemId: string;
    quantity: number;
  }
  
  export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  
  export interface Order {
    id: string;
    items: {
      menuItemId: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    totalAmount: number;
    orderDate: string;
    status: OrderStatus;
    estimatedReadyTime?: string;
  }
  
  // Categories
  export const categories: Category[] = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      description: 'Start your day with our energizing breakfast options',
    },
    {
      id: 'lunch',
      name: 'Lunch',
      description: 'Delicious lunch options to fuel your afternoon',
    },
    {
      id: 'snacks',
      name: 'Snacks',
      description: 'Quick bites for those in-between hunger pangs',
    },
    {
      id: 'beverages',
      name: 'Beverages',
      description: 'Refreshing drinks to quench your thirst',
    },
  ];
  
  // Menu items
  export const menuItems: MenuItem[] = [
    {
      id: 'item1',
      name: 'Masala Dosa',
      description: 'South Indian crepe filled with spiced potatoes',
      price: 80,
      image: 'https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?q=80&w=2475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'breakfast',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 15,
    },
    {
      id: 'item2',
      name: 'Poha',
      description: 'Flattened rice with vegetables and spices',
      price: 50,
      image: 'https://media.istockphoto.com/id/1093261264/photo/aloo-kanda-poha-or-tarri-pohe-with-spicy-chana-masala-curry-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=cGs-JADB3TeV2If6yx7YNp7OoAFkcrQHlZkVKInTBPc=',
      category: 'breakfast',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 10,
    },
    {
      id: 'item3',
      name: 'Sandwich',
      description: 'Grilled vegetable sandwich with cheese',
      price: 70,
      image: 'https://media.istockphoto.com/id/1328164559/photo/veg-grilled-sandwich.webp?a=1&b=1&s=612x612&w=0&k=20&c=IBfcvfvBp6KnM0eOmhvDCOJVeRjx7tXgXQ8VYFWxou0=',
      category: 'breakfast',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 12,
    },
    {
      id: 'item4',
      name: 'Veg Thali',
      description: 'Complete meal with roti, rice, dal, sabzi, and dessert',
      price: 120,
      image: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhbGl8ZW58MHx8MHx8fDA%3D',
      category: 'lunch',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 20,
    },
    {
      id: 'item5',
      name: 'Chicken Biryani',
      description: 'Aromatic rice dish with tender chicken pieces',
      price: 150,
      image: 'https://media.istockphoto.com/id/1058029096/photo/chicken-biryani.webp?a=1&b=1&s=612x612&w=0&k=20&c=jjPwycS_qHz52KYp4sNBXRy9gl6k4L8KXsN8b9En9fs=',
      category: 'lunch',
      isVegetarian: false,
      isAvailable: true,
      preparationTime: 25,
    },
    {
      id: 'item6',
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in rich tomato gravy',
      price: 140,
      image: 'https://media.istockphoto.com/id/1305516669/photo/shahi-paneer-or-paneer-kadai.webp?a=1&b=1&s=612x612&w=0&k=20&c=6FZjTED4AMVhUlQ6-fM__MMSds-h18jj7qFuZRKqFsk=',
      category: 'lunch',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 18,
    },
    {
      id: 'item7',
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes',
      price: 25,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftb3NhfGVufDB8fDB8fHww',
      category: 'snacks',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 5,
    },
    {
      id: 'item8',
      name: 'French Fries',
      description: 'Crispy potato fries with ketchup',
      price: 60,
      image: 'https://media.istockphoto.com/id/1218213212/photo/homemade-french-fries-with-ketchup-and-mayonnaise-on-rustic-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=QYwXP0-whoz7Cni7CXNfIyT_pOcRpZUYHqkTYH4MEhA=',
      category: 'snacks',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 8,
    },
    {
      id: 'item9',
      name: 'Vada Pav',
      description: 'Spicy potato fritter in a bun',
      price: 35,
      image: 'https://media.istockphoto.com/id/1329212743/photo/vada-pav.webp?a=1&b=1&s=612x612&w=0&k=20&c=NoMHls-67EbxQXyJ1WgLgtAbnoYhJnUNKzHpL3EhyDE=',
      category: 'snacks',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 5,
    },
    {
      id: 'item10',
      name: 'Masala Chai',
      description: 'Spiced Indian tea',
      price: 20,
      image: 'https://media.istockphoto.com/id/1482828620/photo/clay-tea-cup-being-hold-in-the-hand.webp?a=1&b=1&s=612x612&w=0&k=20&c=4o04J51HDfPkNtOeLnHoWZz4VI7QtKj6QlaY24c40xs=',
      category: 'beverages',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 5,
    },
    {
      id: 'item11',
      name: 'Cold Coffee',
      description: 'Chilled coffee with ice cream',
      price: 70,
      image: 'https://media.istockphoto.com/id/1324007808/photo/dalgona-coffee-with-coffee-beans-on-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=IJaDxwL_asxTI6jX1ldUpWjmYOfnJcuMgaUxfPYpWXI=',
      category: 'beverages',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 8,
    },
    {
      id: 'item12',
      name: 'Fresh Lime Soda',
      description: 'Refreshing lime-based drink',
      price: 40,
      image: 'https://media.istockphoto.com/id/680195000/photo/a-glass-of-gin-tonic-cocktail-drink-with-ice-cubes-and-a-slice-of-lime.webp?a=1&b=1&s=612x612&w=0&k=20&c=rnBj6sOioW2RjDRxoHq3j8wqgsWIwXQu2nF68VJqxck=',
      category: 'beverages',
      isVegetarian: true,
      isAvailable: true,
      preparationTime: 3,
    },
  ];
  
  // Sample order history
  export const orderHistory: Order[] = [
    {
      id: 'ORD12345',
      items: [
        {
          menuItemId: 'item4',
          name: 'Veg Thali',
          price: 120,
          quantity: 1,
        },
        {
          menuItemId: 'item10',
          name: 'Masala Chai',
          price: 20,
          quantity: 1,
        },
      ],
      totalAmount: 140,
      orderDate: '2025-04-10T12:30:00',
      status: 'completed',
    },
    {
      id: 'ORD12346',
      items: [
        {
          menuItemId: 'item5',
          name: 'Chicken Biryani',
          price: 150,
          quantity: 1,
        },
        {
          menuItemId: 'item11',
          name: 'Cold Coffee',
          price: 70,
          quantity: 1,
        },
      ],
      totalAmount: 220,
      orderDate: '2025-04-11T13:15:00',
      status: 'ready',
      estimatedReadyTime: '2025-04-11T13:40:00',
    },
    {
      id: 'ORD12347',
      items: [
        {
          menuItemId: 'item7',
          name: 'Samosa',
          price: 25,
          quantity: 2,
        },
        {
          menuItemId: 'item10',
          name: 'Masala Chai',
          price: 20,
          quantity: 1,
        },
      ],
      totalAmount: 70,
      orderDate: '2025-04-11T16:45:00',
      status: 'pending',
    },
  ];
  
  // Helper functions
  export const getMenuItemById = (id: string): MenuItem | undefined => {
    return menuItems.find(item => item.id === id);
  };
  
  export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
    return menuItems.filter(item => item.category === categoryId && item.isAvailable);
  };
  
  export const getCategoryById = (id: string): Category | undefined => {
    return categories.find(category => category.id === id);
  };
  
  export const calculateCartTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, cartItem) => {
      const menuItem = getMenuItemById(cartItem.menuItemId);
      return total + (menuItem ? menuItem.price * cartItem.quantity : 0);
    }, 0);
  };
  
  export const formatPrice = (price: number): string => {
    return `₹${price.toFixed(2)}`;
  };
  
  export const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-indigo-100 text-indigo-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  