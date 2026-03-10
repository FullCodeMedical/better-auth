import { AccessControl, ArrayElement, Statements } from "../access/types.mjs";
import { AdminOptions, InferAdminRolesFromOption, SessionWithImpersonatedBy, UserWithRole } from "./types.mjs";
import "../index.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as _better_auth_core_utils_error_codes0 from "@better-auth/core/utils/error-codes";
import * as better_call0 from "better-call";

//#region src/plugins/admin/admin.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    admin: {
      creator: typeof admin;
    };
  }
}
declare const admin: <O extends AdminOptions>(options?: O | undefined) => {
  id: "admin";
  init(): {
    options: {
      databaseHooks: {
        user: {
          create: {
            before(user: {
              id: string;
              createdAt: Date;
              updatedAt: Date;
              email: string;
              emailVerified: boolean;
              name: string;
              image?: string | null | undefined;
            } & Record<string, unknown>): Promise<{
              data: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
                role: string;
              };
            }>;
          };
        };
        session: {
          create: {
            before(session: {
              id: string;
              createdAt: Date;
              updatedAt: Date;
              userId: string;
              expiresAt: Date;
              token: string;
              ipAddress?: string | null | undefined;
              userAgent?: string | null | undefined;
            } & Record<string, unknown>, ctx: _better_auth_core0.GenericEndpointContext | null): Promise<void>;
          };
        };
      };
    };
  };
  hooks: {
    after: {
      matcher(context: _better_auth_core0.HookEndpointContext): boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<SessionWithImpersonatedBy[] | undefined>>;
    }[];
  };
  endpoints: {
    setRole: better_call0.Endpoint<"/admin/set-role", "POST", {
      userId: string;
      role: InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>> | InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>>[];
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      user: UserWithRole;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      $ref: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
      $Infer: {
        body: {
          userId: string;
          role: InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>> | InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>>[];
        };
      };
    }, undefined>;
    getUser: better_call0.Endpoint<"/admin/get-user", "GET", undefined, {
      id: string;
    }, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], UserWithRole, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
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
    createUser: better_call0.Endpoint<"/admin/create-user", "POST", {
      email: string;
      password?: string | undefined;
      name: string;
      role?: InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>> | InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>>[] | undefined;
      data?: Record<string, any> | undefined;
    }, Record<string, any> | undefined, [], {
      user: UserWithRole;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      $ref: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
      $Infer: {
        body: {
          email: string;
          password?: string | undefined;
          name: string;
          role?: InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>> | InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "adminRoles" | "defaultRole" | "bannedUserMessage">>>[] | undefined;
          data?: Record<string, any> | undefined;
        };
      };
    }, undefined>;
    adminUpdateUser: better_call0.Endpoint<"/admin/update-user", "POST", {
      userId: unknown;
      data: Record<any, any>;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], UserWithRole, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
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
    listUsers: better_call0.Endpoint<"/admin/list-users", "GET", undefined, {
      searchValue?: string | undefined;
      searchField?: "email" | "name" | undefined;
      searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
      limit?: string | number | undefined;
      offset?: string | number | undefined;
      sortBy?: string | undefined;
      sortDirection?: "asc" | "desc" | undefined;
      filterField?: string | undefined;
      filterValue?: string | number | boolean | string[] | number[] | undefined;
      filterOperator?: "in" | "contains" | "starts_with" | "ends_with" | "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "not_in" | undefined;
    }, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      users: UserWithRole[];
      total: number;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    users: {
                      type: string;
                      items: {
                        $ref: string;
                      };
                    };
                    total: {
                      type: string;
                    };
                    limit: {
                      type: string;
                    };
                    offset: {
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
    listUserSessions: better_call0.Endpoint<"/admin/list-user-sessions", "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      sessions: SessionWithImpersonatedBy[];
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    sessions: {
                      type: string;
                      items: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    unbanUser: better_call0.Endpoint<"/admin/unban-user", "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      user: UserWithRole;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
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
    banUser: better_call0.Endpoint<"/admin/ban-user", "POST", {
      userId: unknown;
      banReason?: string | undefined;
      banExpiresIn?: number | undefined;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      user: UserWithRole;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
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
    impersonateUser: better_call0.Endpoint<"/admin/impersonate-user", "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      user: UserWithRole;
    }, {
      openapi: {
        operationId: string;
        summary: string;
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
                    user: {
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
    stopImpersonating: better_call0.Endpoint<"/admin/stop-impersonating", "POST", undefined, Record<string, any> | undefined, [], {
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
    }, undefined, undefined>;
    revokeUserSession: better_call0.Endpoint<"/admin/revoke-user-session", "POST", {
      sessionToken: string;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
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
    revokeUserSessions: better_call0.Endpoint<"/admin/revoke-user-sessions", "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
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
    removeUser: better_call0.Endpoint<"/admin/remove-user", "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        summary: string;
        description: string;
        responses: {
          200: {
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
    setUserPassword: better_call0.Endpoint<"/admin/set-user-password", "POST", {
      newPassword: string;
      userId: unknown;
    }, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
      session: {
        user: UserWithRole;
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
      };
    }>>], {
      status: boolean;
    }, {
      openapi: {
        operationId: string;
        summary: string;
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
    userHasPermission: better_call0.Endpoint<"/admin/has-permission", "POST", {
      permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
      })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
      })[key] extends readonly unknown[] ? ArrayElement<(O["ac"] extends AccessControl<infer S extends Statements> ? S : {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
      })[key]> : never)[] | undefined };
    } & {
      userId?: string | undefined;
      role?: InferAdminRolesFromOption<O> | undefined;
    }, Record<string, any> | undefined, [], {
      error: null;
      success: boolean;
    }, {
      openapi: {
        description: string;
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  permissions: {
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
                    error: {
                      type: string;
                    };
                    success: {
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
      $Infer: {
        body: {
          permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
          })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
          })[key] extends readonly unknown[] ? ArrayElement<(O["ac"] extends AccessControl<infer S extends Statements> ? S : {
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "impersonate-admins", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
          })[key]> : never)[] | undefined };
        } & {
          userId?: string | undefined;
          role?: InferAdminRolesFromOption<O> | undefined;
        };
      };
    }, undefined>;
  };
  $ERROR_CODES: {
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: _better_auth_core_utils_error_codes0.RawError<"USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL">;
    FAILED_TO_CREATE_USER: _better_auth_core_utils_error_codes0.RawError<"FAILED_TO_CREATE_USER">;
    USER_ALREADY_EXISTS: _better_auth_core_utils_error_codes0.RawError<"USER_ALREADY_EXISTS">;
    YOU_CANNOT_BAN_YOURSELF: _better_auth_core_utils_error_codes0.RawError<"YOU_CANNOT_BAN_YOURSELF">;
    YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE">;
    YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS">;
    YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_LIST_USERS">;
    YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS">;
    YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_BAN_USERS">;
    YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS">;
    YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS">;
    YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS">;
    YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD">;
    BANNED_USER: _better_auth_core_utils_error_codes0.RawError<"BANNED_USER">;
    YOU_ARE_NOT_ALLOWED_TO_GET_USER: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_GET_USER">;
    NO_DATA_TO_UPDATE: _better_auth_core_utils_error_codes0.RawError<"NO_DATA_TO_UPDATE">;
    YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS">;
    YOU_CANNOT_REMOVE_YOURSELF: _better_auth_core_utils_error_codes0.RawError<"YOU_CANNOT_REMOVE_YOURSELF">;
    YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: _better_auth_core_utils_error_codes0.RawError<"YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE">;
    YOU_CANNOT_IMPERSONATE_ADMINS: _better_auth_core_utils_error_codes0.RawError<"YOU_CANNOT_IMPERSONATE_ADMINS">;
    INVALID_ROLE_TYPE: _better_auth_core_utils_error_codes0.RawError<"INVALID_ROLE_TYPE">;
  };
  schema: {
    user: {
      fields: {
        role: {
          type: "string";
          required: false;
          input: false;
        };
        banned: {
          type: "boolean";
          defaultValue: false;
          required: false;
          input: false;
        };
        banReason: {
          type: "string";
          required: false;
          input: false;
        };
        banExpires: {
          type: "date";
          required: false;
          input: false;
        };
      };
    };
    session: {
      fields: {
        impersonatedBy: {
          type: "string";
          required: false;
        };
      };
    };
  };
  options: NoInfer<O>;
};
//#endregion
export { admin };
//# sourceMappingURL=admin.d.mts.map