import AWS from 'aws-sdk';
import uuid from 'uuid';

import RequestContext from '../../lib/RequestContext';
import Response from '../../lib/Response';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // Retrieve User Attributes
  const reqContext = new RequestContext(event.requestContext);
  const user = await reqContext.getUserAttributes();

  if (!user) {
    callback(null, Response.failure());
  }

  // Send Create Request
  try {
    const item = {
      id: uuid.v1(),
      userId: user.sub,
      username: user.Username,
      text: data.text,
      visible: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await dynamoDb.put({
      TableName: `${process.env.tablePrefix}-Comments`,
      Item: item,
    }).promise();

    callback(null, Response.success(item));
  } catch (error) {
    console.log(error);

    callback(null, Response.failure());
  }
};
