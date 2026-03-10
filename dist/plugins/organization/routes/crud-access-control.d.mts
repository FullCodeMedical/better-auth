import { InferAdditionalFieldsFromPluginOptions } from "../../../db/field.mjs";
import { Statements, Subset } from "../../access/types.mjs";
import "../../../db/index.mjs";
import { OrganizationOptions } from "../types.mjs";
import { OrganizationRole } from "../schema.mjs";
import "../../index.mjs";
import * as better_call0 from "better-call";

//#region src/plugins/organization/routes/crud-access-control.d.ts
type IsExactlyEmptyObject<T> = keyof T extends never ? T extends {} ? {} extends T ? true : false : false : false;
declare const createOrgRole: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/create-role", "POST", {
  organizationId?: string | undefined;
  role: string;
  permission: Record<string, string[]>;
} & (IsExactlyEmptyObject<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>> extends true ? {
  additionalFields?: {} | undefined;
} : {
  additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
}) extends infer T ? T extends {
  organizationId?: string | undefined;
  role: string;
  permission: Record<string, string[]>;
} & (IsExactlyEmptyObject<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>> extends true ? {
  additionalFields?: {} | undefined;
} : {
  additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
}) ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  success: boolean;
  roleData: {
    id: string;
    organizationId: string;
    role: string;
    permission: Record<string, string[]>;
    createdAt: Date;
    updatedAt?: Date | undefined;
  } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
  statements: Subset<string, Statements>;
}, {
  $Infer: {
    body: {
      organizationId?: string | undefined;
      role: string;
      permission: Record<string, string[]>;
    } & (IsExactlyEmptyObject<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>> extends true ? {
      additionalFields?: {} | undefined;
    } : {
      additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
    }) extends infer T_1 ? T_1 extends {
      organizationId?: string | undefined;
      role: string;
      permission: Record<string, string[]>;
    } & (IsExactlyEmptyObject<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>> extends true ? {
      additionalFields?: {} | undefined;
    } : {
      additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
    }) ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
  };
}, undefined>;
declare const deleteOrgRole: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/delete-role", "POST", {
  roleName?: string | undefined;
  roleId?: string | undefined;
  organizationId?: string | undefined;
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
}>>], {
  success: boolean;
}, {
  $Infer: {
    body: {
      roleName?: string | undefined;
      roleId?: string | undefined;
      organizationId?: string | undefined;
    };
  };
}, undefined>;
declare const listOrgRoles: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/list-roles", "GET", undefined, {
  organizationId?: string | undefined;
} | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
}>>], ({
  id: string;
  organizationId: string;
  role: string;
  permission: Record<string, string[]>;
  createdAt: Date;
  updatedAt?: Date | undefined;
} & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>)[], undefined, undefined>;
declare const getOrgRole: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/get-role", "GET", undefined, {
  organizationId?: string | undefined;
  roleName?: string | undefined;
  roleId?: string | undefined;
}, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  organizationId: string;
  role: string;
  permission: Record<string, string[]>;
  createdAt: Date;
  updatedAt?: Date | undefined;
} & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>, {
  $Infer: {
    query: {
      organizationId?: string | undefined;
      roleName?: string | undefined;
      roleId?: string | undefined;
    };
  };
}, undefined>;
declare const updateOrgRole: <O extends OrganizationOptions>(options: O) => better_call0.Endpoint<"/organization/update-role", "POST", {
  organizationId?: string | undefined;
  data: {
    permission?: Record<string, string[]> | undefined;
    roleName?: string | undefined;
  } & Partial<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>>;
  roleName?: string | undefined;
  roleId?: string | undefined;
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
}>>], {
  success: boolean;
  roleData: OrganizationRole & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
}, {
  $Infer: {
    body: {
      organizationId?: string | undefined;
      data: {
        permission?: Record<string, string[]> | undefined;
        roleName?: string | undefined;
      } & Partial<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>>;
      roleName?: string | undefined;
      roleId?: string | undefined;
    };
  };
}, undefined>;
//#endregion
export { createOrgRole, deleteOrgRole, getOrgRole, listOrgRoles, updateOrgRole };
//# sourceMappingURL=crud-access-control.d.mts.map