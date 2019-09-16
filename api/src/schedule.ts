import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import * as moment from 'moment-timezone';
import 'source-map-support/register';

const headers = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': 'https://hmm.dev',
};

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { duration } = event.pathParameters;
  let eventId = '';

  switch (duration) {
    case '15m':
      console.log("Duration is 15 minutes");
      eventId = process.env.MEETING_15M_ID;
      break;
    case '30m':
      console.log("Duration is 30 minutes");
      eventId = process.env.MEETING_30M_ID;
      break;
    case '1h':
    case '1hr':
      console.log("Duration is 1 hour");
      eventId = process.env.MEETING_1HR_ID;
      break;
    default:
      console.error("Incorrect duration specified: ", duration);
      return {
        headers,
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
    console.error("Invalid timezone format: ", tz);
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid timezone format',
      }),
    };
  }

  const parsedSlot = moment(slot);
  if (!slot || !parsedSlot.isValid()) {
    console.error("Invalid date format for 'slot': ", slot);
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid format for slot, must be in a valid ISO 8601 or RFC 2822 Date time format'
      })
    };
  }

  if (!name || typeof name !== 'string') {
    console.error("Invalid name format: ", name);
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid name, must be a string'
      })
    };
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Invalid email format: ", email);
    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid email format'
      })
    };
  }

  const requestData = {
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
  };

  console.log("Sending request: ", JSON.stringify(requestData, null, 2));

  const response = await axios.post(process.env.CREATE_MEETING_ENDPOINT, requestData);

  console.log("Recieved response: ", JSON.stringify({
    status: response.status,
    statusText: response.statusText,
    data: response.data,
    header: response.headers,
  }, null, 2));

  const result = {
    statusCode: response.status,
    headers,
    body: JSON.stringify(response.data),
  };

  console.log("Result: ", result);
  return result;
}
