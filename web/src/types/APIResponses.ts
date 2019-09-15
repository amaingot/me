export interface AvalibilityResponse {
  availability_timezone: string;
  days: DayAvaliability[];
  diagnostic_data?: object;
  today: string;
}

enum AvalibilityStatus {
  AVALIABLE = 'available',
  UNAVALIABLE = 'unavailable',
}
enum Meridiem {
  AM = 'am',
  PM = 'pm',
}

interface DayAvaliability {
  date: string;
  spots: TimeSlot[];
  status: AvalibilityStatus;
}

export interface TimeSlot {
  meridiem: Meridiem;
  start_time: string;
  status: AvalibilityStatus;
}

export interface ScheduleResponse {
  event: {
    id: number;
    start_time: string;
    end_time: string;
    name: string;
    location: string | null;
    invitee: {
      id: string;
      full_name: string;
      email: string;
      timezone: string;
      uuid: string;
      first_name: string | null;
      last_name: string | null;
      locale: string;
      time_notation: string;
      phone_number: null;
      event_start: string;
      event_end: string;
      gcalendar_event_url: string;
      icalendar_event_url: string;
      signup_path: string;
    }
  }
}