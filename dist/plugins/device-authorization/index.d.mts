import { TimeString, ms, sec } from "../../utils/time.mjs";
import * as _better_auth_core_utils_error_codes0 from "@better-auth/core/utils/error-codes";
import * as better_call0 from "better-call";
import * as z from "zod";

//#region src/plugins/device-authorization/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "device-authorization": {
      creator: typeof deviceAuthorization;
    };
  }
}
declare const deviceAuthorizationOptionsSchema: z.ZodObject<{
  expiresIn: z.ZodDefault<z.ZodCustom<TimeString, TimeString>>;
  interval: z.ZodDefault<z.ZodCustom<TimeString, TimeString>>;
  deviceCodeLength: z.ZodDefault<z.ZodNumber>;
  userCodeLength: z.ZodDefault<z.ZodNumber>;
  generateDeviceCode: z.ZodOptional<z.ZodCustom<() => string | Promise<string>, () => string | Promise<string>>>;
  generateUserCode: z.ZodOptional<z.ZodCustom<() => string | Promise<string>, () => string | Promise<string>>>;
  validateClient: z.ZodOptional<z.ZodCustom<(clientId: string) => boolean | Promise<boolean>, (clientId: string) => boolean | Promise<boolean>>>;
  onDeviceAuthRequest: z.ZodOptional<z.ZodCustom<(clientId: string, scope: string | undefined) => void | Promise<void>, (clientId: string, scope: string | undefined) => void | Promise<void>>>;
  verificationUri: z.ZodOptional<z.ZodString>;
  schema: z.ZodCustom<{
    deviceCode?: {
      modelName?: string | undefined;
      fields?: {
        deviceCode?: string | undefined;
        userCode?: string | undefined;
        userId?: string | undefined;
        expiresAt?: string | undefined;
        status?: string | undefined;
        lastPolledAt?: string | undefined;
        pollingInterval?: string | undefined;
        clientId?: string | undefined;
        scope?: string | undefined;
      } | undefined;
    } | undefined;
  }, {
    deviceCode?: {
      modelName?: string | undefined;
      fields?: {
        deviceCode?: string | undefined;
        userCode?: string | undefined;
        userId?: string | undefined;
        expiresAt?: string | undefined;
        status?: string | undefined;
        lastPolledAt?: string | undefined;
        pollingInterval?: string | undefined;
        clientId?: string | undefined;
        scope?: string | undefined;
      } | undefined;
    } | undefined;
  }>;
}, z.core.$strip>;
type DeviceAuthorizationOptions = z.infer<typeof deviceAuthorizationOptionsSchema>;
declare const deviceAuthorization: (options?: Partial<DeviceAuthorizationOptions>) => {
  id: "device-authorization";
  schema: {
    deviceCode: {
      fields: {
        deviceCode: {
          type: "string";
          required: true;
        };
        userCode: {
          type: "string";
          required: true;
        };
        userId: {
          type: "string";
          required: false;
        };
        expiresAt: {
          type: "date";
          required: true;
        };
        status: {
          type: "string";
          required: true;
        };
        lastPolledAt: {
          type: "date";
          required: false;
        };
        pollingInterval: {
          type: "number";
          required: false;
        };
        clientId: {
          type: "string";
          required: false;
        };
        scope: {
          type: "string";
          required: false;
        };
      };
    };
  };
  endpoints: {
    deviceCode: better_call0.Endpoint<"/device/code", "POST", {
      client_id: string;
      scope?: string | undefined;
    }, Record<string, any> | undefined, [], {
      device_code: string;
      user_code: string;
      verification_uri: string;
      verification_uri_complete: string;
      expires_in: number;
      interval: number;
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
                    device_code: {
                      type: string;
                      description: string;
                    };
                    user_code: {
                      type: string;
                      description: string;
                    };
                    verification_uri: {
                      type: string;
                      format: string;
                      description: string;
                    };
                    verification_uri_complete: {
                      type: string;
                      format: string;
                      description: string;
                    };
                    expires_in: {
                      type: string;
                      description: string;
                    };
                    interval: {
                      type: string;
                      description: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    error: {
                      type: string;
                      enum: string[];
                    };
                    error_description: {
                      type: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      error: "invalid_request" | "invalid_client";
      error_description: string;
    }>;
    deviceToken: better_call0.Endpoint<"/device/token", "POST", {
      grant_type: "urn:ietf:params:oauth:grant-type:device_code";
      device_code: string;
      client_id: string;
    }, Record<string, any> | undefined, [], {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope: string;
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
                    session: {
                      $ref: string;
                    };
                    user: {
                      $ref: string;
                    };
                  };
                };
              };
            };
          };
          400: {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    error: {
                      type: string;
                      enum: string[];
                    };
                    error_description: {
                      type: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      error: "invalid_request" | "authorization_pending" | "slow_down" | "expired_token" | "access_denied" | "invalid_grant";
      error_description: string;
    }>;
    deviceVerify: better_call0.Endpoint<"/device", "GET", undefined, {
      user_code: string;
    }, [], {
      user_code: string;
      status: string;
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
                    user_code: {
                      type: string;
                      description: string;
                    };
                    status: {
                      type: string;
                      enum: string[];
                      description: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      error: "invalid_request";
      error_description: string;
    }>;
    deviceApprove: better_call0.Endpoint<"/device/approve", "POST", {
      userCode: string;
    }, Record<string, any> | undefined, [], {
      success: boolean;
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
    }, {
      error: "invalid_request" | "expired_token" | "access_denied" | "device_code_already_processed" | "unauthorized";
      error_description: string;
    }>;
    deviceDeny: better_call0.Endpoint<"/device/deny", "POST", {
      userCode: string;
    }, Record<string, any> | undefined, [], {
      success: boolean;
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
    }, {
      error: "invalid_request" | "expired_token" | "access_denied" | "unauthorized";
      error_description: string;
    }>;
  };
  $ERROR_CODES: {
    USER_NOT_FOUND: _better_auth_core_utils_error_codes0.RawError<"USER_NOT_FOUND">;
    FAILED_TO_CREATE_SESSION: _better_auth_core_utils_error_codes0.RawError<"FAILED_TO_CREATE_SESSION">;
    INVALID_DEVICE_CODE: _better_auth_core_utils_error_codes0.RawError<"INVALID_DEVICE_CODE">;
    EXPIRED_DEVICE_CODE: _better_auth_core_utils_error_codes0.RawError<"EXPIRED_DEVICE_CODE">;
    EXPIRED_USER_CODE: _better_auth_core_utils_error_codes0.RawError<"EXPIRED_USER_CODE">;
    AUTHORIZATION_PENDING: _better_auth_core_utils_error_codes0.RawError<"AUTHORIZATION_PENDING">;
    ACCESS_DENIED: _better_auth_core_utils_error_codes0.RawError<"ACCESS_DENIED">;
    INVALID_USER_CODE: _better_auth_core_utils_error_codes0.RawError<"INVALID_USER_CODE">;
    DEVICE_CODE_ALREADY_PROCESSED: _better_auth_core_utils_error_codes0.RawError<"DEVICE_CODE_ALREADY_PROCESSED">;
    POLLING_TOO_FREQUENTLY: _better_auth_core_utils_error_codes0.RawError<"POLLING_TOO_FREQUENTLY">;
    INVALID_DEVICE_CODE_STATUS: _better_auth_core_utils_error_codes0.RawError<"INVALID_DEVICE_CODE_STATUS">;
    AUTHENTICATION_REQUIRED: _better_auth_core_utils_error_codes0.RawError<"AUTHENTICATION_REQUIRED">;
  };
  options: Partial<{
    expiresIn: TimeString;
    interval: TimeString;
    deviceCodeLength: number;
    userCodeLength: number;
    schema: {
      deviceCode?: {
        modelName?: string | undefined;
        fields?: {
          deviceCode?: string | undefined;
          userCode?: string | undefined;
          userId?: string | undefined;
          expiresAt?: string | undefined;
          status?: string | undefined;
          lastPolledAt?: string | undefined;
          pollingInterval?: string | undefined;
          clientId?: string | undefined;
          scope?: string | undefined;
        } | undefined;
      } | undefined;
    };
    generateDeviceCode?: (() => string | Promise<string>) | undefined;
    generateUserCode?: (() => string | Promise<string>) | undefined;
    validateClient?: ((clientId: string) => boolean | Promise<boolean>) | undefined;
    onDeviceAuthRequest?: ((clientId: string, scope: string | undefined) => void | Promise<void>) | undefined;
    verificationUri?: string | undefined;
  }>;
};
//#endregion
export { DeviceAuthorizationOptions, TimeString, deviceAuthorization, deviceAuthorizationOptionsSchema, ms, sec };
//# sourceMappingURL=index.d.mts.map