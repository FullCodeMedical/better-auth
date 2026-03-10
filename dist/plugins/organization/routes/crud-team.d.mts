import { InferAdditionalFieldsFromPluginOptions } from "../../../db/field.mjs";
import { PrettifyDeep } from "../../../types/helper.mjs";
import { Role } from "../../access/types.mjs";
import "../../../db/index.mjs";
import { OrganizationOptions } from "../types.mjs";
import { InferTeam, teamSchema } from "../schema.mjs";
import "../../index.mjs";
import { defaultRoles } from "../access/statement.mjs";
import "../access/index.mjs";
import "../index.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as better_call0 from "better-call";
import * as z from "zod";

//#region src/plugins/organization/routes/crud-team.d.ts
declare const createTeam: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/create-team", "POST", {
  name: string;
  organizationId?: string | undefined;
} & InferAdditionalFieldsFromPluginOptions<"team", O, true> extends infer T ? T extends {
  name: string;
  organizationId?: string | undefined;
} & InferAdditionalFieldsFromPluginOptions<"team", O, true> ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], InferTeam<O, false>, {
  $Infer: {
    body: {
      name: string;
      organizationId?: string | undefined;
    } & InferAdditionalFieldsFromPluginOptions<"team", O> extends infer T_1 ? T_1 extends {
      name: string;
      organizationId?: string | undefined;
    } & InferAdditionalFieldsFromPluginOptions<"team", O> ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
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
              properties: {
                id: {
                  type: string;
                  description: string;
                };
                name: {
                  type: string;
                  description: string;
                };
                organizationId: {
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
        };
      };
    };
  };
}, undefined>;
declare const removeTeam: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/remove-team", "POST", {
  teamId: string;
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
}>>], {
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
                message: {
                  type: string;
                  description: string;
                  enum: string[];
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
declare const updateTeam: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/update-team", "POST", {
  teamId: string;
  data: Partial<PrettifyDeep<Omit<z.infer<typeof teamSchema>, "id" | "createdAt" | "updatedAt">> & InferAdditionalFieldsFromPluginOptions<"team", O>>;
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
}>>], (InferTeam<O, false> & InferAdditionalFieldsFromPluginOptions<"team", O, true>) | null, {
  $Infer: {
    body: {
      teamId: string;
      data: Partial<PrettifyDeep<Omit<z.infer<typeof teamSchema>, "id" | "createdAt" | "updatedAt">> & InferAdditionalFieldsFromPluginOptions<"team", O>>;
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
              properties: {
                id: {
                  type: string;
                  description: string;
                };
                name: {
                  type: string;
                  description: string;
                };
                organizationId: {
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
        };
      };
    };
  };
}, undefined>;
declare const listOrganizationTeams: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-teams", "GET", undefined, {
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
}>>], InferTeam<O, false>[], {
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
                    description: string;
                  };
                  name: {
                    type: string;
                    description: string;
                  };
                  organizationId: {
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
              description: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const setActiveTeam: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/set-active-team", "POST", {
  teamId?: string | null | undefined;
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
}>>], InferTeam<OrganizationOptions> | null, {
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
declare const listUserTeams: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-user-teams", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
  updatedAt?: Date | undefined;
}[], {
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
                description: string;
                $ref: string;
              };
              description: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const listTeamMembers: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-team-members", "GET", undefined, {
  teamId?: string | undefined;
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
  id: string;
  teamId: string;
  userId: string;
  createdAt: Date;
}[], {
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
                description: string;
                properties: {
                  id: {
                    type: string;
                    description: string;
                  };
                  userId: {
                    type: string;
                    description: string;
                  };
                  teamId: {
                    type: string;
                    description: string;
                  };
                  createdAt: {
                    type: string;
                    format: string;
                    description: string;
                  };
                };
                required: string[];
              };
              description: string;
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const addTeamMember: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/add-team-member", "POST", {
  teamId: string;
  userId: unknown;
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
  id: string;
  teamId: string;
  userId: string;
  createdAt: Date;
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
              description: string;
              properties: {
                id: {
                  type: string;
                  description: string;
                };
                userId: {
                  type: string;
                  description: string;
                };
                teamId: {
                  type: string;
                  description: string;
                };
                createdAt: {
                  type: string;
                  format: string;
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
declare const removeTeamMember: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/remove-team-member", "POST", {
  teamId: string;
  userId: unknown;
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
                message: {
                  type: string;
                  description: string;
                  enum: string[];
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
export { addTeamMember, createTeam, listOrganizationTeams, listTeamMembers, listUserTeams, removeTeam, removeTeamMember, setActiveTeam, updateTeam };
//# sourceMappingURL=crud-team.d.mts.map