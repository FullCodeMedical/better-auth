import { BetterAuthDBSchema, ModelNames, SecondaryStorage } from "../db/type.mjs";
import { DBAdapter } from "../db/adapter/index.mjs";
import { createLogger } from "../env/logger.mjs";
import "../db/index.mjs";
import { AuthContext } from "../types/context.mjs";
import "../types/index.mjs";
import { OAuthProvider } from "../oauth2/oauth-provider.mjs";
import "../oauth2/index.mjs";
import * as better_call0 from "better-call";
import { Endpoint, EndpointContext, EndpointMetadata, HTTPMethod, Middleware, ResolveBodyInput, ResolveErrorInput, ResolveMetaInput, ResolveQueryInput, StandardSchemaV1 } from "better-call";
import * as _better_auth_core0 from "@better-auth/core";

//#region src/api/index.d.ts
declare const optionsMiddleware: Middleware<(inputContext: Record<string, any>) => Promise<AuthContext>>;
declare const createAuthMiddleware: {
  <R>(options: {
    use?: Middleware[];
  }, handler: (ctx: better_call0.MiddlewareContext<{
    returned?: unknown | undefined;
    responseHeaders?: Headers | undefined;
  } & _better_auth_core0.PluginContext<_better_auth_core0.BetterAuthOptions> & _better_auth_core0.InfoContext & {
    options: _better_auth_core0.BetterAuthOptions;
    trustedOrigins: string[];
    trustedProviders: string[];
    isTrustedOrigin: (url: string, settings?: {
      allowRelativePaths: boolean;
    }) => boolean;
    oauthConfig: {
      skipStateCookieCheck?: boolean | undefined;
      storeStateStrategy: "database" | "cookie";
    };
    newSession: {
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
    } | null;
    session: {
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
    } | null;
    setNewSession: (session: {
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
    } | null) => void;
    socialProviders: OAuthProvider[];
    authCookies: _better_auth_core0.BetterAuthCookies;
    logger: ReturnType<typeof createLogger>;
    rateLimit: {
      enabled: boolean;
      window: number;
      max: number;
      storage: "memory" | "database" | "secondary-storage";
    } & Omit<_better_auth_core0.BetterAuthRateLimitOptions, "enabled" | "window" | "max" | "storage">;
    adapter: DBAdapter<_better_auth_core0.BetterAuthOptions>;
    internalAdapter: _better_auth_core0.InternalAdapter<_better_auth_core0.BetterAuthOptions>;
    createAuthCookie: (cookieName: string, overrideAttributes?: Partial<better_call0.CookieOptions> | undefined) => _better_auth_core0.BetterAuthCookie;
    secret: string;
    secretConfig: string | _better_auth_core0.SecretConfig;
    sessionConfig: {
      updateAge: number;
      expiresIn: number;
      freshAge: number;
      cookieRefreshCache: false | {
        enabled: true;
        updateAge: number;
      };
    };
    generateId: (options: {
      model: ModelNames;
      size?: number | undefined;
    }) => string | false;
    secondaryStorage: SecondaryStorage | undefined;
    password: {
      hash: (password: string) => Promise<string>;
      verify: (data: {
        password: string;
        hash: string;
      }) => Promise<boolean>;
      config: {
        minPasswordLength: number;
        maxPasswordLength: number;
      };
      checkPassword: (userId: string, ctx: _better_auth_core0.GenericEndpointContext<_better_auth_core0.BetterAuthOptions>) => Promise<boolean>;
    };
    tables: BetterAuthDBSchema;
    runMigrations: () => Promise<void>;
    publishTelemetry: (event: {
      type: string;
      anonymousId?: string | undefined;
      payload: Record<string, any>;
    }) => Promise<void>;
    skipOriginCheck: boolean | string[];
    skipCSRFCheck: boolean;
    runInBackground: (promise: Promise<unknown>) => void;
    runInBackgroundOrAwait: (promise: Promise<unknown> | void) => _better_auth_core0.Awaitable<unknown>;
  }>) => Promise<R>): Middleware<(inputContext: Record<string, any>) => Promise<R>>;
  <R>(handler: (ctx: better_call0.MiddlewareContext<{
    returned?: unknown | undefined;
    responseHeaders?: Headers | undefined;
  } & _better_auth_core0.PluginContext<_better_auth_core0.BetterAuthOptions> & _better_auth_core0.InfoContext & {
    options: _better_auth_core0.BetterAuthOptions;
    trustedOrigins: string[];
    trustedProviders: string[];
    isTrustedOrigin: (url: string, settings?: {
      allowRelativePaths: boolean;
    }) => boolean;
    oauthConfig: {
      skipStateCookieCheck?: boolean | undefined;
      storeStateStrategy: "database" | "cookie";
    };
    newSession: {
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
    } | null;
    session: {
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
    } | null;
    setNewSession: (session: {
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
    } | null) => void;
    socialProviders: OAuthProvider[];
    authCookies: _better_auth_core0.BetterAuthCookies;
    logger: ReturnType<typeof createLogger>;
    rateLimit: {
      enabled: boolean;
      window: number;
      max: number;
      storage: "memory" | "database" | "secondary-storage";
    } & Omit<_better_auth_core0.BetterAuthRateLimitOptions, "enabled" | "window" | "max" | "storage">;
    adapter: DBAdapter<_better_auth_core0.BetterAuthOptions>;
    internalAdapter: _better_auth_core0.InternalAdapter<_better_auth_core0.BetterAuthOptions>;
    createAuthCookie: (cookieName: string, overrideAttributes?: Partial<better_call0.CookieOptions> | undefined) => _better_auth_core0.BetterAuthCookie;
    secret: string;
    secretConfig: string | _better_auth_core0.SecretConfig;
    sessionConfig: {
      updateAge: number;
      expiresIn: number;
      freshAge: number;
      cookieRefreshCache: false | {
        enabled: true;
        updateAge: number;
      };
    };
    generateId: (options: {
      model: ModelNames;
      size?: number | undefined;
    }) => string | false;
    secondaryStorage: SecondaryStorage | undefined;
    password: {
      hash: (password: string) => Promise<string>;
      verify: (data: {
        password: string;
        hash: string;
      }) => Promise<boolean>;
      config: {
        minPasswordLength: number;
        maxPasswordLength: number;
      };
      checkPassword: (userId: string, ctx: _better_auth_core0.GenericEndpointContext<_better_auth_core0.BetterAuthOptions>) => Promise<boolean>;
    };
    tables: BetterAuthDBSchema;
    runMigrations: () => Promise<void>;
    publishTelemetry: (event: {
      type: string;
      anonymousId?: string | undefined;
      payload: Record<string, any>;
    }) => Promise<void>;
    skipOriginCheck: boolean | string[];
    skipCSRFCheck: boolean;
    runInBackground: (promise: Promise<unknown>) => void;
    runInBackgroundOrAwait: (promise: Promise<unknown> | void) => _better_auth_core0.Awaitable<unknown>;
  }>) => Promise<R>): Middleware<(inputContext: Record<string, any>) => Promise<R>>;
};
type BodyOption<M, B extends object | undefined = undefined> = M extends "GET" | "HEAD" | ("GET" | "HEAD")[] ? {
  body?: never;
} : {
  body?: B;
};
type AuthEndpointOptions<Method extends HTTPMethod | HTTPMethod[] | "*", BodySchema extends object | undefined, QuerySchema extends object | undefined, Use extends Middleware[], ReqHeaders extends boolean, ReqRequest extends boolean, Meta extends EndpointMetadata | undefined, ErrorSchema extends StandardSchemaV1 | undefined = undefined> = {
  method: Method;
} & BodyOption<Method, BodySchema> & {
  query?: QuerySchema;
  use?: [...Use];
  requireHeaders?: ReqHeaders;
  requireRequest?: ReqRequest;
  error?: ErrorSchema;
  cloneRequest?: boolean;
  disableBody?: boolean;
  metadata?: Meta;
  [key: string]: any;
};
/**
 * Normalize readonly tuples produced by `const` type parameters
 * into mutable arrays so downstream `M extends Array<any>` checks work.
 */
