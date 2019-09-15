import AWSXRay from 'aws-xray-sdk';
import http from 'http';
import https from 'https';
import Winston from 'winston';
import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import * as moment from 'moment-timezone';
import 'source-map-support/register';

const EVENT_IDS = {
  '15m': process.env.MEETING_15M_ID,
  '30m': process.env.MEETING_30M_ID,
  '1hr': process.env.MEETING_1HR_ID,
};

export const availability: APIGatewayProxyHandler = async (event, _context) => {
  AWSXRay.setLogger(Winston);
  AWSXRay.captureHTTPsGlobal(http);
  AWSXRay.captureHTTPsGlobal(https);


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
    process.env.AVAILABILITY_ENDPOINT.replace('EVENT_ID', eventId),
    {
      params: requestParams,
    });

  return {
    statusCode: response.status,
    headers: {
      'Access-Control-Allow-Origin': 'https://hmm.dev',
      ...response.headers
    },
    body: JSON.stringify({
      params: requestParams,
      days: response.data.days,
      env: process.env,
    }),
  };
}

export const schedule: APIGatewayProxyHandler = async (event, _context) => {
  AWSXRay.setLogger(Winston);
  AWSXRay.captureHTTPsGlobal(http);
  AWSXRay.captureHTTPsGlobal(https);


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
  })

  return {
    statusCode: response.status,
    headers: {
      'Access-Control-Allow-Origin': 'https://hmm.dev',
      ...response.headers
    },
    body: JSON.stringify(response.data),
  };
}
