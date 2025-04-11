import WeeklyTimetable from '@/components/timetable/WeeklyTimetable';
import DailyTimetable from '@/components/timetable/DailyTimetable';

export default function TimetablePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your weekly and daily class schedule.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyTimetable />
        </div>
        <div>
          <DailyTimetable />
        </div>
      </div>
    </div>
  );
}
