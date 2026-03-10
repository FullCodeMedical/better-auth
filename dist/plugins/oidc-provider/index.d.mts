import { InferOptionSchema } from "../../types/plugins.mjs";
import { schema } from "./schema.mjs";
import { AuthorizationQuery, Client, CodeVerificationValue, OAuthAccessToken, OIDCMetadata, OIDCOptions, TokenBody } from "./types.mjs";
import "../index.mjs";
import { GenericEndpointContext } from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import * as better_call0 from "better-call";
import { OpenAPIParameter } from "better-call";

//#region src/plugins/oidc-provider/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "oidc-provider": {
      creator: typeof oidcProvider;
    };
  }
}
/**
 * Get a client by ID, checking trusted clients first, then database
 */
declare function getClient(clientId: string, trustedClients?: (Client & {
  skipConsent?: boolean | undefined;
})[]): Promise<(Client & {
  skipConsent?: boolean | undefined;
}) | null>;
declare const getMetadata: (ctx: GenericEndpointContext, options?: OIDCOptions | undefined) => OIDCMetadata;
/**
 * OpenID Connect (OIDC) plugin for Better Auth. This plugin implements the
 * authorization code flow and the token exchange flow. It also implements the
 * userinfo endpoint.
 *
 * @param options - The options for the OIDC plugin.
 * @returns A Better Auth plugin.
 */
