import { StackContext, Api } from "@serverless-stack/resources";

export function ApiStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    cors: {
      allowOrigins: ['*'],
      allowMethods: ['GET'],
    },
    routes: {
      "GET /stations": "functions/getStations.handler",
      "GET /station/{id}": "functions/getTimetable.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
