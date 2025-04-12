# College Website - Modern React Application

This is a comprehensive college website built with Next.js, React, and Tailwind CSS. It features a modern design and multiple modules to provide students with a complete digital campus experience.

## Features

- **Dashboard**: Overview of academic activities and upcoming events
- **AI Tutor**: AI-powered tutoring system for personalized learning assistance
- **Attendance System**: Track and manage attendance records
- **Academics Module**: Access course materials, assignments, and grades
- **Events System**: Browse and register for campus events
- **Timetable**: View and manage class schedules
- **Canteen**: Browse menu items and place food orders

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Custom authentication system (can be replaced with a more robust solution)
- **UI Components**: Custom components built with Tailwind

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Clone the repository:
git clone https://github.com/yourusername/college-website.git
cd college-website

2. Install dependencies:
npm install

yarn install

3. Create a `.env.local` file in the root directory and add your environment variables:
OPENAI_API_KEY=your_openai_api_key_here

4. Start the development server:
npm run dev

yarn dev
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
college-website/
├── src/
│   ├── app/                   # Next.js app router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── ai-tutor/          # AI tutor pages
│   │   ├── api/               # API routes
│   │   └── [other pages]      # Other Next.js pages
│   ├── components/            # React components
│   │   ├── academics/         # Academic components
│   │   ├── ai-tutor/          # AI tutor components
│   │   ├── attendance/        # Attendance components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── events/            # Event components
│   │   ├── timetable/         # Timetable components
│   │   └── ui/                # Reusable UI components
│   ├── models/                # Database models
│   ├── utils/                 # Utility functions
│   │   ├── academicsData.ts   # Academic mock data
│   │   ├── attendanceData.ts  # Attendance data
│   │   ├── eventsData.ts      # Events data
│   │   ├── mockAuth.ts        # Mock authentication
│   │   └── timetableData.ts   # Timetable data
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind CSS config
└── package.json               # Project dependencies
```


## Deployment

This application can be deployed on Vercel, Netlify, or any other Next.js compatible hosting platform.

To deploy on Vercel:

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy

## Future Enhancements

- Integration with real backend APIs and databases
- User authentication with JWT or OAuth
- Mobile app version with React Native
- Push notifications for events and deadlines
- Real-time chat for student-faculty communication

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)