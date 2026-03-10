import { BackupCodeOptions, backupCode2fa, generateBackupCodes, getBackupCodes, verifyBackupCode } from "./backup-codes/index.mjs";
import { OTPOptions, otp2fa } from "./otp/index.mjs";
import { TOTPOptions, totp2fa } from "./totp/index.mjs";
import { TwoFactorOptions, TwoFactorProvider, TwoFactorTable, UserWithTwoFactor } from "./types.mjs";
import { TWO_FACTOR_ERROR_CODES } from "./error-code.mjs";
import { twoFactorClient } from "./client.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as _better_auth_core_utils_error_codes0 from "@better-auth/core/utils/error-codes";
import * as better_call0 from "better-call";

//#region src/plugins/two-factor/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "two-factor": {
      creator: typeof twoFactor;
    };
  }
}
declare const twoFactor: <O extends TwoFactorOptions>(options?: O) => {
  id: "two-factor";
  endpoints: {
    /**
     * ### Endpoint
     *
     * POST `/two-factor/enable`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.enableTwoFactor`
     *
     * **client:**
     * `authClient.twoFactor.enable`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-enable)
     */
    enableTwoFactor: better_call0.Endpoint<"/two-factor/enable", "POST", {
      password: string;
      issuer?: string | undefined;
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
      totpURI: string;
      backupCodes: string[];
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
                    totpURI: {
                      type: string;
                      description: string;
                    };
                    backupCodes: {
                      type: string;
                      items: {
                        type: string;
                      };
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
    /**
     * ### Endpoint
     *
     * POST `/two-factor/disable`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.disableTwoFactor`
     *
     * **client:**
     * `authClient.twoFactor.disable`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-disable)
     */
    disableTwoFactor: better_call0.Endpoint<"/two-factor/disable", "POST", {
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
    verifyBackupCode: better_call0.Endpoint<"/two-factor/verify-backup-code", "POST", {
      code: string;
      disableSession?: boolean | undefined;
      trustDevice?: boolean | undefined;
    }, Record<string, any> | undefined, any, {
      token: string | undefined;
      user: (Record<string, any> & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      }) | UserWithTwoFactor;
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
                        twoFactorEnabled: {
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
                    session: {
                      type: string;
                      properties: {
                        token: {
                          type: string;
                          description: string;
                        };
                        userId: {
                          type: string;
                          description: string;
                        };
                        createdAt: {
                          type: string;
                          format: string;
                          description: string;
                        };
                        expiresAt: {
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
        };
      };
    }, undefined>;
    generateBackupCodes: better_call0.Endpoint<"/two-factor/generate-backup-codes", "POST", {
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
      backupCodes: string[];
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
                    backupCodes: {
                      type: string;
                      items: {
                        type: string;
                      };
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
    viewBackupCodes: better_call0.Endpoint<string, "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, any, {
      status: boolean;
      backupCodes: string[];
    }, better_call0.EndpointMetadata | undefined, undefined>;
    sendTwoFactorOTP: better_call0.Endpoint<"/two-factor/send-otp", "POST", {
      trustDevice?: boolean | undefined;
    } | undefined, Record<string, any> | undefined, [], {
      status: boolean;
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
    verifyTwoFactorOTP: better_call0.Endpoint<"/two-factor/verify-otp", "POST", {
      code: string;
      trustDevice?: boolean | undefined;
    }, Record<string, any> | undefined, [], {
      token: string;
      user: UserWithTwoFactor;
    } | {
      token: string;
      user: Record<string, any> & {
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
                    token: {
                      type: string;
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
        };
      };
    }, undefined>;
    generateTOTP: better_call0.Endpoint<string, "POST", {
      secret: string;
    }, Record<string, any> | undefined, [], {
      code: string;
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
                    code: {
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
    getTOTPURI: better_call0.Endpoint<"/two-factor/get-totp-uri", "POST", {
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
      totpURI: string;
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
                    totpURI: {
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
    verifyTOTP: better_call0.Endpoint<"/two-factor/verify-totp", "POST", {
      code: string;
      trustDevice?: boolean | undefined;
    }, Record<string, any> | undefined, [], {
      token: string;
      user: UserWithTwoFactor;
    } | {
      token: string;
      user: Record<string, any> & {
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
  };
  options: NoInfer<O>;
  hooks: {
    after: {
      matcher(context: _better_auth_core0.HookEndpointContext): boolean;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
        twoFactorRedirect: boolean;
      } | undefined>>;
    }[];
  };
  schema: {
    user: {
      fields: {
        twoFactorEnabled: {
          type: "boolean";
          required: false;
          defaultValue: false;
          input: false;
        };
      };
    };
    twoFactor: {
      fields: {
        secret: {
          type: "string";
          required: true;
          returned: false;
          index: true;
        };
        backupCodes: {
          type: "string";
          required: true;
          returned: false;
        };
        userId: {
          type: "string";
          required: true;
          returned: false;
          references: {
            model: string;
            field: string;
          };
          index: true;
        };
      };
    };
  };
  rateLimit: {
    pathMatcher(path: string): boolean;
    window: number;
    max: number;
  }[];
  $ERROR_CODES: {
    OTP_NOT_ENABLED: _better_auth_core_utils_error_codes0.RawError<"OTP_NOT_ENABLED">;
    OTP_HAS_EXPIRED: _better_auth_core_utils_error_codes0.RawError<"OTP_HAS_EXPIRED">;
    TOTP_NOT_ENABLED: _better_auth_core_utils_error_codes0.RawError<"TOTP_NOT_ENABLED">;
    TWO_FACTOR_NOT_ENABLED: _better_auth_core_utils_error_codes0.RawError<"TWO_FACTOR_NOT_ENABLED">;
    BACKUP_CODES_NOT_ENABLED: _better_auth_core_utils_error_codes0.RawError<"BACKUP_CODES_NOT_ENABLED">;
    INVALID_BACKUP_CODE: _better_auth_core_utils_error_codes0.RawError<"INVALID_BACKUP_CODE">;
    INVALID_CODE: _better_auth_core_utils_error_codes0.RawError<"INVALID_CODE">;
    TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: _better_auth_core_utils_error_codes0.RawError<"TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE">;
    INVALID_TWO_FACTOR_COOKIE: _better_auth_core_utils_error_codes0.RawError<"INVALID_TWO_FACTOR_COOKIE">;
  };
};
//#endregion
export { BackupCodeOptions, OTPOptions, TOTPOptions, TWO_FACTOR_ERROR_CODES, TwoFactorOptions, TwoFactorProvider, TwoFactorTable, UserWithTwoFactor, backupCode2fa, generateBackupCodes, getBackupCodes, otp2fa, totp2fa, twoFactor, twoFactorClient, verifyBackupCode };
//# sourceMappingURL=index.d.mts.map