import { PhoneNumberOptions, UserWithPhoneNumber } from "./types.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as _better_auth_core_utils_error_codes0 from "@better-auth/core/utils/error-codes";
import * as better_call0 from "better-call";

//#region src/plugins/phone-number/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "phone-number": {
      creator: typeof phoneNumber;
    };
  }
}
declare const phoneNumber: (options?: PhoneNumberOptions | undefined) => {
  id: "phone-number";
  hooks: {
    before: {
      matcher: (ctx: _better_auth_core0.HookEndpointContext) => boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<never>>;
    }[];
  };
  endpoints: {
    signInPhoneNumber: better_call0.Endpoint<"/sign-in/phone-number", "POST", {
      phoneNumber: string;
      password: string;
      rememberMe?: boolean | undefined;
    }, Record<string, any> | undefined, [], {
      token: string;
      user: UserWithPhoneNumber;
    }, {
      openapi: {
        summary: string;
        description: string;
        responses: {
          200: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    user: {
                      $ref: string;
                    };
                    session: {
                      $ref: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
          };
        };
      };
    }, undefined>;
    sendPhoneNumberOTP: better_call0.Endpoint<"/phone-number/send-otp", "POST", {
      phoneNumber: string;
    }, Record<string, any> | undefined, [], {
      message: string;
    }, {
      openapi: {
        summary: string;
        description: string;
        responses: {
          200: {
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
    verifyPhoneNumber: better_call0.Endpoint<"/phone-number/verify", "POST", {
      phoneNumber: string;
      code: string;
      disableSession?: boolean | undefined;
      updatePhoneNumber?: boolean | undefined;
    } & Record<string, any>, Record<string, any> | undefined, [], {
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
      } & UserWithPhoneNumber;
    } | {
      status: boolean;
      token: null;
      user: UserWithPhoneNumber;
    }, {
      openapi: {
        summary: string;
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
                      description: string;
                      enum: boolean[];
                    };
                    token: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    user: {
                      type: string;
                      nullable: boolean;
                      properties: {
                        id: {
                          type: string;
                          description: string;
                        };
                        email: {
                          type: string;
                          format: string;
                          nullable: boolean;
                          description: string;
                        };
                        emailVerified: {
                          type: string;
                          nullable: boolean;
                          description: string;
                        };
                        name: {
                          type: string;
                          nullable: boolean;
                          description: string;
                        };
                        image: {
                          type: string;
                          format: string;
                          nullable: boolean;
                          description: string;
                        };
                        phoneNumber: {
                          type: string;
                          description: string;
                        };
                        phoneNumberVerified: {
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
                      description: string;
                    };
                  };
                  required: string[];
                };
              };
            };
          };
          400: {
            description: string;
          };
        };
      };
    }, undefined>;
    requestPasswordResetPhoneNumber: better_call0.Endpoint<"/phone-number/request-password-reset", "POST", {
      phoneNumber: string;
    }, Record<string, any> | undefined, [], {
      status: boolean;
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
                    status: {
                      type: string;
                      description: string;
                      enum: boolean[];
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
    resetPasswordPhoneNumber: better_call0.Endpoint<"/phone-number/reset-password", "POST", {
      otp: string;
      phoneNumber: string;
      newPassword: string;
    }, Record<string, any> | undefined, [], {
      status: boolean;
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
                    status: {
                      type: string;
                      description: string;
                      enum: boolean[];
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
  };
  schema: {
    user: {
      fields: {
        phoneNumber: {
          type: "string";
          required: false;
          unique: true;
          sortable: true;
          returned: true;
        };
        phoneNumberVerified: {
          type: "boolean";
          required: false;
          returned: true;
          input: false;
        };
      };
    };
  };
  rateLimit: {
    pathMatcher(path: string): boolean;
    window: number;
    max: number;
  }[];
  options: PhoneNumberOptions | undefined;
  $ERROR_CODES: {
    OTP_EXPIRED: _better_auth_core_utils_error_codes0.RawError<"OTP_EXPIRED">;
    INVALID_OTP: _better_auth_core_utils_error_codes0.RawError<"INVALID_OTP">;
    TOO_MANY_ATTEMPTS: _better_auth_core_utils_error_codes0.RawError<"TOO_MANY_ATTEMPTS">;
    INVALID_PHONE_NUMBER: _better_auth_core_utils_error_codes0.RawError<"INVALID_PHONE_NUMBER">;
    PHONE_NUMBER_EXIST: _better_auth_core_utils_error_codes0.RawError<"PHONE_NUMBER_EXIST">;
    PHONE_NUMBER_NOT_EXIST: _better_auth_core_utils_error_codes0.RawError<"PHONE_NUMBER_NOT_EXIST">;
    INVALID_PHONE_NUMBER_OR_PASSWORD: _better_auth_core_utils_error_codes0.RawError<"INVALID_PHONE_NUMBER_OR_PASSWORD">;
    UNEXPECTED_ERROR: _better_auth_core_utils_error_codes0.RawError<"UNEXPECTED_ERROR">;
    OTP_NOT_FOUND: _better_auth_core_utils_error_codes0.RawError<"OTP_NOT_FOUND">;
    PHONE_NUMBER_NOT_VERIFIED: _better_auth_core_utils_error_codes0.RawError<"PHONE_NUMBER_NOT_VERIFIED">;
    PHONE_NUMBER_CANNOT_BE_UPDATED: _better_auth_core_utils_error_codes0.RawError<"PHONE_NUMBER_CANNOT_BE_UPDATED">;
    SEND_OTP_NOT_IMPLEMENTED: _better_auth_core_utils_error_codes0.RawError<"SEND_OTP_NOT_IMPLEMENTED">;
  };
};
//#endregion
export { type PhoneNumberOptions, type UserWithPhoneNumber, phoneNumber };
//# sourceMappingURL=index.d.mts.map