import * as _better_auth_core_oauth20 from "@better-auth/core/oauth2";
import * as better_call0 from "better-call";

//#region src/api/routes/account.d.ts
declare const listUserAccounts: better_call0.Endpoint<"/list-accounts", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  scopes: string[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  providerId: string;
  accountId: string;
}[], {
  openapi: {
    operationId: string;
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "array";
              items: {
                type: string;
                properties: {
                  id: {
                    type: string;
                  };
                  providerId: {
                    type: string;
                  };
                  createdAt: {
                    type: string;
                    format: string;
                  };
                  updatedAt: {
                    type: string;
                    format: string;
                  };
                  accountId: {
                    type: string;
                  };
                  userId: {
                    type: string;
                  };
                  scopes: {
                    type: string;
                    items: {
                      type: string;
                    };
                  };
                };
                required: string[];
              };
            };
          };
        };
      };
    };
  };
}, undefined>;
declare const linkSocialAccount: better_call0.Endpoint<"/link-social", "POST", {
  provider: unknown;
  callbackURL?: string | undefined;
  idToken?: {
    token: string;
    nonce?: string | undefined;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    scopes?: string[] | undefined;
  } | undefined;
  requestSignUp?: boolean | undefined;
  scopes?: string[] | undefined;
  errorCallbackURL?: string | undefined;
  disableRedirect?: boolean | undefined;
  additionalData?: Record<string, any> | undefined;
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
  url: string;
  redirect: boolean;
}, {
  openapi: {
    description: string;
    operationId: string;
    responses: {
      "200": {
        description: string;
        content: {
          "application/json": {
            schema: {
              type: "object";
              properties: {
                url: {
                  type: string;
                  description: string;
                };
                redirect: {
                  type: string;
                  description: string;
                };
                status: {
                  type: string;
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
declare const unlinkAccount: better_call0.Endpoint<"/unlink-account", "POST", {
  providerId: string;
  accountId?: string | undefined;
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
declare const getAccessToken: better_call0.Endpoint<"/get-access-token", "POST", {
  providerId: string;
  accountId?: string | undefined;
  userId?: string | undefined;
}, Record<string, any> | undefined, [], {
  accessToken: string;
  accessTokenExpiresAt: Date | undefined;
  scopes: string[];
  idToken: string | undefined;
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
                tokenType: {
                  type: string;
                };
                idToken: {
                  type: string;
                };
                accessToken: {
                  type: string;
                };
                accessTokenExpiresAt: {
                  type: string;
                  format: string;
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
declare const refreshToken: better_call0.Endpoint<"/refresh-token", "POST", {
  providerId: string;
  accountId?: string | undefined;
  userId?: string | undefined;
}, Record<string, any> | undefined, [], {
  accessToken: string | undefined;
  refreshToken: string;
  accessTokenExpiresAt: Date | undefined;
  refreshTokenExpiresAt: Date | null | undefined;
  scope: string | null | undefined;
  idToken: string | null | undefined;
  providerId: string;
  accountId: string;
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
                tokenType: {
                  type: string;
                };
                idToken: {
                  type: string;
                };
                accessToken: {
                  type: string;
                };
                refreshToken: {
                  type: string;
                };
                accessTokenExpiresAt: {
                  type: string;
                  format: string;
                };
                refreshTokenExpiresAt: {
                  type: string;
                  format: string;
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
declare const accountInfo: better_call0.Endpoint<"/account-info", "GET", undefined, {
  accountId?: string | undefined;
} | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  user: _better_auth_core_oauth20.OAuth2UserInfo;
  data: Record<string, any>;
} | null, {
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
                    };
                    name: {
                      type: string;
                    };
                    email: {
                      type: string;
                    };
                    image: {
                      type: string;
                    };
                    emailVerified: {
                      type: string;
                    };
                  };
                  required: string[];
                };
                data: {
                  type: string;
                  properties: {};
                  additionalProperties: boolean;
                };
              };
              required: string[];
              additionalProperties: boolean;
            };
          };
        };
      };
    };
  };
}, undefined>;
//#endregion
export { accountInfo, getAccessToken, linkSocialAccount, listUserAccounts, refreshToken, unlinkAccount };
//# sourceMappingURL=account.d.mts.map