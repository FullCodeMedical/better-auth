import * as better_call0 from "better-call";

//#region src/plugins/one-tap/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    "one-tap": {
      creator: typeof oneTap;
    };
  }
}
interface OneTapOptions {
  /**
   * Disable the signup flow
   *
   * @default false
   */
  disableSignup?: boolean | undefined;
  /**
   * Google Client ID
   *
   * If a client ID is provided in the social provider configuration,
   * it will be used.
   */
  clientId?: string | undefined;
}
declare const oneTap: (options?: OneTapOptions | undefined) => {
  id: "one-tap";
  endpoints: {
    oneTapCallback: better_call0.Endpoint<"/one-tap/callback", "POST", {
      idToken: string;
    }, Record<string, any> | undefined, any, {
      error: string;
    } | {
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
          };
        };
      };
    }, undefined>;
  };
  options: OneTapOptions | undefined;
};
//#endregion
export { OneTapOptions, oneTap };
//# sourceMappingURL=index.d.mts.map