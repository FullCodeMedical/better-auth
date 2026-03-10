import { InferOptionSchema } from "../../types/plugins.mjs";
import "../../types/index.mjs";
import { WalletAddressSchema, schema } from "./schema.mjs";
import { ENSLookupArgs, ENSLookupResult, SIWEVerifyMessageArgs } from "./types.mjs";
import * as better_call0 from "better-call";

//#region src/plugins/siwe/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    siwe: {
      creator: typeof siwe;
    };
  }
}
interface SIWEPluginOptions {
  domain: string;
  emailDomainName?: string | undefined;
  anonymous?: boolean | undefined;
  getNonce: () => Promise<string>;
  verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<boolean>;
  ensLookup?: ((args: ENSLookupArgs) => Promise<ENSLookupResult>) | undefined;
  schema?: InferOptionSchema<typeof schema> | undefined;
}
declare const siwe: (options: SIWEPluginOptions) => {
  id: "siwe";
  schema: WalletAddressSchema;
  endpoints: {
    getSiweNonce: better_call0.Endpoint<"/siwe/nonce", "POST", {
      walletAddress: string;
      chainId?: number | undefined;
    }, Record<string, any> | undefined, any, {
      nonce: string;
    }, better_call0.EndpointMetadata | undefined, undefined>;
    verifySiweMessage: better_call0.Endpoint<"/siwe/verify", "POST", {
      message: string;
      signature: string;
      walletAddress: string;
      chainId?: number | undefined;
      email?: string | undefined;
    }, Record<string, any> | undefined, any, {
      token: string;
      success: boolean;
      user: {
        id: string;
        walletAddress: string;
        chainId: number;
      };
    }, better_call0.EndpointMetadata | undefined, undefined>;
  };
  options: SIWEPluginOptions;
};
//#endregion
export { SIWEPluginOptions, siwe };
//# sourceMappingURL=index.d.mts.map