import { OAuthAccessToken, OIDCMetadata, OIDCOptions } from "../oidc-provider/types.mjs";
import "../oidc-provider/index.mjs";
import { BetterAuthOptions, GenericEndpointContext } from "@better-auth/core";
import * as better_call0 from "better-call";

//#region src/plugins/mcp/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    mcp: {
      creator: typeof mcp;
    };
  }
}
interface MCPOptions {
  loginPage: string;
  resource?: string | undefined;
  oidcConfig?: OIDCOptions | undefined;
}
declare const getMCPProviderMetadata: (ctx: GenericEndpointContext, options?: OIDCOptions | undefined) => OIDCMetadata;
declare const getMCPProtectedResourceMetadata: (ctx: GenericEndpointContext, options?: MCPOptions | undefined) => {
  resource: string;
  authorization_servers: string[];
  jwks_uri: string;
  scopes_supported: string[];
  bearer_methods_supported: string[];
  resource_signing_alg_values_supported: string[];
};
declare const mcp: (options: MCPOptions) => {
  id: "mcp";
  hooks: {
    after: {
      matcher(): true;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>;
    }[];
  };
  endpoints: {
    oAuthConsent: better_call0.Endpoint<"/oauth2/consent", "POST", {
      accept: boolean;
      consent_code?: string | null | undefined;
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
      redirectURI: string;
    }, {
      openapi: {
        description: string;
        requestBody: {
          required: boolean;
          content: {
            "application/json": {
              schema: {
                type: "object";
                properties: {
                  accept: {
                    type: string;
                    description: string;
                  };
                  consent_code: {
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
                    redirectURI: {
                      type: string;
                      format: string;
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
    getMcpOAuthConfig: better_call0.Endpoint<"/.well-known/oauth-authorization-server", "GET", undefined, Record<string, any> | undefined, any, OIDCMetadata | null, {
      readonly scope: "server";
    }, undefined>;
    getMCPProtectedResource: better_call0.Endpoint<"/.well-known/oauth-protected-resource", "GET", undefined, Record<string, any> | undefined, any, {
      resource: string;
      authorization_servers: string[];
      jwks_uri: string;
      scopes_supported: string[];
      bearer_methods_supported: string[];
      resource_signing_alg_values_supported: string[];
    }, {
      readonly scope: "server";
    }, undefined>;
    mcpOAuthAuthorize: better_call0.Endpoint<"/mcp/authorize", "GET", undefined, Record<string, any>, any, void, {
      openapi: {
        description: string;
        responses: {
          "200": {
            description: string;
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  additionalProperties: boolean;
                  description: string;
                };
              };
            };
          };
        };
      };
    }, undefined>;
    mcpOAuthToken: better_call0.Endpoint<"/mcp/token", "POST", Record<any, any>, Record<string, any> | undefined, any, {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
    } | {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string | undefined;
      scope: string;
      id_token: string | undefined;
    }, {
      allowedMediaTypes: string[];
      scope: "server";
    }, undefined>;
    registerMcpClient: better_call0.Endpoint<"/mcp/register", "POST", {
      redirect_uris: string[];
      token_endpoint_auth_method?: "none" | "client_secret_basic" | "client_secret_post" | undefined;
      grant_types?: ("password" | "authorization_code" | "refresh_token" | "implicit" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer")[] | undefined;
      response_types?: ("token" | "code")[] | undefined;
      client_name?: string | undefined;
      client_uri?: string | undefined;
      logo_uri?: string | undefined;
      scope?: string | undefined;
      contacts?: string[] | undefined;
      tos_uri?: string | undefined;
      policy_uri?: string | undefined;
      jwks_uri?: string | undefined;
      jwks?: Record<string, any> | undefined;
      metadata?: Record<any, any> | undefined;
      software_id?: string | undefined;
      software_version?: string | undefined;
      software_statement?: string | undefined;
    }, Record<string, any> | undefined, any, Response, {
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
                    name: {
                      type: string;
                      description: string;
                    };
                    icon: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    metadata: {
                      type: string;
                      additionalProperties: boolean;
                      nullable: boolean;
                      description: string;
                    };
                    clientId: {
                      type: string;
                      description: string;
                    };
                    clientSecret: {
                      type: string;
                      description: string;
                    };
                    redirectUrls: {
                      type: string;
                      items: {
                        type: string;
                        format: string;
                      };
                      description: string;
                    };
                    type: {
                      type: string;
                      description: string;
                      enum: string[];
                    };
                    authenticationScheme: {
                      type: string;
                      description: string;
                      enum: string[];
                    };
                    disabled: {
                      type: string;
                      description: string;
                      enum: boolean[];
                    };
                    userId: {
                      type: string;
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
                };
              };
            };
          };
        };
      };
    }, undefined>;
    getMcpSession: better_call0.Endpoint<"/mcp/get-session", "GET", undefined, Record<string, any> | undefined, any, OAuthAccessToken | null, better_call0.EndpointMetadata | undefined, undefined>;
  };
  schema: {
    oauthApplication: {
      modelName: string;
      fields: {
        name: {
          type: "string";
        };
        icon: {
          type: "string";
          required: false;
        };
        metadata: {
          type: "string";
          required: false;
        };
        clientId: {
          type: "string";
          unique: true;
        };
        clientSecret: {
          type: "string";
          required: false;
        };
        redirectUrls: {
          type: "string";
        };
        type: {
          type: "string";
        };
        disabled: {
          type: "boolean";
          required: false;
          defaultValue: false;
        };
        userId: {
          type: "string";
          required: false;
          references: {
            model: string;
            field: string;
            onDelete: "cascade";
          };
          index: true;
        };
        createdAt: {
          type: "date";
        };
        updatedAt: {
          type: "date";
        };
      };
    };
    oauthAccessToken: {
      modelName: string;
      fields: {
        accessToken: {
          type: "string";
          unique: true;
        };
        refreshToken: {
          type: "string";
          unique: true;
        };
        accessTokenExpiresAt: {
          type: "date";
        };
        refreshTokenExpiresAt: {
          type: "date";
        };
        clientId: {
          type: "string";
          references: {
            model: string;
            field: string;
            onDelete: "cascade";
          };
          index: true;
        };
        userId: {
          type: "string";
          required: false;
          references: {
            model: string;
            field: string;
            onDelete: "cascade";
          };
          index: true;
        };
        scopes: {
          type: "string";
        };
        createdAt: {
          type: "date";
        };
        updatedAt: {
          type: "date";
        };
      };
    };
    oauthConsent: {
      modelName: string;
      fields: {
        clientId: {
          type: "string";
          references: {
            model: string;
            field: string;
            onDelete: "cascade";
          };
          index: true;
        };
        userId: {
          type: "string";
          references: {
            model: string;
            field: string;
            onDelete: "cascade";
          };
          index: true;
        };
        scopes: {
          type: "string";
        };
        createdAt: {
          type: "date";
        };
        updatedAt: {
          type: "date";
        };
        consentGiven: {
          type: "boolean";
        };
      };
    };
  };
  options: MCPOptions;
};
declare const withMcpAuth: <Auth extends {
  api: {
    getMcpSession: (...args: any) => Promise<OAuthAccessToken | null>;
  };
  options: BetterAuthOptions;
}>(auth: Auth, handler: (req: Request, session: OAuthAccessToken) => Response | Promise<Response>) => (req: Request) => Promise<Response>;
declare const oAuthDiscoveryMetadata: <Auth extends {
  api: {
    getMcpOAuthConfig: (...args: any) => any;
  };
}>(auth: Auth) => (request: Request) => Promise<Response>;
declare const oAuthProtectedResourceMetadata: <Auth extends {
  api: {
    getMCPProtectedResource: (...args: any) => any;
  };
}>(auth: Auth) => (request: Request) => Promise<Response>;
//#endregion
export { getMCPProtectedResourceMetadata, getMCPProviderMetadata, mcp, oAuthDiscoveryMetadata, oAuthProtectedResourceMetadata, withMcpAuth };
//# sourceMappingURL=index.d.mts.map