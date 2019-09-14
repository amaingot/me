import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import * as moment from 'moment-timezone';
import 'source-map-support/register';

const EVENT_IDS = {
  '15m': 'AFAE7F7AVAJWGFUO',
  '30m': 'EFGF2C4GQGKQHAQQ',
  '1hr': 'FHDF3C4GVDJWEAR7'
};

export const availability: APIGatewayProxyHandler = async (event, _context) => {
  const { duration } = event.pathParameters;
  const { queryStringParameters: query } = event;
  let eventId = '';

  switch (duration) {
    case '15m':
      eventId = EVENT_IDS['15m'];
      break;
    case '30m':
      eventId = EVENT_IDS['30m'];
      break;
    case '1h':
    case '1hr':
      eventId = EVENT_IDS['1hr'];
      break;
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Path not found'
        })
      }
  }

  if (query.tz && !moment().tz(query.tz).tz()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid timezone format',
      }),
    };
  }

  const parsedDate = moment(query.date);
  if (query.date && !parsedDate.isValid()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid date',
      }),
    };
  } else if (moment(moment().format('YYYY-MM-DD')).isAfter(parsedDate, 'day')) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Date is in the past',
      }),
    };
  }

  const {
    tz = 'America/Chicago',
    date = moment().format('YYYY-MM-DD'),
  } = query;

  const start = moment(date);
  const end = moment(start).date(1).add(1, 'month').subtract(1, 'day');

  const requestParams = {
    timezone: moment().tz(tz).tz(),
    diagnostics: false,
    range_start: start.format('YYYY-MM-DD'),
    range_end: end.format('YYYY-MM-DD'),
  }

  const response = await axios.get(
    `https://calendly.com/api/booking/event_types/${eventId}/calendar/range`,
    {
      params: requestParams,
    });

  return {
    statusCode: response.status,
    headers: response.headers,
    body: JSON.stringify({
      params: requestParams,
      days: response.data.days
    }),
  };
}

export const schedule: APIGatewayProxyHandler = async (event, _context) => {
  const { duration } = event.pathParameters;
  let eventId = '';

  switch (duration) {
    case '15m':
      eventId = EVENT_IDS['15m'];
      break;
    case '30m':
      eventId = EVENT_IDS['30m'];
      break;
    case '1h':
    case '1hr':
      eventId = EVENT_IDS['1hr'];
      break;
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Path not found'
        })
      }
  }

  const {
    slot, name, email, tz
  } = JSON.parse(event.body);

  const timezone = moment().tz(tz).tz() || 'America/Chicago';
  if (tz && !moment().tz(tz).tz()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid timezone format',
      }),
    };
  }

  const parsedSlot = moment(slot);
  if (!slot || !parsedSlot.isValid()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid format for slot, must be in a valid ISO 8601 or RFC 2822 Date time format'
      })
    };
  }

  if (!name || typeof name !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid name, must be a string'
      })
    };
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid email format'
      })
    };
  }

  const response = await axios.post('https://calendly.com/api/booking/invitees', {
    event_type_uuid: eventId,
    event: {
      start_time: parsedSlot,
      location: ''
    },
    invitee: {
      timezone: timezone,
      time_notation: '12h',
      full_name: name,
      email: email
    },
  })

  return {
    statusCode: response.status,
    headers: response.headers,
    body: JSON.stringify(response.data),
  };
}
