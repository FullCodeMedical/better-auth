import * as better_call0 from "better-call";

//#region src/api/routes/password.d.ts
declare const requestPasswordReset: better_call0.Endpoint<"/request-password-reset", "POST", {
  email: string;
  redirectTo?: string | undefined;
}, Record<string, any> | undefined, [], {
  status: boolean;
  message: string;
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
                status: {
                  type: string;
                };
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
declare const requestPasswordResetCallback: better_call0.Endpoint<"/reset-password/:token", "GET", undefined, {
  callbackURL: string;
}, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>], never, {
  openapi: {
    operationId: string;
    description: string;
    parameters: ({
      name: string;
      in: "path";
      required: true;
      description: string;
      schema: {
        type: "string";
      };
    } | {
      name: string;
      in: "query";
      required: true;
      description: string;
      schema: {
        type: "string";
      };
    })[];
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
                };
              };
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const resetPassword: better_call0.Endpoint<"/reset-password", "POST", {
  newPassword: string;
  token?: string | undefined;
}, {
  token?: string | undefined;
} | undefined, [], {
  status: boolean;
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
declare const verifyPassword: better_call0.Endpoint<"/verify-password", "POST", {
  password: string;
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
  scope: "server";
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
//#endregion
export { requestPasswordReset, requestPasswordResetCallback, resetPassword, verifyPassword };
//# sourceMappingURL=password.d.mts.map