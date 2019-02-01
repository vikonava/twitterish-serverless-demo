import AWS from 'aws-sdk';
import uuid from 'uuid';

import Response from '../../lib/Response';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  try {
    const result = await dynamoDb.query({
      TableName: `${process.env.tablePrefix}-Comments`,
      KeyConditionExpression: "#visible = :visible",
      ExpressionAttributeNames: {
        "#visible": "visible",
      },
      ExpressionAttributeValues: {
        ":visible": 1,
      },
      ScanIndexForward: false,
      Limit: 20,
    }).promise();
    
    callback(null, Response.success(result.Items));
  } catch (error) {
    console.log(error);

    callback(null, Response.failure());
  }
};