declare const oidcProvider: (options: OIDCOptions) => {
  id: "oidc-provider";
  hooks: {
    after: {
      matcher(): true;
      handler: better_call0.Middleware<(inputContext: Record<string, any>) => Promise<Response | {
        redirect: boolean;
        url: string;
      } | undefined>>;
    }[];
  };
  endpoints: {
    getOpenIdConfig: better_call0.Endpoint<"/.well-known/openid-configuration", "GET", undefined, Record<string, any> | undefined, any, OIDCMetadata, {
      readonly scope: "server";
    }, undefined>;
    oAuth2authorize: better_call0.Endpoint<"/oauth2/authorize", "GET", undefined, Record<string, any>, any, Response | {
      redirect: boolean;
      url: string;
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
                  additionalProperties: boolean;
                  description: string;
                };
              };
            };
          };
        };
      };
    }, undefined>;
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
    oAuth2token: better_call0.Endpoint<"/oauth2/token", "POST", Record<any, any>, Record<string, any> | undefined, any, {
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
    oAuth2userInfo: better_call0.Endpoint<"/oauth2/userinfo", "GET", undefined, Record<string, any> | undefined, any, {
      sub: string;
      email: string | undefined;
      name: string | undefined;
      picture: string | null | undefined;
      given_name: string | undefined;
      family_name: string | undefined;
      email_verified: boolean | undefined;
    } | {
      sub: string;
      email: string | undefined;
      name: string | undefined;
      picture: string | null | undefined;
      given_name: string | undefined;
      family_name: string | undefined;
      email_verified: boolean | undefined;
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
                    sub: {
                      type: string;
                      description: string;
                    };
                    email: {
                      type: string;
                      format: string;
                      nullable: boolean;
                      description: string;
                    };
                    name: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    picture: {
                      type: string;
                      format: string;
                      nullable: boolean;
                      description: string;
                    };
                    given_name: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    family_name: {
                      type: string;
                      nullable: boolean;
                      description: string;
                    };
                    email_verified: {
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
      scope: "server";
    }, undefined>;
    /**
     * ### Endpoint
     *
     * POST `/oauth2/register`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.registerOAuthApplication`
     *
     * **client:**
     * `authClient.oauth2.register`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/oidc-provider#api-method-oauth2-register)
     */
    registerOAuthApplication: better_call0.Endpoint<"/oauth2/register", "POST", {
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
      jwks?: Record<any, any> | undefined;
      metadata?: Record<any, any> | undefined;
      software_id?: string | undefined;
      software_version?: string | undefined;
      software_statement?: string | undefined;
    }, Record<string, any> | undefined, any, {
      client_id_issued_at: number;
      client_secret_expires_at: number;
      redirect_uris: string[];
      token_endpoint_auth_method: "none" | "client_secret_basic" | "client_secret_post";
      grant_types: ("password" | "authorization_code" | "refresh_token" | "implicit" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer")[];
      response_types: ("token" | "code")[];
      client_name: string | undefined;
      client_uri: string | undefined;
      logo_uri: string | undefined;
      scope: string | undefined;
      contacts: string[] | undefined;
      tos_uri: string | undefined;
      policy_uri: string | undefined;
      jwks_uri: string | undefined;
      jwks: Record<any, any> | undefined;
      software_id: string | undefined;
      software_version: string | undefined;
      software_statement: string | undefined;
      metadata: Record<any, any> | undefined;
      client_secret?: string | undefined;
      client_id: string;
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
                    redirectURLs: {
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
    getOAuthClient: better_call0.Endpoint<"/oauth2/client/:id", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
      clientId: string;
      name: string;
      icon: string | null;
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
                    clientId: {
                      type: string;
                      description: string;
                    };
                    name: {
                      type: string;
                      description: string;
                    };
                    icon: {
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
    /**
     * ### Endpoint
     *
     * GET/POST `/oauth2/endsession`
     *
     * Implements RP-Initiated Logout as per OpenID Connect RP-Initiated Logout 1.0.
     * Allows relying parties to request that an OpenID Provider log out the end-user.
     *
     * @see [OpenID Connect RP-Initiated Logout Spec](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)
     */
    endSession: better_call0.Endpoint<"/oauth2/endsession", better_call0.HTTPMethod | better_call0.HTTPMethod[] | "*", undefined, {
      id_token_hint?: string | undefined;
      logout_hint?: string | undefined;
      client_id?: string | undefined;
      post_logout_redirect_uri?: string | undefined;
      state?: string | undefined;
      ui_locales?: string | undefined;
    } | undefined, any, {
      status: ("OK" | "CREATED" | "ACCEPTED" | "NO_CONTENT" | "MULTIPLE_CHOICES" | "MOVED_PERMANENTLY" | "FOUND" | "SEE_OTHER" | "NOT_MODIFIED" | "TEMPORARY_REDIRECT" | "BAD_REQUEST" | "UNAUTHORIZED" | "PAYMENT_REQUIRED" | "FORBIDDEN" | "NOT_FOUND" | "METHOD_NOT_ALLOWED" | "NOT_ACCEPTABLE" | "PROXY_AUTHENTICATION_REQUIRED" | "REQUEST_TIMEOUT" | "CONFLICT" | "GONE" | "LENGTH_REQUIRED" | "PRECONDITION_FAILED" | "PAYLOAD_TOO_LARGE" | "URI_TOO_LONG" | "UNSUPPORTED_MEDIA_TYPE" | "RANGE_NOT_SATISFIABLE" | "EXPECTATION_FAILED" | "I'M_A_TEAPOT" | "MISDIRECTED_REQUEST" | "UNPROCESSABLE_ENTITY" | "LOCKED" | "FAILED_DEPENDENCY" | "TOO_EARLY" | "UPGRADE_REQUIRED" | "PRECONDITION_REQUIRED" | "TOO_MANY_REQUESTS" | "REQUEST_HEADER_FIELDS_TOO_LARGE" | "UNAVAILABLE_FOR_LEGAL_REASONS" | "INTERNAL_SERVER_ERROR" | "NOT_IMPLEMENTED" | "BAD_GATEWAY" | "SERVICE_UNAVAILABLE" | "GATEWAY_TIMEOUT" | "HTTP_VERSION_NOT_SUPPORTED" | "VARIANT_ALSO_NEGOTIATES" | "INSUFFICIENT_STORAGE" | "LOOP_DETECTED" | "NOT_EXTENDED" | "NETWORK_AUTHENTICATION_REQUIRED") | better_call0.Status;
      body: ({
        message?: string;
        code?: string;
        cause?: unknown;
      } & Record<string, any>) | undefined;
      headers: HeadersInit;
      statusCode: number;
      name: string;
      message: string;
      stack?: string;
      cause?: unknown;
    } | {
      success: boolean;
      message: string;
    }, {
      openapi: {
        description: string;
        parameters: OpenAPIParameter[];
        responses: {
          "302": {
            description: string;
          };
          "200": {
            description: string;
          };
        };
      };
      scope: "server";
    }, undefined>;
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
  readonly options: {
    scopes: string[];
    accessTokenExpiresIn: number;
    allowDynamicClientRegistration?: boolean | undefined;
    metadata?: Partial<OIDCMetadata> | undefined;
    refreshTokenExpiresIn: number;
    codeExpiresIn: number;
    defaultScope: string;
    consentPage?: string | undefined;
    getConsentHTML?: ((props: {
      clientId: string;
      clientName: string;
      clientIcon?: string | undefined;
      clientMetadata: Record<string, any> | null;
      code: string;
      scopes: string[];
    }) => string) | undefined;
    loginPage: string;
    requirePKCE?: boolean | undefined;
    allowPlainCodeChallengeMethod: boolean;
    generateClientId?: (() => string) | undefined;
    generateClientSecret?: (() => string) | undefined;
    getAdditionalUserInfoClaim?: ((user: _better_auth_core_db0.User & Record<string, any>, scopes: string[], client: Client) => Record<string, any> | Promise<Record<string, any>>) | undefined;
    trustedClients?: Client[] | undefined;
    storeClientSecret: "plain" | "encrypted" | "hashed" | {
      hash: (clientSecret: string) => Promise<string>;
    } | {
      encrypt: (clientSecret: string) => Promise<string>;
      decrypt: (clientSecret: string) => Promise<string>;
    };
    useJWTPlugin?: boolean | undefined;
    schema?: InferOptionSchema<typeof schema> | undefined;
  };
};
//#endregion
export { AuthorizationQuery, Client, CodeVerificationValue, OAuthAccessToken, OIDCMetadata, OIDCOptions, TokenBody, getClient, getMetadata, oidcProvider };
//# sourceMappingURL=index.d.mts.map