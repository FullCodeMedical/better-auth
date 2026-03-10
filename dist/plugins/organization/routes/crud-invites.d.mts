import { FieldAttributeToObject, InferAdditionalFieldsFromPluginOptions, RemoveFieldsWithReturnedFalse } from "../../../db/field.mjs";
import { Role } from "../../access/types.mjs";
import "../../../db/index.mjs";
import { OrganizationOptions } from "../types.mjs";
import { InferInvitation, InferOrganization, InferOrganizationRolesFromOption } from "../schema.mjs";
import "../../index.mjs";
import { defaultRoles } from "../access/statement.mjs";
import "../index.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import * as better_call0 from "better-call";

//#region src/plugins/organization/routes/crud-invites.d.ts
declare const createInvitation: <O extends OrganizationOptions>(option: O) => better_call0.Endpoint<"/organization/invite-member", "POST", {
  /**
   * The email address of the user
   * to invite
   */
  email: string;
  /**
   * The role to assign to the user
   */
  role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
  /**
   * The organization ID to invite
   * the user to
   */
  organizationId?: string | undefined;
  /**
   * Resend the invitation email, if
   * the user is already invited
   */
  resend?: boolean | undefined;
} & (O extends {
  teams: {
    enabled: true;
  };
} ? {
  /**
   * The team the user is
   * being invited to.
   */
  teamId?: (string | string[]) | undefined;
} : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> extends infer T ? T extends {
  /**
   * The email address of the user
   * to invite
   */
  email: string;
  /**
   * The role to assign to the user
   */
  role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
  /**
   * The organization ID to invite
   * the user to
   */
  organizationId?: string | undefined;
  /**
   * Resend the invitation email, if
   * the user is already invited
   */
  resend?: boolean | undefined;
} & (O extends {
  teams: {
    enabled: true;
  };
} ? {
  /**
   * The team the user is
   * being invited to.
   */
  teamId?: (string | string[]) | undefined;
} : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>, better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  };
}>>], InferInvitation<O, false> | InferInvitation<O>, {
  $Infer: {
    body: {
      /**
       * The email address of the user
       * to invite
       */
      email: string;
      /**
       * The role to assign to the user
       */
      role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
      /**
       * The organization ID to invite
       * the user to
       */
      organizationId?: string | undefined;
      /**
       * Resend the invitation email, if
       * the user is already invited
       */
      resend?: boolean | undefined;
    } & (O extends {
      teams: {
        enabled: true;
      };
    } ? {
      /**
       * The team the user is
       * being invited to.
       */
      teamId?: (string | string[]) | undefined;
    } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> extends infer T_1 ? T_1 extends {
      /**
       * The email address of the user
       * to invite
       */
      email: string;
      /**
       * The role to assign to the user
       */
      role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
      /**
       * The organization ID to invite
       * the user to
       */
      organizationId?: string | undefined;
      /**
       * Resend the invitation email, if
       * the user is already invited
       */
      resend?: boolean | undefined;
    } & (O extends {
      teams: {
        enabled: true;
      };
    } ? {
      /**
       * The team the user is
       * being invited to.
       */
      teamId?: (string | string[]) | undefined;
    } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
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
                id: {
                  type: string;
                };
                email: {
                  type: string;
                };
                role: {
                  type: string;
                };
                organizationId: {
                  type: string;
                };
                inviterId: {
                  type: string;
                };
                status: {
                  type: string;
                };
                expiresAt: {
                  type: string;
                };
                createdAt: {
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
declare const acceptInvitation: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/accept-invitation", "POST", {
  invitationId: string;
}, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>, better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  };
}>>], {
  invitation: InferInvitation<O, false>;
  member: {
    id: string;
    organizationId: string;
    userId: string;
    role: string;
    createdAt: Date;
  } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
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
                invitation: {
                  type: string;
                };
                member: {
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
declare const rejectInvitation: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/reject-invitation", "POST", {
  invitationId: string;
}, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>, better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  };
}>>], {
  invitation: InferInvitation<OrganizationOptions, false> | null;
  member: null;
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
                invitation: {
                  type: string;
                };
                member: {
                  type: string;
                  nullable: boolean;
                };
              };
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const cancelInvitation: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/cancel-invitation", "POST", {
  invitationId: string;
}, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>, better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  };
}>>], InferInvitation<O, false> | null, undefined, undefined>;
declare const getInvitation: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/get-invitation", "GET", undefined, {
  id: string;
}, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>], InferInvitation<O, false> & {
  organizationName: ({
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    logo?: string | null | undefined;
    metadata?: any;
  } & (O["schema"] extends {
    organization?: {
      additionalFields: infer Field extends Record<string, _better_auth_core_db0.DBFieldAttribute>;
    } | undefined;
  } ? FieldAttributeToObject<RemoveFieldsWithReturnedFalse<Field>> : {}))["name"];
  organizationSlug: ({
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    logo?: string | null | undefined;
    metadata?: any;
  } & (O["schema"] extends {
    organization?: {
      additionalFields: infer Field extends Record<string, _better_auth_core_db0.DBFieldAttribute>;
    } | undefined;
  } ? FieldAttributeToObject<RemoveFieldsWithReturnedFalse<Field>> : {}))["slug"];
  inviterEmail: string;
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
                id: {
                  type: string;
                };
                email: {
                  type: string;
                };
                role: {
                  type: string;
                };
                organizationId: {
                  type: string;
                };
                inviterId: {
                  type: string;
                };
                status: {
                  type: string;
                };
                expiresAt: {
                  type: string;
                };
                organizationName: {
                  type: string;
                };
                organizationSlug: {
                  type: string;
                };
                inviterEmail: {
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
declare const listInvitations: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-invitations", "GET", undefined, {
  organizationId?: string | undefined;
} | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>, better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  };
}>>], InferInvitation<O, false>[], undefined, undefined>;
/**
 * List all invitations a user has received
 */
declare const listUserInvitations: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-user-invitations", "GET", undefined, {
  email?: string | undefined;
} | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
  orgOptions: OrganizationOptions;
  roles: typeof defaultRoles & {
    [key: string]: Role<{}>;
  };
  getSession: (context: _better_auth_core0.GenericEndpointContext) => Promise<{
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    } & {
      activeTeamId?: string | undefined;
      activeOrganizationId?: string | undefined;
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
  }>;
}>>], (Omit<InferInvitation<O, false> & {
  organization: InferOrganization<O, false>;
}, "organization"> & {
  organizationName: ({
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    logo?: string | null | undefined;
    metadata?: any;
  } & (O["schema"] extends {
    organization?: {
      additionalFields: infer Field extends Record<string, _better_auth_core_db0.DBFieldAttribute>;
    } | undefined;
  } ? FieldAttributeToObject<Field> : {}))["name"];
})[], {
  openapi: {
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
                  email: {
                    type: string;
                  };
                  role: {
                    type: string;
                  };
                  organizationId: {
                    type: string;
                  };
                  organizationName: {
                    type: string;
                  };
                  inviterId: {
                    type: string;
                    description: string;
                  };
                  teamId: {
                    type: string;
                    description: string;
                    nullable: boolean;
                  };
                  status: {
                    type: string;
                  };
                  expiresAt: {
                    type: string;
                  };
                  createdAt: {
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
  };
}, undefined>;
//#endregion
export { acceptInvitation, cancelInvitation, createInvitation, getInvitation, listInvitations, listUserInvitations, rejectInvitation };
//# sourceMappingURL=crud-invites.d.mts.map