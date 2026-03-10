import { AdditionalSessionFieldsInput } from "../../types/models.mjs";
import "../../types/index.mjs";
import { BetterAuthOptions } from "@better-auth/core";
import * as better_call0 from "better-call";

//#region src/api/routes/update-session.d.ts
declare const updateSession: <O extends BetterAuthOptions>() => better_call0.Endpoint<"/update-session", "POST", Partial<AdditionalSessionFieldsInput<O>> extends infer T ? T extends Partial<AdditionalSessionFieldsInput<O>> ? T extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T> : T : never : never, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
    body: Partial<AdditionalSessionFieldsInput<O>> extends infer T_1 ? T_1 extends Partial<AdditionalSessionFieldsInput<O>> ? T_1 extends better_call0.StandardSchemaV1<unknown, unknown> ? better_call0.StandardSchemaV1.InferInput<T_1> : T_1 : never : never;
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
//#endregion
export { updateSession };
//# sourceMappingURL=update-session.d.mts.map