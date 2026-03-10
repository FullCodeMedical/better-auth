import { FieldAttributeToObject, InferAdditionalFieldsFromPluginOptions } from "../../db/field.mjs";
import { User as User$1 } from "../../types/models.mjs";
import "../../types/index.mjs";
import "../../db/index.mjs";
import { OrganizationOptions } from "./types.mjs";
import { InferInvitation, InferMember, InferOrganization, InferTeam, MemberInput, OrganizationInput, TeamInput, TeamMember } from "./schema.mjs";
import { AuthContext, GenericEndpointContext } from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import { WhereOperator } from "@better-auth/core/db/adapter";

//#region src/plugins/organization/adapter.d.ts
declare const getOrgAdapter: <O extends OrganizationOptions>(context: AuthContext, options?: O | undefined) => {
  findOrganizationBySlug: (slug: string) => Promise<InferOrganization<O> | null>;
  createOrganization: (data: {
    organization: OrganizationInput & Record<string, any>;
  }) => Promise<InferOrganization<O>>;
  findMemberByEmail: (data: {
    email: string;
    organizationId: string;
  }) => Promise<(InferMember<O, false> & {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null | undefined;
    };
  }) | null>;
  listMembers: (data: {
    organizationId?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: ("asc" | "desc") | undefined;
    filter?: {
      field: string;
      operator?: WhereOperator;
      value: any;
    } | undefined;
  }) => Promise<{
    members: (InferMember<O, false> & {
      user: {
        id: string;
        name: string;
        email: string;
        image: string | null | undefined;
      };
    })[];
    total: number;
  }>;
  findMemberByOrgId: (data: {
    userId: string;
    organizationId: string;
  }) => Promise<(Omit<InferMember<O, false> & {
    user: User$1;
  }, "user"> & {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | undefined;
    };
  }) | null>;
  findMemberById: (memberId: string) => Promise<(InferMember<O, false> & {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | undefined;
    };
  }) | null>;
  createMember: (data: Omit<MemberInput, "id"> & Record<string, any>) => Promise<{
    id: string;
    organizationId: string;
    userId: string;
    role: string;
    createdAt: Date;
  } & InferAdditionalFieldsFromPluginOptions<"member", O, false>>;
  updateMember: (memberId: string, role: string) => Promise<InferMember<O, false> | null>;
  deleteMember: ({
    memberId,
    organizationId,
    userId: _userId
  }: {
    memberId: string;
    organizationId: string;
    userId?: string;
  }) => Promise<void>;
  updateOrganization: (organizationId: string, data: Partial<OrganizationInput>) => Promise<InferOrganization<O> | null>;
  deleteOrganization: (organizationId: string) => Promise<string>;
  setActiveOrganization: (sessionToken: string, organizationId: string | null, ctx: GenericEndpointContext) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  }>;
  findOrganizationById: (organizationId: string) => Promise<InferOrganization<O> | null>;
  checkMembership: ({
    userId,
    organizationId
  }: {
    userId: string;
    organizationId: string;
  }) => Promise<InferMember<O, false> | null>;
  /**
   * @requires db
   */
  findFullOrganization: ({
    organizationId,
    isSlug,
    includeTeams,
    membersLimit
  }: {
    organizationId: string;
    isSlug?: boolean | undefined;
    includeTeams?: boolean | undefined;
    membersLimit?: number | undefined;
  }) => Promise<(Omit<InferOrganization<O, false> & {
    invitation: InferInvitation<O>[];
    member: InferMember<O>[];
    team: InferTeam<O>[] | undefined;
  }, "team" | "member" | "invitation"> & {
    invitations: InferInvitation<O>[];
    members: (InferMember<O> & {
      user: {
        id: string;
        name: string;
        email: string;
        image: string | null | undefined;
      };
    })[];
    teams: InferTeam<O>[] | undefined;
  }) | null>;
  listOrganizations: (userId: string) => Promise<InferOrganization<O>[]>;
  createTeam: (data: Omit<TeamInput, "id">) => Promise<InferTeam<O, false>>;
  findTeamById: <IncludeMembers extends boolean>({
    teamId,
    organizationId,
    includeTeamMembers
  }: {
    teamId: string;
    organizationId?: string | undefined;
    includeTeamMembers?: IncludeMembers | undefined;
  }) => Promise<(InferTeam<O> & (IncludeMembers extends true ? {
    members: TeamMember[];
  } : {})) | null>;
  updateTeam: (teamId: string, data: {
    name?: string | undefined;
    description?: string | undefined;
    status?: string | undefined;
  }) => Promise<(InferTeam<O, false> & InferAdditionalFieldsFromPluginOptions<"team", O>) | null>;
  deleteTeam: (teamId: string) => Promise<void>;
  listTeams: (organizationId: string) => Promise<InferTeam<O, false>[]>;
  createTeamInvitation: ({
    email,
    role,
    teamId,
    organizationId,
    inviterId,
    expiresIn
  }: {
    email: string;
    role: string;
    teamId: string;
    organizationId: string;
    inviterId: string;
    expiresIn?: number | undefined;
  }) => Promise<InferInvitation<O>>;
  setActiveTeam: (sessionToken: string, teamId: string | null, ctx: GenericEndpointContext) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  }>;
  listTeamMembers: (data: {
    teamId: string;
  }) => Promise<{
    id: string;
    teamId: string;
    userId: string;
    createdAt: Date;
  }[]>;
  countTeamMembers: (data: {
    teamId: string;
  }) => Promise<number>;
  countMembers: (data: {
    organizationId: string;
  }) => Promise<number>;
  listTeamsByUser: (data: {
    userId: string;
  }) => Promise<{
    id: string;
    name: string;
    organizationId: string;
    createdAt: Date;
    updatedAt?: Date | undefined;
  }[]>;
  findTeamMember: (data: {
    teamId: string;
    userId: string;
  }) => Promise<{
    id: string;
    teamId: string;
    userId: string;
    createdAt: Date;
  } | null>;
  findOrCreateTeamMember: (data: {
    teamId: string;
    userId: string;
  }) => Promise<{
    id: string;
    teamId: string;
    userId: string;
    createdAt: Date;
  }>;
  removeTeamMember: (data: {
    teamId: string;
    userId: string;
  }) => Promise<void>;
  findInvitationsByTeamId: (teamId: string) => Promise<InferInvitation<O, false>[]>;
  listUserInvitations: (email: string) => Promise<(Omit<InferInvitation<O, false> & {
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
  })[]>;
  createInvitation: ({
    invitation,
    user
  }: {
    invitation: {
      email: string;
      role: string;
      organizationId: string;
      teamIds: string[];
    } & Record<string, any>;
    user: User$1;
  }) => Promise<InferInvitation<O, false>>;
  findInvitationById: (id: string) => Promise<InferInvitation<O, false> | null>;
  findPendingInvitation: (data: {
    email: string;
    organizationId: string;
  }) => Promise<InferInvitation<O, false>[]>;
  findPendingInvitations: (data: {
    organizationId: string;
  }) => Promise<InferInvitation<O, false>[]>;
  listInvitations: (data: {
    organizationId: string;
  }) => Promise<InferInvitation<O, false>[]>;
  updateInvitation: (data: {
    invitationId: string;
    status: "accepted" | "canceled" | "rejected";
  }) => Promise<InferInvitation<O, false> | null>;
};
//#endregion
export { getOrgAdapter };
//# sourceMappingURL=adapter.d.mts.map