export interface CalendlyAvalibility {
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