type NormalizeMethod<M> = M extends readonly (infer E)[] ? E[] : M;
declare function createAuthEndpoint<Path extends string, const Method extends HTTPMethod | HTTPMethod[] | "*", BodySchema extends object | undefined = undefined, QuerySchema extends object | undefined = undefined, Use extends Middleware[] = [], ReqHeaders extends boolean = false, ReqRequest extends boolean = false, R = unknown, Meta extends EndpointMetadata | undefined = undefined, ErrorSchema extends StandardSchemaV1 | undefined = undefined>(path: Path, options: AuthEndpointOptions<Method, BodySchema, QuerySchema, Use, ReqHeaders, ReqRequest, Meta, ErrorSchema>, handler: (ctx: EndpointContext<Path, Method, BodySchema, QuerySchema, Use, ReqHeaders, ReqRequest, AuthContext, Meta>) => Promise<R>): Endpoint<Path, NormalizeMethod<Method>, ResolveBodyInput<BodySchema, Meta>, ResolveQueryInput<QuerySchema, Meta>, Use, R, ResolveMetaInput<Meta>, ResolveErrorInput<ErrorSchema, Meta>>;
declare function createAuthEndpoint<const Method extends HTTPMethod | HTTPMethod[] | "*", BodySchema extends object | undefined = undefined, QuerySchema extends object | undefined = undefined, Use extends Middleware[] = [], ReqHeaders extends boolean = false, ReqRequest extends boolean = false, R = unknown, Meta extends EndpointMetadata | undefined = undefined, ErrorSchema extends StandardSchemaV1 | undefined = undefined>(options: AuthEndpointOptions<Method, BodySchema, QuerySchema, Use, ReqHeaders, ReqRequest, Meta, ErrorSchema>, handler: (ctx: EndpointContext<string, Method, BodySchema, QuerySchema, Use, ReqHeaders, ReqRequest, AuthContext, Meta>) => Promise<R>): Endpoint<string, NormalizeMethod<Method>, ResolveBodyInput<BodySchema, Meta>, ResolveQueryInput<QuerySchema, Meta>, Use, R, ResolveMetaInput<Meta>, ResolveErrorInput<ErrorSchema, Meta>>;
type AuthEndpoint = ReturnType<typeof createAuthEndpoint>;
/**
 * The handler type for plugin hooks.
 *
 * Accepts both `Middleware` instances (from `createAuthMiddleware`)
 * and plain async functions for better-call v1/v2 compatibility.
 */
type AuthMiddleware = (inputContext: Record<string, any>) => Promise<unknown>;
//#endregion
export { AuthEndpoint, AuthMiddleware, createAuthEndpoint, createAuthMiddleware, optionsMiddleware };
//# sourceMappingURL=index.d.mts.map