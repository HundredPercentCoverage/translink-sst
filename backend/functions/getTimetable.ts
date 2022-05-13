import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { xml2json } from 'xml-js';
import fetch from "node-fetch";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Station ID missing" }),
    };
  }

  const xmlData = await fetch(`https://apis.opendatani.gov.uk/translink/${event.pathParameters.id}.xml`);
  const xmlAsText = await xmlData.text();
  const jsonData = JSON.parse(
    xml2json(xmlAsText, {
      compact: true,
      textKey: "_",
      attributesKey: "$",
      commentKey: "value"
    })
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  };
};
