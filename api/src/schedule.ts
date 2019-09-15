import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import * as moment from 'moment-timezone';
import 'source-map-support/register';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { duration } = event.pathParameters;
  let eventId = '';

  switch (duration) {
    case '15m':
      eventId = process.env.MEETING_15M_ID;
      break;
    case '30m':
      eventId = process.env.MEETING_30M_ID;
      break;
    case '1h':
    case '1hr':
      eventId = process.env.MEETING_1HR_ID
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

  const response = await axios.post(process.env.CREATE_MEETING_ENDPOINT, {
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
  });

  return {
    statusCode: response.status,
    headers: {
      ...response.headers,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(response.data),
  };
}
