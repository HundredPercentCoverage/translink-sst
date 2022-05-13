import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import stations from '../stations';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const res = JSON.stringify(stations);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: res,
  };
}
