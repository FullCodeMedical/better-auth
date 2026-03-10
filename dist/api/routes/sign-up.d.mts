import { User as User$1 } from "../../types/models.mjs";
import "../../types/index.mjs";
import { BetterAuthOptions } from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import * as better_call0 from "better-call";

//#region src/api/routes/sign-up.d.ts
declare const signUpEmail: <O extends BetterAuthOptions>() => better_call0.Endpoint<"/sign-up/email", "POST", {
  name: string;
  email: string;
  password: string;
  image?: string | undefined;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
} & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", O["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<O["user"]> extends infer T ? T extends {
  name: string;
  email: string;
  password: string;
  image?: string | undefined;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
} & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", O["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<O["user"]> ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
  token: null;
  user: User$1<O["user"], O["plugins"]>;
} | {
  token: string;
  user: User$1<O["user"], O["plugins"]>;
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
    } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", O["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<O["user"]> extends infer T_1 ? T_1 extends {
      name: string;
      email: string;
      password: string;
      image?: string | undefined;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    } & _better_auth_core_db0.InferDBFieldsFromPluginsInput<"user", O["plugins"]> & _better_auth_core_db0.InferDBFieldsFromOptionsInput<O["user"]> ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
    returned: {
      token: string | null;
      user: User$1<O["user"], O["plugins"]>;
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
//#endregion
export { signUpEmail };
//# sourceMappingURL=sign-up.d.mts.map