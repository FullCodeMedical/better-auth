import { BetterAuthOptions } from "@better-auth/core";
import { User } from "@better-auth/core/db";
import * as better_call0 from "better-call";

//#region src/api/routes/sign-in.d.ts
declare const signInSocial: <O extends BetterAuthOptions>() => better_call0.Endpoint<"/sign-in/social", "POST", {
  provider: unknown;
  callbackURL?: string | undefined;
  newUserCallbackURL?: string | undefined;
  errorCallbackURL?: string | undefined;
  disableRedirect?: boolean | undefined;
  idToken?: {
    token: string;
    nonce?: string | undefined;
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
    expiresAt?: number | undefined;
    user?: {
      name?: {
        firstName?: string | undefined;
        lastName?: string | undefined;
      } | undefined;
      email?: string | undefined;
    } | undefined;
  } | undefined;
  scopes?: string[] | undefined;
  requestSignUp?: boolean | undefined;
  loginHint?: string | undefined;
  additionalData?: Record<string, any> | undefined;
}, Record<string, any> | undefined, [], {
  redirect: boolean;
  url: string;
} | {
  redirect: boolean;
  token: string;
  url: undefined;
  user: User<O["user"], O["plugins"]>;
}, {
  $Infer: {
    body: {
      provider: unknown;
      callbackURL?: string | undefined;
      newUserCallbackURL?: string | undefined;
      errorCallbackURL?: string | undefined;
      disableRedirect?: boolean | undefined;
      idToken?: {
        token: string;
        nonce?: string | undefined;
        accessToken?: string | undefined;
        refreshToken?: string | undefined;
        expiresAt?: number | undefined;
        user?: {
          name?: {
            firstName?: string | undefined;
            lastName?: string | undefined;
          } | undefined;
          email?: string | undefined;
        } | undefined;
      } | undefined;
      scopes?: string[] | undefined;
      requestSignUp?: boolean | undefined;
      loginHint?: string | undefined;
      additionalData?: Record<string, any> | undefined;
    };
    returned: {
      redirect: boolean;
      token?: string | undefined;
      url?: string | undefined;
      user?: User<O["user"], O["plugins"]> | undefined;
    };
  };
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
              description: string;
              properties: {
                token: {
                  type: string;
                };
                user: {
                  type: string;
                  $ref: string;
                };
                url: {
                  type: string;
                };
                redirect: {
                  type: string;
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
declare const signInEmail: <O extends BetterAuthOptions>() => better_call0.Endpoint<"/sign-in/email", "POST", {
  email: string;
  password: string;
  callbackURL?: string | undefined;
  rememberMe?: boolean | undefined;
}, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<void>>], {
  redirect: boolean;
  token: string;
  url?: string | undefined;
  user: User<O["user"], O["plugins"]>;
}, {
  allowedMediaTypes: string[];
  $Infer: {
    body: {
      email: string;
      password: string;
      callbackURL?: string | undefined;
      rememberMe?: boolean | undefined;
    };
    returned: {
      redirect: boolean;
      token: string;
      url?: string | undefined;
      user: User<O["user"], O["plugins"]>;
    };
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
              description: string;
              properties: {
                redirect: {
                  type: string;
                  enum: boolean[];
                };
                token: {
                  type: string;
                  description: string;
                };
                url: {
                  type: string;
                  nullable: boolean;
                };
                user: {
                  type: string;
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
//#endregion
export { signInEmail, signInSocial };
//# sourceMappingURL=sign-in.d.mts.map