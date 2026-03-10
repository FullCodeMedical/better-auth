import { AdditionalUserFieldsInput } from "../../types/models.mjs";
import "../../types/index.mjs";
import { BetterAuthOptions } from "@better-auth/core";
import * as better_call0 from "better-call";

//#region src/api/routes/update-user.d.ts
declare const updateUser: <O extends BetterAuthOptions>() => better_call0.Endpoint<"/update-user", "POST", Partial<AdditionalUserFieldsInput<O>> & {
  name?: string | undefined;
  image?: string | undefined | null;
} extends infer T ? T extends Partial<AdditionalUserFieldsInput<O>> & {
  name?: string | undefined;
  image?: string | undefined | null;
} ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    body: Partial<AdditionalUserFieldsInput<O>> & {
      name?: string | undefined;
      image?: string | undefined | null;
    } extends infer T_1 ? T_1 extends Partial<AdditionalUserFieldsInput<O>> & {
      name?: string | undefined;
      image?: string | undefined | null;
    } ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
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
declare const changePassword: better_call0.Endpoint<"/change-password", "POST", {
  newPassword: string;
  currentPassword: string;
  revokeOtherSessions?: boolean | undefined;
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
declare const setPassword: better_call0.Endpoint<string, "POST", {
  newPassword: string;
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
}, undefined, undefined>;
declare const deleteUser: better_call0.Endpoint<"/delete-user", "POST", {
  callbackURL?: string | undefined;
  password?: string | undefined;
  token?: string | undefined;
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
declare const deleteUserCallback: better_call0.Endpoint<"/delete-user/callback", "GET", undefined, {
  token: string;
  callbackURL?: string | undefined;
}, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
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
declare const changeEmail: better_call0.Endpoint<"/change-email", "POST", {
  newEmail: string;
  callbackURL?: string | undefined;
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
//#endregion
export { changeEmail, changePassword, deleteUser, deleteUserCallback, setPassword, updateUser };
//# sourceMappingURL=update-user.d.mts.map