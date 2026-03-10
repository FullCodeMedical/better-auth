import * as _better_auth_core0 from "@better-auth/core";
import { BetterAuthOptions, GenericEndpointContext } from "@better-auth/core";
import { Session, User } from "@better-auth/core/db";
import * as better_call0 from "better-call";

//#region src/plugins/custom-session/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "custom-session": {
      creator: typeof customSession;
    };
  }
}
type CustomSessionPluginOptions = {
  /**
   * This option is used to determine if the list-device-sessions endpoint should be mutated to the custom session data.
   * @default false
   */
  shouldMutateListDeviceSessionsEndpoint?: boolean | undefined;
};
declare const customSession: <Returns extends Record<string, any>, O extends BetterAuthOptions = BetterAuthOptions>(fn: (session: {
  user: User<O["user"], O["plugins"]>;
  session: Session<O["session"], O["plugins"]>;
}, ctx: GenericEndpointContext) => Promise<Returns>, options?: O | undefined, pluginOptions?: CustomSessionPluginOptions | undefined) => {
  id: "custom-session";
  hooks: {
    after: {
      matcher: (ctx: _better_auth_core0.HookEndpointContext) => boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<Awaited<Returns>[] | undefined>>;
    }[];
  };
  endpoints: {
    getSession: better_call0.Endpoint<"/get-session", "GET", undefined, {
      disableCookieCache?: string | boolean | undefined;
      disableRefresh?: boolean | undefined;
    } | undefined, any, Returns | null, {
      CUSTOM_SESSION: boolean;
      openapi: {
        description: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "array";
                  nullable: boolean;
                  items: {
                    $ref: string;
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
  };
  $Infer: {
    Session: Awaited<ReturnType<typeof fn>>;
  };
  options: CustomSessionPluginOptions | undefined;
};
//#endregion
export { CustomSessionPluginOptions, customSession };
//# sourceMappingURL=index.d.mts.map