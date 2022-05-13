import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack }: StackContext) {
  const api = use(ApiStack);

  const site = new ViteStaticSite(stack, 'site', {
    path: 'frontend',
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
};
