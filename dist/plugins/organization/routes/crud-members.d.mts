import { InferAdditionalFieldsFromPluginOptions } from "../../../db/field.mjs";
import { Role } from "../../access/types.mjs";
import "../../../db/index.mjs";
import { OrganizationOptions } from "../types.mjs";
import { InferMember, InferOrganizationRolesFromOption } from "../schema.mjs";
import "../../index.mjs";
import { defaultRoles } from "../access/statement.mjs";
import "../access/index.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import { LiteralString } from "@better-auth/core";
import * as better_call0 from "better-call";

//#region src/plugins/organization/routes/crud-members.d.ts
declare const addMember: <O extends OrganizationOptions>(option: O) => better_call0.Endpoint<string, "POST", {
  userId: string;
  role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
  organizationId?: string | undefined;
} & (O extends {
  teams: {
    enabled: true;
  };
} ? {
  teamId?: string | undefined;
} : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true> extends infer T ? T extends {
  userId: string;
  role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
  organizationId?: string | undefined;
} & (O extends {
  teams: {
    enabled: true;
  };
} ? {
  teamId?: string | undefined;
} : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true> ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  createdAt: Date;
} & InferAdditionalFieldsFromPluginOptions<"member", O, false>, {
  $Infer: {
    body: {
      userId: string;
      role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
      organizationId?: string | undefined;
    } & (O extends {
      teams: {
        enabled: true;
      };
    } ? {
      teamId?: string | undefined;
    } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O> extends infer T_1 ? T_1 extends {
      userId: string;
      role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
      organizationId?: string | undefined;
    } & (O extends {
      teams: {
        enabled: true;
      };
    } ? {
      teamId?: string | undefined;
    } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O> ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
  };
  openapi: {
    operationId: string;
    description: string;
  };
}, undefined>;
declare const removeMember: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/remove-member", "POST", {
  memberIdOrEmail: string;
  organizationId?: string | undefined;
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
  member: InferMember<O>;
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
                member: {
                  type: string;
                  properties: {
                    id: {
                      type: string;
                    };
                    userId: {
                      type: string;
                    };
                    organizationId: {
                      type: string;
                    };
                    role: {
                      type: string;
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
declare const updateMemberRole: <O extends OrganizationOptions>(option: O) => better_call0.Endpoint<"/organization/update-member-role", "POST", {
  role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[] | LiteralString | LiteralString[];
  memberId: string;
  /**
   * If not provided, the active organization will be used
   */
  organizationId?: string | undefined;
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
}>>], InferMember<OrganizationOptions, false>, {
  $Infer: {
    body: {
      role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[] | LiteralString | LiteralString[];
      memberId: string;
      /**
       * If not provided, the active organization will be used
       */
      organizationId?: string | undefined;
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
              properties: {
                member: {
                  type: string;
                  properties: {
                    id: {
                      type: string;
                    };
                    userId: {
                      type: string;
                    };
                    organizationId: {
                      type: string;
                    };
                    role: {
                      type: string;
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
declare const getActiveMember: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/get-active-member", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], Omit<InferMember<O, false> & {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}, "user"> & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | undefined;
  };
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
                userId: {
                  type: string;
                };
                organizationId: {
                  type: string;
                };
                role: {
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
declare const leaveOrganization: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/leave", "POST", {
  organizationId: string;
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
}>>, better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], Omit<InferMember<O, false> & {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}, "user"> & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | undefined;
  };
}, undefined, undefined>;
declare const listMembers: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-members", "GET", undefined, {
  limit?: string | number | undefined;
  offset?: string | number | undefined;
  sortBy?: string | undefined;
  sortDirection?: "asc" | "desc" | undefined;
  filterField?: string | undefined;
  filterValue?: string | number | boolean | string[] | number[] | undefined;
  filterOperator?: "in" | "contains" | "starts_with" | "ends_with" | "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "not_in" | undefined;
  organizationId?: string | undefined;
  organizationSlug?: string | undefined;
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
}>>], {
  members: (InferMember<O, false> & {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null | undefined;
    };
  })[];
  total: number;
}, undefined, undefined>;
declare const getActiveMemberRole: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/get-active-member-role", "GET", undefined, {
  userId?: string | undefined;
  organizationId?: string | undefined;
  organizationSlug?: string | undefined;
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
}>>], {
  role: (InferMember<O, false> & {
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  })["role"];
}, undefined, undefined>;
//#endregion
export { addMember, getActiveMember, getActiveMemberRole, leaveOrganization, listMembers, removeMember, updateMemberRole };
//# sourceMappingURL=crud-members.d.mts.map