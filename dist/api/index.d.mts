import { Prettify, UnionToIntersection } from "../types/helper.mjs";
import { AdditionalSessionFieldsInput, AdditionalUserFieldsInput } from "../types/models.mjs";
import "../types/index.mjs";
import "../index.mjs";
import { getIp } from "../utils/get-request-ip.mjs";
import { isAPIError } from "../utils/is-api-error.mjs";
import { formCsrfMiddleware, originCheck, originCheckMiddleware } from "./middlewares/origin-check.mjs";
import "./middlewares/index.mjs";
import { accountInfo, getAccessToken, linkSocialAccount, listUserAccounts, refreshToken, unlinkAccount } from "./routes/account.mjs";
import { callbackOAuth } from "./routes/callback.mjs";
import { createEmailVerificationToken, sendVerificationEmail, sendVerificationEmailFn, verifyEmail } from "./routes/email-verification.mjs";
import { error } from "./routes/error.mjs";
import { ok } from "./routes/ok.mjs";
import { requestPasswordReset, requestPasswordResetCallback, resetPassword, verifyPassword } from "./routes/password.mjs";
import { freshSessionMiddleware, getSession, getSessionFromCtx, listSessions, requestOnlySessionMiddleware, revokeOtherSessions, revokeSession, revokeSessions, sensitiveSessionMiddleware, sessionMiddleware } from "./routes/session.mjs";
import { signInEmail, signInSocial } from "./routes/sign-in.mjs";
import { signOut } from "./routes/sign-out.mjs";
import { signUpEmail } from "./routes/sign-up.mjs";
import { updateSession } from "./routes/update-session.mjs";
import { changeEmail, changePassword, deleteUser, deleteUserCallback, setPassword, updateUser } from "./routes/update-user.mjs";
import "./routes/index.mjs";
import { getOAuthState } from "./state/oauth.mjs";
import { getShouldSkipSessionRefresh, setShouldSkipSessionRefresh } from "./state/should-session-refresh.mjs";
import { AuthContext, Awaitable, BetterAuthOptions, BetterAuthPlugin } from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import { InternalLogger } from "@better-auth/core/env";
import { APIError } from "@better-auth/core/error";
import * as _better_auth_core_oauth20 from "@better-auth/core/oauth2";
import * as better_call0 from "better-call";
import { Endpoint, Middleware } from "better-call";
import { AuthEndpoint, AuthMiddleware, createAuthEndpoint, createAuthMiddleware, optionsMiddleware } from "@better-auth/core/api";

