import { Prettify } from "../../types/helper.mjs";
import { Session as Session$1, User as User$1 } from "../../types/models.mjs";
import "../../types/index.mjs";
import { BetterAuthOptions, GenericEndpointContext } from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import * as better_call0 from "better-call";

//#region src/api/routes/session.d.ts
declare const getSession: <Option extends BetterAuthOptions>() => better_call0.Endpoint<"/get-session", ("GET" | "POST")[], undefined, {
  disableCookieCache?: unknown;
  disableRefresh?: unknown;
} | undefined, [], {
  session: Session$1<Option["session"], Option["plugins"]>;
  user: User$1<Option["user"], Option["plugins"]>;
} | null, {
  openapi: {
    operationId: string;
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              nullable: boolean;
              properties: {
                session: {
                  $ref: string;
                };
                user: {
                  $ref: string;
                };
              };
              required: string[];
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const getSessionFromCtx: <U extends Record<string, any> = Record<string, any>, S extends Record<string, any> = Record<string, any>>(ctx: GenericEndpointContext, config?: {
  disableCookieCache?: boolean;
  disableRefresh?: boolean;
} | undefined) => Promise<{
  session: S & Session$1;
  user: U & User$1;
} | null>;
/**
 * The middleware forces the endpoint to require a valid session.
 */
declare const sessionMiddleware: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>;
/**
 * This middleware forces the endpoint to require a valid session and ignores cookie cache.
 * This should be used for sensitive operations like password changes, account deletion, etc.
 * to ensure that revoked sessions cannot be used even if they're still cached in cookies.
 */
declare const sensitiveSessionMiddleware: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>;
/**
 * This middleware allows you to call the endpoint on the client if session is valid.
 * However, if called on the server, no session is required.
 */
declare const requestOnlySessionMiddleware: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  } | null;
}>>;
/**
 * This middleware forces the endpoint to require a valid session,
 * as well as making sure the session is fresh before proceeding.
 *
 * Session freshness check will be skipped if the session config's freshAge
 * is set to 0
 */
declare const freshSessionMiddleware: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>;
/**
 * user active sessions list
 */
declare const listSessions: <Option extends BetterAuthOptions>() => better_call0.Endpoint<"/list-sessions", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], Prettify<{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
} & _better_auth_core_db0.InferDBFieldsFromOptions<Option["session"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"session", Option["plugins"]> extends infer T ? { [K in keyof T]: T[K] } : never>[], {
  openapi: {
    operationId: string;
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "array";
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
/**
 * revoke a single session
 */
declare const revokeSession: better_call0.Endpoint<"/revoke-session", "POST", {
  token: string;
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
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object";
            properties: {
              token: {
                type: string;
                description: string;
              };
            };
            required: string[];
          };
        };
      };
    };
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              properties: {
                status: {
                  type: string;
                  description: string;
                };
              };
              required: string[];
            };
          };
        };
      };
    };
  };
}, undefined>;
/**
 * revoke all user sessions
 */
declare const revokeSessions: better_call0.Endpoint<"/revoke-sessions", "POST", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              properties: {
                status: {
                  type: string;
                  description: string;
                };
              };
              required: string[];
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const revokeOtherSessions: better_call0.Endpoint<"/revoke-other-sessions", "POST", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              properties: {
                status: {
                  type: string;
                  description: string;
                };
              };
              required: string[];
            };
          };
        };
      };
    };
  };
}, undefined>;
//#endregion
export { freshSessionMiddleware, getSession, getSessionFromCtx, listSessions, requestOnlySessionMiddleware, revokeOtherSessions, revokeSession, revokeSessions, sensitiveSessionMiddleware, sessionMiddleware };
//# sourceMappingURL=session.d.mts.map