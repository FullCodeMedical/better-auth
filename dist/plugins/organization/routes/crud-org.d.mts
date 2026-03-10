import { InferAdditionalFieldsFromPluginOptions } from "../../../db/field.mjs";
import { Role } from "../../access/types.mjs";
import "../../../db/index.mjs";
import { OrganizationOptions } from "../types.mjs";
import { InferInvitation, InferMember, InferOrganization, InferTeam } from "../schema.mjs";
import "../../index.mjs";
import { defaultRoles } from "../access/statement.mjs";
import "../access/index.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as better_call0 from "better-call";

//#region src/plugins/organization/routes/crud-org.d.ts
declare const createOrganization: <O extends OrganizationOptions>(options?: O | undefined) => better_call0.Endpoint<"/organization/create", "POST", InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
  name: string;
  slug: string;
  userId?: string | undefined;
  logo?: string | undefined;
  metadata?: Record<string, any> | undefined;
  keepCurrentActiveOrganization?: boolean | undefined;
} extends infer T ? T extends InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
  name: string;
  slug: string;
  userId?: string | undefined;
  logo?: string | undefined;
  metadata?: Record<string, any> | undefined;
  keepCurrentActiveOrganization?: boolean | undefined;
} ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], InferOrganization<O> & {
  metadata: any;
  members: (({
    id: string;
    organizationId: string;
    userId: string;
    role: string;
    createdAt: Date;
  } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
}, {
  $Infer: {
    body: InferAdditionalFieldsFromPluginOptions<"organization", O> & {
      name: string;
      slug: string;
      userId?: string | undefined;
      logo?: string | undefined;
      metadata?: Record<string, any> | undefined;
      keepCurrentActiveOrganization?: boolean | undefined;
    } extends infer T_1 ? T_1 extends InferAdditionalFieldsFromPluginOptions<"organization", O> & {
      name: string;
      slug: string;
      userId?: string | undefined;
      logo?: string | undefined;
      metadata?: Record<string, any> | undefined;
      keepCurrentActiveOrganization?: boolean | undefined;
    } ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
  };
  openapi: {
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              description: string;
              $ref: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const checkOrganizationSlug: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/check-slug", "POST", {
  slug: string;
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
  } | null;
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
}>>], {
  status: boolean;
}, undefined, undefined>;
declare const updateOrganization: <O extends OrganizationOptions>(options?: O | undefined) => better_call0.Endpoint<"/organization/update", "POST", {
  data: {
    name?: string | undefined;
    slug?: string | undefined;
    logo?: string | undefined;
    metadata?: Record<string, any> | undefined;
  } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O>>;
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
}>>], InferOrganization<O> | null, {
  $Infer: {
    body: {
      data: {
        name?: string | undefined;
        slug?: string | undefined;
        logo?: string | undefined;
        metadata?: Record<string, any> | undefined;
      } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O>>;
      organizationId?: string | undefined;
    };
  };
  openapi: {
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              description: string;
              $ref: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const deleteOrganization: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/delete", "POST", {
  organizationId: string;
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
}>>], InferOrganization<O>, {
  openapi: {
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "string";
              description: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const getFullOrganization: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/get-full-organization", "GET", undefined, {
  organizationId?: string | undefined;
  organizationSlug?: string | undefined;
  membersLimit?: string | number | undefined;
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
}>>], (O["teams"] extends {
  enabled: true;
} ? {
  members: InferMember<O>[];
  invitations: InferInvitation<O>[];
  teams: InferTeam<O>[];
} & InferOrganization<O> : {
  members: InferMember<O>[];
  invitations: InferInvitation<O>[];
} & InferOrganization<O>) | null, {
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
              $ref: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const setActiveOrganization: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/set-active", "POST", {
  organizationId?: string | null | undefined;
  organizationSlug?: string | undefined;
}, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], (O["teams"] extends {
  enabled: true;
} ? {
  members: InferMember<O>[];
  invitations: InferInvitation<O>[];
  teams: InferTeam<O>[];
} & InferOrganization<O> : {
  members: InferMember<O>[];
  invitations: InferInvitation<O>[];
} & InferOrganization<O>) | null, {
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
              $ref: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const listOrganizations: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], InferOrganization<O>[], {
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
                $ref: string;
              };
            };
          };
        };
      };
    };
  };
}, undefined>;
//#endregion
export { checkOrganizationSlug, createOrganization, deleteOrganization, getFullOrganization, listOrganizations, setActiveOrganization, updateOrganization };
//# sourceMappingURL=crud-org.d.mts.map