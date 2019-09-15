import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import * as moment from 'moment-timezone';
import 'source-map-support/register';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { duration } = event.pathParameters;
  const { queryStringParameters: query } = event;
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
        statusCode: 404,
        body: JSON.stringify({
          message: 'Path not found'
        })
      }
  }

  if (query.tz && !moment().tz(query.tz).tz()) {
    console.error("Invalid timezone format: ", query.tz);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid timezone format',
      }),
    };
  }

  const parsedDate = moment(query.date);
  if (query.date && !parsedDate.isValid()) {
    console.error("Invalid date format: ", query.date);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid date',
      }),
    };
  } else if (moment(moment().format('YYYY-MM-DD')).isAfter(parsedDate, 'day')) {
    console.error("Date in the past: ", query.date);
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

  console.log("Sending request: ", JSON.stringify(requestParams, null, 2));

  const response = await axios.get(
    process.env.AVAILABILITY_ENDPOINT.replace('EVENT_ID', eventId),
    {
      params: requestParams,
    });

  const result = {
    statusCode: response.status,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      days: response.data.days,
    }),
  };

  console.log("Result: ", result);
  return result;
}