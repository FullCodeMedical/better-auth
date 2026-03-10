import { JWKOptions, JWSAlgorithms, Jwk, JwtOptions } from "./types.mjs";
import { getJwtToken, signJWT } from "./sign.mjs";
import { createJwk, generateExportedKeyPair, toExpJWT } from "./utils.mjs";
import { verifyJWT } from "./verify.mjs";
import * as _better_auth_core0 from "@better-auth/core";
import * as better_call0 from "better-call";
import { JSONWebKeySet, JWTPayload } from "jose";

//#region src/plugins/jwt/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    jwt: {
      creator: typeof jwt;
    };
  }
}
declare const jwt: <O extends JwtOptions>(options?: O) => {
  id: "jwt";
  options: NoInfer<O>;
  endpoints: {
    getJwks: better_call0.Endpoint<string, "GET", undefined, Record<string, any> | undefined, any, JSONWebKeySet, {
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
                    keys: {
                      type: string;
                      description: string;
                      items: {
                        type: string;
                        properties: {
                          kid: {
                            type: string;
                            description: string;
                          };
                          kty: {
                            type: string;
                            description: string;
                          };
                          alg: {
                            type: string;
                            description: string;
                          };
                          use: {
                            type: string;
                            description: string;
                            enum: string[];
                            nullable: boolean;
                          };
                          n: {
                            type: string;
                            description: string;
                            nullable: boolean;
                          };
                          e: {
                            type: string;
                            description: string;
                            nullable: boolean;
                          };
                          crv: {
                            type: string;
                            description: string;
                            nullable: boolean;
                          };
                          x: {
                            type: string;
                            description: string;
                            nullable: boolean;
                          };
                          y: {
                            type: string;
                            description: string;
                            nullable: boolean;
                          };
                        };
                        required: string[];
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
    }, undefined>;
    getToken: better_call0.Endpoint<"/token", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
      token: string;
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
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, undefined>;
    signJWT: better_call0.Endpoint<string, "POST", {
      payload: JWTPayload;
      overrideOptions?: JwtOptions | undefined;
    }, Record<string, any> | undefined, any, {
      token: string;
    }, {
      $Infer: {
        body: {
          payload: JWTPayload;
          overrideOptions?: JwtOptions | undefined;
        };
      };
    }, undefined>;
    verifyJWT: better_call0.Endpoint<string, "POST", {
      token: string;
      issuer?: string;
    }, Record<string, any> | undefined, any, {
      payload: (JWTPayload & Required<Pick<JWTPayload, "sub" | "aud">>) | null;
    }, {
      $Infer: {
        body: {
          token: string;
          issuer?: string;
        };
        response: {
          payload: {
            sub: string;
            aud: string;
            [key: string]: any;
          } | null;
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
  schema: {
    jwks: {
      fields: {
        publicKey: {
          type: "string";
          required: true;
        };
        privateKey: {
          type: "string";
          required: true;
        };
        createdAt: {
          type: "date";
          required: true;
        };
        expiresAt: {
          type: "date";
          required: false;
        };
      };
    };
  };
};
//#endregion
export { JWKOptions, JWSAlgorithms, Jwk, JwtOptions, createJwk, generateExportedKeyPair, getJwtToken, jwt, signJWT, toExpJWT, verifyJWT };
//# sourceMappingURL=index.d.mts.map