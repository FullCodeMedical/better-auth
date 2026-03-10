import * as _better_auth_core0 from "@better-auth/core";
import * as better_call0 from "better-call";

//#region src/plugins/oauth-proxy/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "oauth-proxy": {
      creator: typeof oAuthProxy;
    };
  }
}
interface OAuthProxyOptions {
  /**
   * The current URL of the application.
   * The plugin will attempt to infer the current URL from your environment
   * by checking the base URL from popular hosting providers,
   * from the request URL if invoked by a client,
   * or as a fallback, from the `baseURL` in your auth config.
   * If the URL is not inferred correctly, you can provide a value here."
   */
  currentURL?: string | undefined;
  /**
   * If a request in a production url it won't be proxied.
   *
   * default to `BETTER_AUTH_URL`
   */
  productionURL?: string | undefined;
  /**
   * Maximum age in seconds for the encrypted payload.
   * Payloads older than this will be rejected to prevent replay attacks.
   *
   * Keep this value short (e.g., 30-60 seconds) to minimize the window
   * for potential replay attacks while still allowing normal OAuth flows.
   *
   * @default 60 (1 minute)
   */
  maxAge?: number | undefined;
}
declare const oAuthProxy: <O extends OAuthProxyOptions>(opts?: O) => {
  id: "oauth-proxy";
  options: NoInfer<O>;
  endpoints: {
    oAuthProxy: better_call0.Endpoint<"/oauth-proxy-callback", "GET", undefined, {
      callbackURL: string;
      profile?: string | undefined;
    }, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>], never, {
      openapi: {
        operationId: string;
        description: string;
        parameters: ({
          in: "query";
          name: string;
          required: true;
          description: string;
        } | {
          in: "query";
          name: string;
          required: false;
          description: string;
        })[];
        responses: {
          302: {
            description: string;
            headers: {
              Location: {
                description: string;
                schema: {
                  type: string;
                };
              };
            };
          };
        };
      };
    }, undefined>;
  };
  hooks: {
    before: {
      matcher(context: _better_auth_core0.HookEndpointContext): boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>;
    }[];
    after: {
      matcher(context: _better_auth_core0.HookEndpointContext): boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>;
    }[];
  };
};
//#endregion
export { OAuthProxyOptions, oAuthProxy };
//# sourceMappingURL=index.d.mts.map