//#region src/api/index.d.ts
declare function checkEndpointConflicts(options: BetterAuthOptions, logger: InternalLogger): void;
declare function getEndpoints<Option extends BetterAuthOptions>(ctx: Awaitable<AuthContext>, options: Option): {
  api: Omit<{
    readonly ok: Endpoint<"/ok", "GET", undefined, Record<string, any> | undefined, [], {
      ok: boolean;
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
                    ok: {
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
      scope: "server";
    }, undefined>;
    readonly error: Endpoint<"/error", "GET", undefined, Record<string, any> | undefined, [], Response, {
      openapi: {
        description: string;
        responses: {
          "200": {
            description: string;
            content: {
              "text/html": {
                schema: {
                  type: "string";
                  description: string;
                };
              };
            };
          };
        };
      };
      scope: "server";
    }, undefined>;
    readonly signInSocial: Endpoint<"/sign-in/social", "POST", {
      provider: unknown;
      callbackURL?: string | undefined;
      newUserCallbackURL?: string | undefined;
      errorCallbackURL?: string | undefined;
      disableRedirect?: boolean | undefined;
      idToken?: {
        token: string;
        nonce?: string | undefined;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        expiresAt?: number | undefined;
        user?: {
          name?: {
            firstName?: string | undefined;
            lastName?: string | undefined;
          } | undefined;
          email?: string | undefined;
        } | undefined;
      } | undefined;
      scopes?: string[] | undefined;
      requestSignUp?: boolean | undefined;
      loginHint?: string | undefined;
      additionalData?: Record<string, any> | undefined;
    }, Record<string, any> | undefined, [], {
      redirect: boolean;
      url: string;
    } | {
      redirect: boolean;
      token: string;
      url: undefined;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T ? { [K in keyof T]: T[K] } : never;
    }, {
      $Infer: {
        body: {
          provider: unknown;
          callbackURL?: string | undefined;
          newUserCallbackURL?: string | undefined;
          errorCallbackURL?: string | undefined;
          disableRedirect?: boolean | undefined;
          idToken?: {
            token: string;
            nonce?: string | undefined;
            accessToken?: string | undefined;
            refreshToken?: string | undefined;
            expiresAt?: number | undefined;
            user?: {
              name?: {
                firstName?: string | undefined;
                lastName?: string | undefined;
              } | undefined;
              email?: string | undefined;
            } | undefined;
          } | undefined;
          scopes?: string[] | undefined;
          requestSignUp?: boolean | undefined;
          loginHint?: string | undefined;
          additionalData?: Record<string, any> | undefined;
        };
        returned: {
          redirect: boolean;
          token?: string | undefined;
          url?: string | undefined;
          user?: ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_1 ? { [K in keyof T_1]: T_1[K] } : never) | undefined;
        };
      };
      openapi: {
        description: string;
        operationId: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  description: string;
                  properties: {
                    token: {
                      type: string;
                    };
                    user: {
                      type: string;
                      $ref: string;
                    };
                    url: {
                      type: string;
                    };
                    redirect: {
                      type: string;
                      enum: boolean[];
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
    readonly callbackOAuth: Endpoint<"/callback/:id", ("GET" | "POST")[], {
      code?: string | undefined;
      error?: string | undefined;
      device_id?: string | undefined;
      error_description?: string | undefined;
      state?: string | undefined;
      user?: string | undefined;
    } | undefined, {
      code?: string | undefined;
      error?: string | undefined;
      device_id?: string | undefined;
      error_description?: string | undefined;
      state?: string | undefined;
      user?: string | undefined;
    } | undefined, [], void, {
      allowedMediaTypes: string[];
      scope: "server";
    }, undefined>;
    readonly getSession: Endpoint<"/get-session", ("GET" | "POST")[], undefined, {
      disableCookieCache?: unknown;
      disableRefresh?: unknown;
    } | undefined, [], {
      session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["session"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"session", Option["plugins"]> extends infer T_2 ? { [K_1 in keyof T_2]: T_2[K_1] } : never;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_3 ? { [K in keyof T_3]: T_3[K] } : never;
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
    readonly signOut: Endpoint<"/sign-out", "POST", undefined, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
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
                  properties: {
                    success: {
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
    readonly signUpEmail: Endpoint<"/sign-up/email", "POST", {
      name: string;
      email: string;
      password: string;
      image?: string | undefined;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> extends infer T_4 ? T_4 extends {
      name: string;
      email: string;
      password: string;
      image?: string | undefined;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> ? T_4 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_4> : T_4 : never : never, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
      token: null;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_5 ? { [K in keyof T_5]: T_5[K] } : never;
    } | {
      token: string;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_6 ? { [K in keyof T_6]: T_6[K] } : never;
    }, {
      allowedMediaTypes: string[];
      $Infer: {
        body: {
          name: string;
          email: string;
          password: string;
          image?: string | undefined;
          callbackURL?: string | undefined;
          rememberMe?: boolean | undefined;
        } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> extends infer T_7 ? T_7 extends {
          name: string;
          email: string;
          password: string;
          image?: string | undefined;
          callbackURL?: string | undefined;
          rememberMe?: boolean | undefined;
        } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> ? T_7 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_7> : T_7 : never : never;
        returned: {
          token: string | null;
          user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_8 ? { [K in keyof T_8]: T_8[K] } : never;
        };
      };
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  name: {
                    type: string;
                    description: string;
                  };
                  email: {
                    type: string;
                    description: string;
                  };
                  password: {
                    type: string;
                    description: string;
                  };
                  image: {
                    type: string;
                    description: string;
                  };
                  callbackURL: {
                    type: string;
                    description: string;
                  };
                  rememberMe: {
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
                    token: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    user: {
                      type: string;
                      properties: {
                        id: {
                          type: string;
                          description: string;
                        };
                        email: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        name: {
                          type: string;
                          description: string;
                        };
                        image: {
                          type: string;
                          format: string;
                          nullable: boolean;
                          description: string;
                        };
                        emailVerified: {
                          type: string;
                          description: string;
                        };
                        createdAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        updatedAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                      };
                      required: string[];
                    };
                  };
                  required: string[];
                };
              };
            };
          };
          "422": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    message: {
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
    readonly signInEmail: Endpoint<"/sign-in/email", "POST", {
      email: string;
      password: string;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
      redirect: boolean;
      token: string;
      url?: string | undefined;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_9 ? { [K in keyof T_9]: T_9[K] } : never;
    }, {
      allowedMediaTypes: string[];
      $Infer: {
        body: {
          email: string;
          password: string;
          callbackURL?: string | undefined;
          rememberMe?: boolean | undefined;
        };
        returned: {
          redirect: boolean;
          token: string;
          url?: string | undefined;
          user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_10 ? { [K in keyof T_10]: T_10[K] } : never;
        };
      };
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
                  description: string;
                  properties: {
                    redirect: {
                      type: string;
                      enum: boolean[];
                    };
                    token: {
                      type: string;
                      description: string;
                    };
                    url: {
                      type: string;
                      nullable: boolean;
                    };
                    user: {
                      type: string;
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
    readonly resetPassword: Endpoint<"/reset-password", "POST", {
      newPassword: string;
      token?: string | undefined;
    }, {
      token?: string | undefined;
    } | undefined, [], {
      status: boolean;
    }, {
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
    readonly verifyPassword: Endpoint<"/verify-password", "POST", {
      password: string;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      scope: "server";
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
    readonly verifyEmail: Endpoint<"/verify-email", "GET", undefined, {
      token: string;
      callbackURL?: string | undefined;
    }, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], void | {
      status: boolean;
    }, {
      openapi: {
        description: string;
        parameters: ({
          name: string;
          in: "query";
          description: string;
          required: true;
          schema: {
            type: "string";
          };
        } | {
          name: string;
          in: "query";
          description: string;
          required: false;
          schema: {
            type: "string";
          };
        })[];
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      type: string;
                      $ref: string;
                    };
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
    readonly sendVerificationEmail: Endpoint<"/send-verification-email", "POST", {
      email: string;
      callbackURL?: string | undefined;
    }, Record<string, any> | undefined, [], {
      status: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  email: {
                    type: string;
                    description: string;
                    example: string;
                  };
                  callbackURL: {
                    type: string;
                    description: string;
                    example: string;
                    nullable: boolean;
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
                      example: boolean;
                    };
                  };
                };
              };
            };
          };
          "400": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    message: {
                      type: string;
                      description: string;
                      example: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    readonly changeEmail: Endpoint<"/change-email", "POST", {
      newEmail: string;
      callbackURL?: string | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
        operationId: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      type: string;
                      $ref: string;
                    };
                    status: {
                      type: string;
                      description: string;
                    };
                    message: {
                      type: string;
                      enum: string[];
                      description: string;
                      nullable: boolean;
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
    readonly changePassword: Endpoint<"/change-password", "POST", {
      newPassword: string;
      currentPassword: string;
      revokeOtherSessions?: boolean | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      token: string | null;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & Record<string, any> & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      };
    }, {
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
                  properties: {
                    token: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    user: {
                      type: string;
                      properties: {
                        id: {
                          type: string;
                          description: string;
                        };
                        email: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        name: {
                          type: string;
                          description: string;
                        };
                        image: {
                          type: string;
                          format: string;
                          nullable: boolean;
                          description: string;
                        };
                        emailVerified: {
                          type: string;
                          description: string;
                        };
                        createdAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        updatedAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                      };
                      required: string[];
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
    readonly setPassword: Endpoint<string, "POST", {
      newPassword: string;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    }, undefined, undefined>;
    readonly updateSession: Endpoint<"/update-session", "POST", Partial<AdditionalSessionFieldsInput<Option>> extends infer T_11 ? T_11 extends Partial<AdditionalSessionFieldsInput<Option>> ? T_11 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_11> : T_11 : never : never, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    }, {
      $Infer: {
        body: Partial<AdditionalSessionFieldsInput<Option>> extends infer T_12 ? T_12 extends Partial<AdditionalSessionFieldsInput<Option>> ? T_12 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_12> : T_12 : never : never;
      };
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
                  properties: {
                    session: {
                      type: string;
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
    readonly updateUser: Endpoint<"/update-user", "POST", Partial<AdditionalUserFieldsInput<Option>> & {
      name?: string | undefined;
      image?: string | undefined | null;
    } extends infer T_13 ? T_13 extends Partial<AdditionalUserFieldsInput<Option>> & {
      name?: string | undefined;
      image?: string | undefined | null;
    } ? T_13 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_13> : T_13 : never : never, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      $Infer: {
        body: Partial<AdditionalUserFieldsInput<Option>> & {
          name?: string | undefined;
          image?: string | undefined | null;
        } extends infer T_14 ? T_14 extends Partial<AdditionalUserFieldsInput<Option>> & {
          name?: string | undefined;
          image?: string | undefined | null;
        } ? T_14 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_14> : T_14 : never : never;
      };
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  name: {
                    type: string;
                    description: string;
                  };
                  image: {
                    type: string;
                    description: string;
                    nullable: boolean;
                  };
                };
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
                    user: {
                      type: string;
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
    readonly deleteUser: Endpoint<"/delete-user", "POST", {
      callbackURL?: string | undefined;
      password?: string | undefined;
      token?: string | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      success: boolean;
      message: string;
    }, {
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  callbackURL: {
                    type: string;
                    description: string;
                  };
                  password: {
                    type: string;
                    description: string;
                  };
                  token: {
                    type: string;
                    description: string;
                  };
                };
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
                    success: {
                      type: string;
                      description: string;
                    };
                    message: {
                      type: string;
                      enum: string[];
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
    readonly requestPasswordReset: Endpoint<"/request-password-reset", "POST", {
      email: string;
      redirectTo?: string | undefined;
    }, Record<string, any> | undefined, [], {
      status: boolean;
      message: string;
    }, {
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
                  properties: {
                    status: {
                      type: string;
                    };
                    message: {
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
    readonly requestPasswordResetCallback: Endpoint<"/reset-password/:token", "GET", undefined, {
      callbackURL: string;
    }, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], never, {
      openapi: {
        operationId: string;
        description: string;
        parameters: ({
          name: string;
          in: "path";
          required: true;
          description: string;
          schema: {
            type: "string";
          };
        } | {
          name: string;
          in: "query";
          required: true;
          description: string;
          schema: {
            type: "string";
          };
        })[];
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    token: {
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
    readonly listSessions: Endpoint<"/list-sessions", "GET", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["session"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"session", Option["plugins"]> extends infer T_15 ? { [K_1 in keyof T_15]: T_15[K_1] } : never>[], {
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
    readonly revokeSession: Endpoint<"/revoke-session", "POST", {
      token: string;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    readonly revokeSessions: Endpoint<"/revoke-sessions", "POST", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    readonly revokeOtherSessions: Endpoint<"/revoke-other-sessions", "POST", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    readonly linkSocialAccount: Endpoint<"/link-social", "POST", {
      provider: unknown;
      callbackURL?: string | undefined;
      idToken?: {
        token: string;
        nonce?: string | undefined;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        scopes?: string[] | undefined;
      } | undefined;
      requestSignUp?: boolean | undefined;
      scopes?: string[] | undefined;
      errorCallbackURL?: string | undefined;
      disableRedirect?: boolean | undefined;
      additionalData?: Record<string, any> | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      url: string;
      redirect: boolean;
    }, {
      openapi: {
        description: string;
        operationId: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    url: {
                      type: string;
                      description: string;
                    };
                    redirect: {
                      type: string;
                      description: string;
                    };
                    status: {
                      type: string;
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
    readonly listUserAccounts: Endpoint<"/list-accounts", "GET", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      scopes: string[];
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      providerId: string;
      accountId: string;
    }[], {
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
                    type: string;
                    properties: {
                      id: {
                        type: string;
                      };
                      providerId: {
                        type: string;
                      };
                      createdAt: {
                        type: string;
                        format: string;
                      };
                      updatedAt: {
                        type: string;
                        format: string;
                      };
                      accountId: {
                        type: string;
                      };
                      userId: {
                        type: string;
                      };
                      scopes: {
                        type: string;
                        items: {
                          type: string;
                        };
                      };
                    };
                    required: string[];
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    readonly deleteUserCallback: Endpoint<"/delete-user/callback", "GET", undefined, {
      token: string;
      callbackURL?: string | undefined;
    }, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
      success: boolean;
      message: string;
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
                    success: {
                      type: string;
                      description: string;
                    };
                    message: {
                      type: string;
                      enum: string[];
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
    readonly unlinkAccount: Endpoint<"/unlink-account", "POST", {
      providerId: string;
      accountId?: string | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    readonly refreshToken: Endpoint<"/refresh-token", "POST", {
      providerId: string;
      accountId?: string | undefined;
      userId?: string | undefined;
    }, Record<string, any> | undefined, [], {
      accessToken: string | undefined;
      refreshToken: string;
      accessTokenExpiresAt: Date | undefined;
      refreshTokenExpiresAt: Date | null | undefined;
      scope: string | null | undefined;
      idToken: string | null | undefined;
      providerId: string;
      accountId: string;
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
                    tokenType: {
                      type: string;
                    };
                    idToken: {
                      type: string;
                    };
                    accessToken: {
                      type: string;
                    };
                    refreshToken: {
                      type: string;
                    };
                    accessTokenExpiresAt: {
                      type: string;
                      format: string;
                    };
                    refreshTokenExpiresAt: {
                      type: string;
                      format: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
          };
        };
      };
    }, undefined>;
    readonly getAccessToken: Endpoint<"/get-access-token", "POST", {
      providerId: string;
      accountId?: string | undefined;
      userId?: string | undefined;
    }, Record<string, any> | undefined, [], {
      accessToken: string;
      accessTokenExpiresAt: Date | undefined;
      scopes: string[];
      idToken: string | undefined;
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
                    tokenType: {
                      type: string;
                    };
                    idToken: {
                      type: string;
                    };
                    accessToken: {
                      type: string;
                    };
                    accessTokenExpiresAt: {
                      type: string;
                      format: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
          };
        };
      };
    }, undefined>;
    readonly accountInfo: Endpoint<"/account-info", "GET", undefined, {
      accountId?: string | undefined;
    } | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      user: _better_auth_core_oauth20.OAuth2UserInfo;
      data: Record<string, any>;
    } | null, {
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
                    user: {
                      type: string;
                      properties: {
                        id: {
                          type: string;
                        };
                        name: {
                          type: string;
                        };
                        email: {
                          type: string;
                        };
                        image: {
                          type: string;
                        };
                        emailVerified: {
                          type: string;
                        };
                      };
                      required: string[];
                    };
                    data: {
                      type: string;
                      properties: {};
                      additionalProperties: boolean;
                    };
                  };
                  required: string[];
                  additionalProperties: boolean;
                };
              };
            };
          };
        };
      };
    }, undefined>;
  }, keyof UnionToIntersection<Option["plugins"] extends (infer T_16)[] ? T_16 extends BetterAuthPlugin ? T_16 extends {
    endpoints: infer E;
  } ? E : {} : {} : {}>> & UnionToIntersection<Option["plugins"] extends (infer T_16)[] ? T_16 extends BetterAuthPlugin ? T_16 extends {
    endpoints: infer E;
  } ? E : {} : {} : {}>;
  middlewares: {
    path: string;
    middleware: Middleware;
  }[];
};
declare const router: <Option extends BetterAuthOptions>(ctx: AuthContext, options: Option) => {
  handler: (request: Request) => Promise<Response>;
  endpoints: Omit<{
    readonly ok: Endpoint<"/ok", "GET", undefined, Record<string, any> | undefined, [], {
      ok: boolean;
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
                    ok: {
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
      scope: "server";
    }, undefined>;
    readonly error: Endpoint<"/error", "GET", undefined, Record<string, any> | undefined, [], Response, {
      openapi: {
        description: string;
        responses: {
          "200": {
            description: string;
            content: {
              "text/html": {
                schema: {
                  type: "string";
                  description: string;
                };
              };
            };
          };
        };
      };
      scope: "server";
    }, undefined>;
    readonly signInSocial: Endpoint<"/sign-in/social", "POST", {
      provider: unknown;
      callbackURL?: string | undefined;
      newUserCallbackURL?: string | undefined;
      errorCallbackURL?: string | undefined;
      disableRedirect?: boolean | undefined;
      idToken?: {
        token: string;
        nonce?: string | undefined;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        expiresAt?: number | undefined;
        user?: {
          name?: {
            firstName?: string | undefined;
            lastName?: string | undefined;
          } | undefined;
          email?: string | undefined;
        } | undefined;
      } | undefined;
      scopes?: string[] | undefined;
      requestSignUp?: boolean | undefined;
      loginHint?: string | undefined;
      additionalData?: Record<string, any> | undefined;
    }, Record<string, any> | undefined, [], {
      redirect: boolean;
      url: string;
    } | {
      redirect: boolean;
      token: string;
      url: undefined;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T ? { [K in keyof T]: T[K] } : never;
    }, {
      $Infer: {
        body: {
          provider: unknown;
          callbackURL?: string | undefined;
          newUserCallbackURL?: string | undefined;
          errorCallbackURL?: string | undefined;
          disableRedirect?: boolean | undefined;
          idToken?: {
            token: string;
            nonce?: string | undefined;
            accessToken?: string | undefined;
            refreshToken?: string | undefined;
            expiresAt?: number | undefined;
            user?: {
              name?: {
                firstName?: string | undefined;
                lastName?: string | undefined;
              } | undefined;
              email?: string | undefined;
            } | undefined;
          } | undefined;
          scopes?: string[] | undefined;
          requestSignUp?: boolean | undefined;
          loginHint?: string | undefined;
          additionalData?: Record<string, any> | undefined;
        };
        returned: {
          redirect: boolean;
          token?: string | undefined;
          url?: string | undefined;
          user?: ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_1 ? { [K in keyof T_1]: T_1[K] } : never) | undefined;
        };
      };
      openapi: {
        description: string;
        operationId: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  description: string;
                  properties: {
                    token: {
                      type: string;
                    };
                    user: {
                      type: string;
                      $ref: string;
                    };
                    url: {
                      type: string;
                    };
                    redirect: {
                      type: string;
                      enum: boolean[];
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
    readonly callbackOAuth: Endpoint<"/callback/:id", ("GET" | "POST")[], {
      code?: string | undefined;
      error?: string | undefined;
      device_id?: string | undefined;
      error_description?: string | undefined;
      state?: string | undefined;
      user?: string | undefined;
    } | undefined, {
      code?: string | undefined;
      error?: string | undefined;
      device_id?: string | undefined;
      error_description?: string | undefined;
      state?: string | undefined;
      user?: string | undefined;
    } | undefined, [], void, {
      allowedMediaTypes: string[];
      scope: "server";
    }, undefined>;
    readonly getSession: Endpoint<"/get-session", ("GET" | "POST")[], undefined, {
      disableCookieCache?: unknown;
      disableRefresh?: unknown;
    } | undefined, [], {
      session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["session"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"session", Option["plugins"]> extends infer T_2 ? { [K_1 in keyof T_2]: T_2[K_1] } : never;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_3 ? { [K in keyof T_3]: T_3[K] } : never;
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
    readonly signOut: Endpoint<"/sign-out", "POST", undefined, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
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
                  properties: {
                    success: {
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
    readonly signUpEmail: Endpoint<"/sign-up/email", "POST", {
      name: string;
      email: string;
      password: string;
      image?: string | undefined;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> extends infer T_4 ? T_4 extends {
      name: string;
      email: string;
      password: string;
      image?: string | undefined;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> ? T_4 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_4> : T_4 : never : never, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
      token: null;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_5 ? { [K in keyof T_5]: T_5[K] } : never;
    } | {
      token: string;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_6 ? { [K in keyof T_6]: T_6[K] } : never;
    }, {
      allowedMediaTypes: string[];
      $Infer: {
        body: {
          name: string;
          email: string;
          password: string;
          image?: string | undefined;
          callbackURL?: string | undefined;
          rememberMe?: boolean | undefined;
        } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> extends infer T_7 ? T_7 extends {
          name: string;
          email: string;
          password: string;
          image?: string | undefined;
          callbackURL?: string | undefined;
          rememberMe?: boolean | undefined;
        } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", Option["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<Option["user"]> ? T_7 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_7> : T_7 : never : never;
        returned: {
          token: string | null;
          user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_8 ? { [K in keyof T_8]: T_8[K] } : never;
        };
      };
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  name: {
                    type: string;
                    description: string;
                  };
                  email: {
                    type: string;
                    description: string;
                  };
                  password: {
                    type: string;
                    description: string;
                  };
                  image: {
                    type: string;
                    description: string;
                  };
                  callbackURL: {
                    type: string;
                    description: string;
                  };
                  rememberMe: {
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
                    token: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    user: {
                      type: string;
                      properties: {
                        id: {
                          type: string;
                          description: string;
                        };
                        email: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        name: {
                          type: string;
                          description: string;
                        };
                        image: {
                          type: string;
                          format: string;
                          nullable: boolean;
                          description: string;
                        };
                        emailVerified: {
                          type: string;
                          description: string;
                        };
                        createdAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        updatedAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                      };
                      required: string[];
                    };
                  };
                  required: string[];
                };
              };
            };
          };
          "422": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    message: {
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
    readonly signInEmail: Endpoint<"/sign-in/email", "POST", {
      email: string;
      password: string;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
      redirect: boolean;
      token: string;
      url?: string | undefined;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_9 ? { [K in keyof T_9]: T_9[K] } : never;
    }, {
      allowedMediaTypes: string[];
      $Infer: {
        body: {
          email: string;
          password: string;
          callbackURL?: string | undefined;
          rememberMe?: boolean | undefined;
        };
        returned: {
          redirect: boolean;
          token: string;
          url?: string | undefined;
          user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["user"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"user", Option["plugins"]> extends infer T_10 ? { [K in keyof T_10]: T_10[K] } : never;
        };
      };
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
                  description: string;
                  properties: {
                    redirect: {
                      type: string;
                      enum: boolean[];
                    };
                    token: {
                      type: string;
                      description: string;
                    };
                    url: {
                      type: string;
                      nullable: boolean;
                    };
                    user: {
                      type: string;
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
    readonly resetPassword: Endpoint<"/reset-password", "POST", {
      newPassword: string;
      token?: string | undefined;
    }, {
      token?: string | undefined;
    } | undefined, [], {
      status: boolean;
    }, {
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
    readonly verifyPassword: Endpoint<"/verify-password", "POST", {
      password: string;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      scope: "server";
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
    readonly verifyEmail: Endpoint<"/verify-email", "GET", undefined, {
      token: string;
      callbackURL?: string | undefined;
    }, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], void | {
      status: boolean;
    }, {
      openapi: {
        description: string;
        parameters: ({
          name: string;
          in: "query";
          description: string;
          required: true;
          schema: {
            type: "string";
          };
        } | {
          name: string;
          in: "query";
          description: string;
          required: false;
          schema: {
            type: "string";
          };
        })[];
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      type: string;
                      $ref: string;
                    };
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
    readonly sendVerificationEmail: Endpoint<"/send-verification-email", "POST", {
      email: string;
      callbackURL?: string | undefined;
    }, Record<string, any> | undefined, [], {
      status: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  email: {
                    type: string;
                    description: string;
                    example: string;
                  };
                  callbackURL: {
                    type: string;
                    description: string;
                    example: string;
                    nullable: boolean;
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
                      example: boolean;
                    };
                  };
                };
              };
            };
          };
          "400": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    message: {
                      type: string;
                      description: string;
                      example: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    readonly changeEmail: Endpoint<"/change-email", "POST", {
      newEmail: string;
      callbackURL?: string | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
        operationId: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      type: string;
                      $ref: string;
                    };
                    status: {
                      type: string;
                      description: string;
                    };
                    message: {
                      type: string;
                      enum: string[];
                      description: string;
                      nullable: boolean;
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
    readonly changePassword: Endpoint<"/change-password", "POST", {
      newPassword: string;
      currentPassword: string;
      revokeOtherSessions?: boolean | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      token: string | null;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & Record<string, any> & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      };
    }, {
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
                  properties: {
                    token: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    user: {
                      type: string;
                      properties: {
                        id: {
                          type: string;
                          description: string;
                        };
                        email: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        name: {
                          type: string;
                          description: string;
                        };
                        image: {
                          type: string;
                          format: string;
                          nullable: boolean;
                          description: string;
                        };
                        emailVerified: {
                          type: string;
                          description: string;
                        };
                        createdAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        updatedAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                      };
                      required: string[];
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
    readonly setPassword: Endpoint<string, "POST", {
      newPassword: string;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    }, undefined, undefined>;
    readonly updateSession: Endpoint<"/update-session", "POST", Partial<AdditionalSessionFieldsInput<Option>> extends infer T_11 ? T_11 extends Partial<AdditionalSessionFieldsInput<Option>> ? T_11 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_11> : T_11 : never : never, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    }, {
      $Infer: {
        body: Partial<AdditionalSessionFieldsInput<Option>> extends infer T_12 ? T_12 extends Partial<AdditionalSessionFieldsInput<Option>> ? T_12 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_12> : T_12 : never : never;
      };
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
                  properties: {
                    session: {
                      type: string;
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
    readonly updateUser: Endpoint<"/update-user", "POST", Partial<AdditionalUserFieldsInput<Option>> & {
      name?: string | undefined;
      image?: string | undefined | null;
    } extends infer T_13 ? T_13 extends Partial<AdditionalUserFieldsInput<Option>> & {
      name?: string | undefined;
      image?: string | undefined | null;
    } ? T_13 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_13> : T_13 : never : never, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      $Infer: {
        body: Partial<AdditionalUserFieldsInput<Option>> & {
          name?: string | undefined;
          image?: string | undefined | null;
        } extends infer T_14 ? T_14 extends Partial<AdditionalUserFieldsInput<Option>> & {
          name?: string | undefined;
          image?: string | undefined | null;
        } ? T_14 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_14> : T_14 : never : never;
      };
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  name: {
                    type: string;
                    description: string;
                  };
                  image: {
                    type: string;
                    description: string;
                    nullable: boolean;
                  };
                };
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
                    user: {
                      type: string;
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
    readonly deleteUser: Endpoint<"/delete-user", "POST", {
      callbackURL?: string | undefined;
      password?: string | undefined;
      token?: string | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      success: boolean;
      message: string;
    }, {
      openapi: {
        operationId: string;
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  callbackURL: {
                    type: string;
                    description: string;
                  };
                  password: {
                    type: string;
                    description: string;
                  };
                  token: {
                    type: string;
                    description: string;
                  };
                };
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
                    success: {
                      type: string;
                      description: string;
                    };
                    message: {
                      type: string;
                      enum: string[];
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
    readonly requestPasswordReset: Endpoint<"/request-password-reset", "POST", {
      email: string;
      redirectTo?: string | undefined;
    }, Record<string, any> | undefined, [], {
      status: boolean;
      message: string;
    }, {
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
                  properties: {
                    status: {
                      type: string;
                    };
                    message: {
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
    readonly requestPasswordResetCallback: Endpoint<"/reset-password/:token", "GET", undefined, {
      callbackURL: string;
    }, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], never, {
      openapi: {
        operationId: string;
        description: string;
        parameters: ({
          name: string;
          in: "path";
          required: true;
          description: string;
          schema: {
            type: "string";
          };
        } | {
          name: string;
          in: "query";
          required: true;
          description: string;
          schema: {
            type: "string";
          };
        })[];
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    token: {
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
    readonly listSessions: Endpoint<"/list-sessions", "GET", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & _better_auth_core_db0.InferDBFieldsFromOptions<Option["session"]> & _better_auth_core_db0.InferDBFieldsFromPlugins<"session", Option["plugins"]> extends infer T_15 ? { [K_1 in keyof T_15]: T_15[K_1] } : never>[], {
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
    readonly revokeSession: Endpoint<"/revoke-session", "POST", {
      token: string;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    readonly revokeSessions: Endpoint<"/revoke-sessions", "POST", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    readonly revokeOtherSessions: Endpoint<"/revoke-other-sessions", "POST", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
    readonly linkSocialAccount: Endpoint<"/link-social", "POST", {
      provider: unknown;
      callbackURL?: string | undefined;
      idToken?: {
        token: string;
        nonce?: string | undefined;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        scopes?: string[] | undefined;
      } | undefined;
      requestSignUp?: boolean | undefined;
      scopes?: string[] | undefined;
      errorCallbackURL?: string | undefined;
      disableRedirect?: boolean | undefined;
      additionalData?: Record<string, any> | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      url: string;
      redirect: boolean;
    }, {
      openapi: {
        description: string;
        operationId: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    url: {
                      type: string;
                      description: string;
                    };
                    redirect: {
                      type: string;
                      description: string;
                    };
                    status: {
                      type: string;
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
    readonly listUserAccounts: Endpoint<"/list-accounts", "GET", undefined, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      scopes: string[];
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      providerId: string;
      accountId: string;
    }[], {
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
                    type: string;
                    properties: {
                      id: {
                        type: string;
                      };
                      providerId: {
                        type: string;
                      };
                      createdAt: {
                        type: string;
                        format: string;
                      };
                      updatedAt: {
                        type: string;
                        format: string;
                      };
                      accountId: {
                        type: string;
                      };
                      userId: {
                        type: string;
                      };
                      scopes: {
                        type: string;
                        items: {
                          type: string;
                        };
                      };
                    };
                    required: string[];
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    readonly deleteUserCallback: Endpoint<"/delete-user/callback", "GET", undefined, {
      token: string;
      callbackURL?: string | undefined;
    }, [Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
      success: boolean;
      message: string;
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
                    success: {
                      type: string;
                      description: string;
                    };
                    message: {
                      type: string;
                      enum: string[];
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
    readonly unlinkAccount: Endpoint<"/unlink-account", "POST", {
      providerId: string;
      accountId?: string | undefined;
    }, Record<string, any> | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    readonly refreshToken: Endpoint<"/refresh-token", "POST", {
      providerId: string;
      accountId?: string | undefined;
      userId?: string | undefined;
    }, Record<string, any> | undefined, [], {
      accessToken: string | undefined;
      refreshToken: string;
      accessTokenExpiresAt: Date | undefined;
      refreshTokenExpiresAt: Date | null | undefined;
      scope: string | null | undefined;
      idToken: string | null | undefined;
      providerId: string;
      accountId: string;
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
                    tokenType: {
                      type: string;
                    };
                    idToken: {
                      type: string;
                    };
                    accessToken: {
                      type: string;
                    };
                    refreshToken: {
                      type: string;
                    };
                    accessTokenExpiresAt: {
                      type: string;
                      format: string;
                    };
                    refreshTokenExpiresAt: {
                      type: string;
                      format: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
          };
        };
      };
    }, undefined>;
    readonly getAccessToken: Endpoint<"/get-access-token", "POST", {
      providerId: string;
      accountId?: string | undefined;
      userId?: string | undefined;
    }, Record<string, any> | undefined, [], {
      accessToken: string;
      accessTokenExpiresAt: Date | undefined;
      scopes: string[];
      idToken: string | undefined;
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
                    tokenType: {
                      type: string;
                    };
                    idToken: {
                      type: string;
                    };
                    accessToken: {
                      type: string;
                    };
                    accessTokenExpiresAt: {
                      type: string;
                      format: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
          };
        };
      };
    }, undefined>;
    readonly accountInfo: Endpoint<"/account-info", "GET", undefined, {
      accountId?: string | undefined;
    } | undefined, [Middleware<(inputContext: Record<string, any>) => Promise<{
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
      user: _better_auth_core_oauth20.OAuth2UserInfo;
      data: Record<string, any>;
    } | null, {
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
                    user: {
                      type: string;
                      properties: {
                        id: {
                          type: string;
                        };
                        name: {
                          type: string;
                        };
                        email: {
                          type: string;
                        };
                        image: {
                          type: string;
                        };
                        emailVerified: {
                          type: string;
                        };
                      };
                      required: string[];
                    };
                    data: {
                      type: string;
                      properties: {};
                      additionalProperties: boolean;
                    };
                  };
                  required: string[];
                  additionalProperties: boolean;
                };
              };
            };
          };
        };
      };
    }, undefined>;
  }, keyof UnionToIntersection<Option["plugins"] extends (infer T_16)[] ? T_16 extends BetterAuthPlugin ? T_16 extends {
    endpoints: infer E;
  } ? E : {} : {} : {}>> & UnionToIntersection<Option["plugins"] extends (infer T_16)[] ? T_16 extends BetterAuthPlugin ? T_16 extends {
    endpoints: infer E;
  } ? E : {} : {} : {}>;
};
//#endregion
export { APIError, type AuthEndpoint, type AuthMiddleware, accountInfo, callbackOAuth, changeEmail, changePassword, checkEndpointConflicts, createAuthEndpoint, createAuthMiddleware, createEmailVerificationToken, deleteUser, deleteUserCallback, error, formCsrfMiddleware, freshSessionMiddleware, getAccessToken, getEndpoints, getIp, getOAuthState, getSession, getSessionFromCtx, getShouldSkipSessionRefresh, isAPIError, linkSocialAccount, listSessions, listUserAccounts, ok, optionsMiddleware, originCheck, originCheckMiddleware, refreshToken, requestOnlySessionMiddleware, requestPasswordReset, requestPasswordResetCallback, resetPassword, revokeOtherSessions, revokeSession, revokeSessions, router, sendVerificationEmail, sendVerificationEmailFn, sensitiveSessionMiddleware, sessionMiddleware, setPassword, setShouldSkipSessionRefresh, signInEmail, signInSocial, signOut, signUpEmail, unlinkAccount, updateSession, updateUser, verifyEmail, verifyPassword };
//# sourceMappingURL=index.d.mts.map