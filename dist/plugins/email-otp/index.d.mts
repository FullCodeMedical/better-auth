import { EmailOTPOptions } from "./types.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import * as _better_auth_core_utils_error_codes0 from "@better-auth/core/utils/error-codes";
import * as better_call0 from "better-call";

//#region src/plugins/email-otp/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "email-otp": {
      creator: typeof emailOTP;
    };
  }
}
declare const emailOTP: (options: EmailOTPOptions) => {
  id: "email-otp";
  init(ctx: _better_auth_core0.AuthContext): {
    options: {
      emailVerification: {
        sendVerificationEmail(data: {
          user: _better_auth_core_db0.User;
          url: string;
          token: string;
        }, request: Request | undefined): Promise<void>;
      };
    };
  } | undefined;
  endpoints: {
    sendVerificationOTP: better_call0.Endpoint<"/email-otp/send-verification-otp", "POST", {
      email: string;
      type: "sign-in" | "change-email" | "email-verification" | "forget-password";
    }, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    success: {
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
    createVerificationOTP: better_call0.Endpoint<string, "POST", {
      email: string;
      type: "sign-in" | "change-email" | "email-verification" | "forget-password";
    }, Record<string, any> | undefined, [], string, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "string";
                };
              };
            };
          };
        };
      };
    }, undefined>;
    getVerificationOTP: better_call0.Endpoint<string, "GET", undefined, {
      email: string;
      type: "sign-in" | "change-email" | "email-verification" | "forget-password";
    }, [], {
      otp: null;
    } | {
      otp: string;
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
                    otp: {
                      type: string;
                      nullable: boolean;
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
    checkVerificationOTP: better_call0.Endpoint<"/email-otp/check-verification-otp", "POST", {
      email: string;
      type: "sign-in" | "change-email" | "email-verification" | "forget-password";
      otp: string;
    }, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    success: {
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
    verifyEmailOTP: better_call0.Endpoint<"/email-otp/verify-email", "POST", {
      email: string;
      otp: string;
    }, Record<string, any> | undefined, [], {
      status: boolean;
      token: string;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & Record<string, any>;
    } | {
      status: boolean;
      token: null;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & Record<string, any>;
    }, {
      openapi: {
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    status: {
                      type: string;
                      description: string;
                      enum: boolean[];
                    };
                    token: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    user: {
                      $ref: string;
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
    signInEmailOTP: better_call0.Endpoint<"/sign-in/email-otp", "POST", {
      email: string;
      otp: string;
      name?: string | undefined;
      image?: string | undefined;
    } & Record<string, any>, Record<string, any> | undefined, [], {
      token: string;
      user: {
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
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    token: {
                      type: string;
                      description: string;
                    };
                    user: {
                      $ref: string;
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
    requestPasswordResetEmailOTP: better_call0.Endpoint<"/email-otp/request-password-reset", "POST", {
      email: string;
    }, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
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
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    forgetPasswordEmailOTP: better_call0.Endpoint<"/forget-password/email-otp", "POST", {
      email: string;
    }, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
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
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    resetPasswordEmailOTP: better_call0.Endpoint<"/email-otp/reset-password", "POST", {
      email: string;
      otp: string;
      password: string;
    }, Record<string, any> | undefined, [], {
      success: boolean;
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    success: {
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
    requestEmailChangeEmailOTP: better_call0.Endpoint<"/email-otp/request-email-change", "POST", {
      newEmail: string;
      otp?: string | undefined;
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
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    success: {
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
    changeEmailEmailOTP: better_call0.Endpoint<"/email-otp/change-email", "POST", {
      newEmail: string;
      otp: string;
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
    }, {
      openapi: {
        operationId: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    success: {
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
  };
  hooks: {
    after: {
      matcher(context: _better_auth_core0.HookEndpointContext): boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>;
    }[];
  };
  rateLimit: ({
    pathMatcher(path: string): path is "/email-otp/send-verification-otp";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/check-verification-otp";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/verify-email";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/sign-in/email-otp";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/request-password-reset";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/reset-password";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/forget-password/email-otp";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/request-email-change";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/change-email";
    window: number;
    max: number;
  })[];
  options: EmailOTPOptions;
  $ERROR_CODES: {
    OTP_EXPIRED: _better_auth_core_utils_error_codes0.RawError<"OTP_EXPIRED">;
    INVALID_OTP: _better_auth_core_utils_error_codes0.RawError<"INVALID_OTP">;
    TOO_MANY_ATTEMPTS: _better_auth_core_utils_error_codes0.RawError<"TOO_MANY_ATTEMPTS">;
  };
};
//#endregion
export { type EmailOTPOptions, emailOTP };
//# sourceMappingURL=index.d.mts.map