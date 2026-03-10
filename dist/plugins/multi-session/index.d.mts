import { MULTI_SESSION_ERROR_CODES } from "./error-codes.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as _better_auth_core_utils_error_codes0 from "@better-auth/core/utils/error-codes";
import * as better_call0 from "better-call";

//#region src/plugins/multi-session/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "multi-session": {
      creator: typeof multiSession;
    };
  }
}
interface MultiSessionConfig {
  /**
   * The maximum number of sessions a user can have
   * at a time
   * @default 5
   */
  maximumSessions?: number | undefined;
}
declare const multiSession: (options?: MultiSessionConfig | undefined) => {
  id: "multi-session";
  endpoints: {
    /**
     * ### Endpoint
     *
     * GET `/multi-session/list-device-sessions`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.listDeviceSessions`
     *
     * **client:**
     * `authClient.multiSession.listDeviceSessions`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-list-device-sessions)
     */
    listDeviceSessions: better_call0.Endpoint<"/multi-session/list-device-sessions", "GET", undefined, Record<string, any> | undefined, any, {
      session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
      };
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      };
    }[], better_call0.EndpointMetadata | undefined, undefined>;
    /**
     * ### Endpoint
     *
     * POST `/multi-session/set-active`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.setActiveSession`
     *
     * **client:**
     * `authClient.multiSession.setActive`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-set-active)
     */
    setActiveSession: better_call0.Endpoint<"/multi-session/set-active", "POST", {
      sessionToken: string;
    }, Record<string, any> | undefined, any, {
      session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
      } & Record<string, any>;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & Record<string, any>;
    }, {
      openapi: {
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    session: {
                      $ref: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    /**
     * ### Endpoint
     *
     * POST `/multi-session/revoke`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.revokeDeviceSession`
     *
     * **client:**
     * `authClient.multiSession.revoke`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-revoke)
     */
    revokeDeviceSession: better_call0.Endpoint<"/multi-session/revoke", "POST", {
      sessionToken: string;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        session: Record<string, any> & {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          userId: string;
          expiresAt: Date;
          token: string;
          ipAddress?: string | null | undefined;
          userAgent?: string | null | undefined;
        };
        user: Record<string, any> & {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          email: string;
          emailVerified: boolean;
          name: string;
          image?: string | null | undefined;
        };
      };
    }>>], {
      status: boolean;
    }, {
      openapi: {
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    status: {
                      type: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
  };
  hooks: {
    after: {
      matcher: (context: _better_auth_core0.HookEndpointContext) => boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>;
    }[];
  };
  options: MultiSessionConfig | undefined;
  $ERROR_CODES: {
    INVALID_SESSION_TOKEN: _better_auth_core_utils_error_codes0.RawError<"INVALID_SESSION_TOKEN">;
  };
};
//#endregion
export { MULTI_SESSION_ERROR_CODES as ERROR_CODES, MultiSessionConfig, multiSession };
//# sourceMappingURL=index.d.mts.map