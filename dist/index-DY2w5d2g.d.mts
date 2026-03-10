import { APIError } from "better-auth/api";
import { Awaitable, BetterAuthPlugin, OAuth2Tokens, User } from "better-auth";
import * as better_call0 from "better-call";

//#region src/saml/algorithms.d.ts
declare const SignatureAlgorithm: {
  readonly RSA_SHA1: "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
  readonly RSA_SHA256: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
  readonly RSA_SHA384: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
  readonly RSA_SHA512: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
  readonly ECDSA_SHA256: "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
  readonly ECDSA_SHA384: "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384";
  readonly ECDSA_SHA512: "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512";
};
declare const DigestAlgorithm: {
  readonly SHA1: "http://www.w3.org/2000/09/xmldsig#sha1";
  readonly SHA256: "http://www.w3.org/2001/04/xmlenc#sha256";
  readonly SHA384: "http://www.w3.org/2001/04/xmldsig-more#sha384";
  readonly SHA512: "http://www.w3.org/2001/04/xmlenc#sha512";
};
declare const KeyEncryptionAlgorithm: {
  readonly RSA_1_5: "http://www.w3.org/2001/04/xmlenc#rsa-1_5";
  readonly RSA_OAEP: "http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p";
  readonly RSA_OAEP_SHA256: "http://www.w3.org/2009/xmlenc11#rsa-oaep";
};
declare const DataEncryptionAlgorithm: {
  readonly TRIPLEDES_CBC: "http://www.w3.org/2001/04/xmlenc#tripledes-cbc";
  readonly AES_128_CBC: "http://www.w3.org/2001/04/xmlenc#aes128-cbc";
  readonly AES_192_CBC: "http://www.w3.org/2001/04/xmlenc#aes192-cbc";
  readonly AES_256_CBC: "http://www.w3.org/2001/04/xmlenc#aes256-cbc";
  readonly AES_128_GCM: "http://www.w3.org/2009/xmlenc11#aes128-gcm";
  readonly AES_192_GCM: "http://www.w3.org/2009/xmlenc11#aes192-gcm";
  readonly AES_256_GCM: "http://www.w3.org/2009/xmlenc11#aes256-gcm";
};
type DeprecatedAlgorithmBehavior = "reject" | "warn" | "allow";
interface AlgorithmValidationOptions {
  onDeprecated?: DeprecatedAlgorithmBehavior;
  allowedSignatureAlgorithms?: string[];
  allowedDigestAlgorithms?: string[];
  allowedKeyEncryptionAlgorithms?: string[];
  allowedDataEncryptionAlgorithms?: string[];
}
//#endregion
//#region src/types.d.ts
interface OIDCMapping {
  id?: string | undefined;
  email?: string | undefined;
  emailVerified?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  extraFields?: Record<string, string> | undefined;
}
interface SAMLMapping {
  id?: string | undefined;
  email?: string | undefined;
  emailVerified?: string | undefined;
  name?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  extraFields?: Record<string, string> | undefined;
}
interface OIDCConfig {
  issuer: string;
  pkce: boolean;
  clientId: string;
  clientSecret: string;
  authorizationEndpoint?: string | undefined;
  discoveryEndpoint: string;
  userInfoEndpoint?: string | undefined;
  scopes?: string[] | undefined;
  overrideUserInfo?: boolean | undefined;
  tokenEndpoint?: string | undefined;
  tokenEndpointAuthentication?: ("client_secret_post" | "client_secret_basic") | undefined;
  jwksEndpoint?: string | undefined;
  mapping?: OIDCMapping | undefined;
}
interface SAMLConfig {
  issuer: string;
  entryPoint: string;
  cert: string;
  callbackUrl: string;
  audience?: string | undefined;
  idpMetadata?: {
    metadata?: string;
    entityID?: string;
    entityURL?: string;
    redirectURL?: string;
    cert?: string;
    privateKey?: string;
    privateKeyPass?: string;
    isAssertionEncrypted?: boolean;
    encPrivateKey?: string;
    encPrivateKeyPass?: string;
    singleSignOnService?: Array<{
      Binding: string;
      Location: string;
    }>;
    singleLogoutService?: Array<{
      Binding: string;
      Location: string;
    }>;
  } | undefined;
  spMetadata: {
    metadata?: string | undefined;
    entityID?: string | undefined;
    binding?: string | undefined;
    privateKey?: string | undefined;
    privateKeyPass?: string | undefined;
    isAssertionEncrypted?: boolean | undefined;
    encPrivateKey?: string | undefined;
    encPrivateKeyPass?: string | undefined;
  };
  wantAssertionsSigned?: boolean | undefined;
  authnRequestsSigned?: boolean | undefined;
  signatureAlgorithm?: string | undefined;
  digestAlgorithm?: string | undefined;
  identifierFormat?: string | undefined;
  privateKey?: string | undefined;
  decryptionPvk?: string | undefined;
  additionalParams?: Record<string, any> | undefined;
  mapping?: SAMLMapping | undefined;
}
type BaseSSOProvider = {
  issuer: string;
  oidcConfig?: OIDCConfig | undefined;
  samlConfig?: SAMLConfig | undefined;
  userId: string;
  providerId: string;
  organizationId?: string | undefined;
  domain: string;
};
type SSOProvider<O extends SSOOptions> = O["domainVerification"] extends {
  enabled: true;
} ? {
  domainVerified: boolean;
} & BaseSSOProvider : BaseSSOProvider;
interface SSOOptions {
  /**
   * custom function to provision a user when they sign in with an SSO provider.
   */
  provisionUser?: ((data: {
    /**
     * The user object from the database
     */
    user: User & Record<string, any>;
    /**
     * The user info object from the provider
     */
    userInfo: Record<string, any>;
    /**
     * The OAuth2 tokens from the provider
     */
    token?: OAuth2Tokens;
    /**
     * The SSO provider
     */
    provider: SSOProvider<SSOOptions>;
    /**
     * Additional data passed to the sign-in request via `additionalData`.
     */
    additionalData?: Record<string, unknown>;
  }) => Awaitable<void>) | undefined;
  /**
   * Organization provisioning options
   */
  organizationProvisioning?: {
    disabled?: boolean;
    defaultRole?: "member" | "admin";
    getRole?: (data: {
      /**
       * The user object from the database
       */
      user: User & Record<string, any>;
      /**
       * The user info object from the provider
       */
      userInfo: Record<string, any>;
      /**
       * The OAuth2 tokens from the provider
       */
      token?: OAuth2Tokens;
      /**
       * The SSO provider
       */
      provider: SSOProvider<SSOOptions>;
    }) => Promise<"member" | "admin">;
  } | undefined;
  /**
   * Default SSO provider configurations for testing.
   * These will take the precedence over the database providers.
   */
  defaultSSO?: Array<{
    /**
     * The domain to match for this default provider.
     * This is only used to match incoming requests to this default provider.
     */
    domain: string;
    /**
     * The provider ID to use
     */
    providerId: string;
    /**
     * SAML configuration
     */
    samlConfig?: SAMLConfig;
    /**
     * OIDC configuration
     */
    oidcConfig?: OIDCConfig;
  }> | undefined;
  /**
   * Override user info with the provider info.
   * @default false
   */
  defaultOverrideUserInfo?: boolean | undefined;
  /**
   * Disable implicit sign up for new users. When set to true for the provider,
   * sign-in need to be called with with requestSignUp as true to create new users.
   */
  disableImplicitSignUp?: boolean | undefined;
  /**
   * The model name for the SSO provider table. Defaults to "ssoProvider".
   */
  modelName?: string;
  /**
   * Map fields
   *
   * @example
   * ```ts
   * {
   *  samlConfig: "saml_config"
   * }
   * ```
   */
  fields?: {
    issuer?: string | undefined;
    oidcConfig?: string | undefined;
    samlConfig?: string | undefined;
    userId?: string | undefined;
    providerId?: string | undefined;
    organizationId?: string | undefined;
    domain?: string | undefined;
  };
  /**
   * Configure the maximum number of SSO providers a user can register.
   * You can also pass a function that returns a number.
   * Set to 0 to disable SSO provider registration.
   *
   * @example
   * ```ts
   * providersLimit: async (user) => {
   *   const plan = await getUserPlan(user);
   *   return plan.name === "pro" ? 10 : 1;
   * }
   * ```
   * @default 10
   */
  providersLimit?: (number | ((user: User) => Awaitable<number>)) | undefined;
  /**
   * Trust the email verified flag from the provider.
   *
   * ⚠️ Use this with caution — it can lead to account takeover if misused. Only enable it if users **cannot freely register new providers**. You can
   * prevent that by using `disabledPaths` or other safeguards to block provider registration from the client.
   *
   * If you want to allow account linking for specific trusted providers, enable the `accountLinking` option in your auth config and specify those
   * providers in the `trustedProviders` list.
   *
   * @default false
   *
   * @deprecated This option is discouraged for new projects. Relying on provider-level `email_verified` is a weaker
   * trust signal compared to using `trustedProviders` in `accountLinking` or enabling `domainVerification` for SSO.
   * Existing configurations will continue to work, but new integrations should use explicit trust mechanisms.
   * This option may be removed in a future major version.
   */
  trustEmailVerified?: boolean | undefined;
  /**
   * Enable domain verification on SSO providers
   *
   * When this option is enabled, new SSO providers will require the associated domain to be verified by the owner
   * prior to allowing sign-ins.
   */
  domainVerification?: {
    /**
     * Enables or disables the domain verification feature
     */
    enabled?: boolean;
    /**
     * Prefix used to generate the domain verification token.
     * An underscore is automatically prepended to follow DNS
     * infrastructure subdomain conventions (RFC 8552), so do
     * not include a leading underscore.
     *
     * @default "better-auth-token"
     */
    tokenPrefix?: string;
  };
  /**
   * A shared redirect URI used by all OIDC providers instead of
   * per-provider callback URLs. Can be a path or a full URL.
   */
  redirectURI?: string;
  /**
   * SAML security options for AuthnRequest/InResponseTo validation.
   * This prevents unsolicited responses, replay attacks, and cross-provider injection.
   */
  saml?: {
    /**
     * Enable InResponseTo validation for SP-initiated SAML flows.
     * When enabled, AuthnRequest IDs are tracked and validated against SAML responses.
     *
     * Storage behavior:
     * - Uses `secondaryStorage` (e.g., Redis) if configured in your auth options
     * - Falls back to the verification table in the database otherwise
     *
     * This works correctly in serverless environments without any additional configuration.
     *
     * @default false
     */
    enableInResponseToValidation?: boolean;
    /**
     * Allow IdP-initiated SSO (unsolicited SAML responses).
     * When true, responses without InResponseTo are accepted.
     * When false, all responses must correlate to a stored AuthnRequest.
     *
     * Only applies when InResponseTo validation is enabled.
     *
     * @default true
     */
    allowIdpInitiated?: boolean;
    /**
     * TTL for AuthnRequest records in milliseconds.
     * Requests older than this will be rejected.
     *
     * Only applies when InResponseTo validation is enabled.
     *
     * @default 300000 (5 minutes)
     */
    requestTTL?: number;
    /**
     * Clock skew tolerance for SAML assertion timestamp validation in milliseconds.
     * Allows for minor time differences between IdP and SP servers.
     *
     * Defaults to 300000 (5 minutes) to accommodate:
     * - Network latency and processing time
     * - Clock synchronization differences (NTP drift)
     * - Distributed systems across timezones
     *
     * For stricter security, reduce to 1-2 minutes (60000-120000).
     * For highly distributed systems, increase up to 10 minutes (600000).
     *
     * @default 300000 (5 minutes)
     */
    clockSkew?: number;
    /**
     * Require timestamp conditions (NotBefore/NotOnOrAfter) in SAML assertions.
     * When enabled, assertions without timestamp conditions will be rejected.
     *
     * When disabled (default), assertions without timestamps are accepted
     * but a warning is logged.
     *
     * **SAML Spec Notes:**
     * - SAML 2.0 Core: Timestamps are OPTIONAL
     * - SAML2Int (enterprise profile): Timestamps are REQUIRED
     *
     * **Recommendation:** Enable for enterprise/production deployments
     * where your IdP follows SAML2Int (Okta, Azure AD, OneLogin, etc.)
     *
     * @default false
     */
    requireTimestamps?: boolean;
    /**
     * Algorithm validation options for SAML responses.
     *
     * Controls behavior when deprecated algorithms (SHA-1, RSA1_5, 3DES)
     * are detected in SAML responses.
     *
     * @example
     * ```ts
     * algorithms: {
     *   onDeprecated: "reject" // Reject deprecated algorithms
     * }
     * ```
     */
    algorithms?: AlgorithmValidationOptions;
    /**
     * Maximum allowed size for SAML responses in bytes.
     *
     * @default 262144 (256KB)
     */
    maxResponseSize?: number;
    /**
     * Maximum allowed size for IdP metadata XML in bytes.
     *
     * @default 102400 (100KB)
     */
    maxMetadataSize?: number;
    /**
     * Enable SAML Single Logout
     * @default false
     */
    enableSingleLogout?: boolean;
    /**
     * TTL for LogoutRequest records in milliseconds
     * @default 300000 (5 minutes)
     */
    logoutRequestTTL?: number;
    /**
     * Require signed LogoutRequests from IdP
     * @default false
     */
    wantLogoutRequestSigned?: boolean;
    /**
     * Require signed LogoutResponses from IdP
     * @default false
     */
    wantLogoutResponseSigned?: boolean;
  };
}
//#endregion
//#region src/routes/domain-verification.d.ts
declare const requestDomainVerification: (options: SSOOptions) => better_call0.Endpoint<"/sso/request-domain-verification", "POST", {
  providerId: string;
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
  domainVerificationToken: string;
}, {
  openapi: {
    summary: string;
    description: string;
    responses: {
      "404": {
        description: string;
      };
      "409": {
        description: string;
      };
      "201": {
        description: string;
      };
    };
  };
}, undefined>;
declare const verifyDomain: (options: SSOOptions) => better_call0.Endpoint<"/sso/verify-domain", "POST", {
  providerId: string;
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
}>>], void, {
  openapi: {
    summary: string;
    description: string;
    responses: {
      "404": {
        description: string;
      };
      "409": {
        description: string;
      };
      "502": {
        description: string;
      };
      "204": {
        description: string;
      };
    };
  };
}, undefined>;
//#endregion
//#region src/routes/providers.d.ts
declare const listSSOProviders: () => better_call0.Endpoint<"/sso/providers", "GET", undefined, Record<string, any> | undefined, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  providers: {
    providerId: string;
    type: string;
    issuer: string;
    domain: string;
    organizationId: string | null;
    domainVerified: boolean;
    oidcConfig: {
      discoveryEndpoint: string;
      clientIdLastFour: string;
      pkce: boolean;
      authorizationEndpoint: string | undefined;
      tokenEndpoint: string | undefined;
      userInfoEndpoint: string | undefined;
      jwksEndpoint: string | undefined;
      scopes: string[] | undefined;
      tokenEndpointAuthentication: "client_secret_post" | "client_secret_basic" | undefined;
    } | undefined;
    samlConfig: {
      entryPoint: string;
      callbackUrl: string;
      audience: string | undefined;
      wantAssertionsSigned: boolean | undefined;
      authnRequestsSigned: boolean | undefined;
      identifierFormat: string | undefined;
      signatureAlgorithm: string | undefined;
      digestAlgorithm: string | undefined;
      certificate: {
        fingerprintSha256: string;
        notBefore: string;
        notAfter: string;
        publicKeyAlgorithm: string;
      } | {
        error: string;
      };
    } | undefined;
    spMetadataUrl: string;
  }[];
}, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "200": {
        description: string;
      };
    };
  };
}, undefined>;
declare const getSSOProvider: () => better_call0.Endpoint<"/sso/get-provider", "GET", undefined, {
  providerId: string;
}, [better_call0.Middleware<(inputContext: Record<string, any>) => Promise<{
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
  providerId: string;
  type: string;
  issuer: string;
  domain: string;
  organizationId: string | null;
  domainVerified: boolean;
  oidcConfig: {
    discoveryEndpoint: string;
    clientIdLastFour: string;
    pkce: boolean;
    authorizationEndpoint: string | undefined;
    tokenEndpoint: string | undefined;
    userInfoEndpoint: string | undefined;
    jwksEndpoint: string | undefined;
    scopes: string[] | undefined;
    tokenEndpointAuthentication: "client_secret_post" | "client_secret_basic" | undefined;
  } | undefined;
  samlConfig: {
    entryPoint: string;
    callbackUrl: string;
    audience: string | undefined;
    wantAssertionsSigned: boolean | undefined;
    authnRequestsSigned: boolean | undefined;
    identifierFormat: string | undefined;
    signatureAlgorithm: string | undefined;
    digestAlgorithm: string | undefined;
    certificate: {
      fingerprintSha256: string;
      notBefore: string;
      notAfter: string;
      publicKeyAlgorithm: string;
    } | {
      error: string;
    };
  } | undefined;
  spMetadataUrl: string;
}, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "200": {
        description: string;
      };
      "404": {
        description: string;
      };
      "403": {
        description: string;
      };
    };
  };
}, undefined>;
declare const updateSSOProvider: (options: SSOOptions) => better_call0.Endpoint<"/sso/update-provider", "POST", {
  providerId: string;
  issuer?: string | undefined;
  domain?: string | undefined;
  oidcConfig?: {
    clientId?: string | undefined;
    clientSecret?: string | undefined;
    authorizationEndpoint?: string | undefined;
    tokenEndpoint?: string | undefined;
    userInfoEndpoint?: string | undefined;
    tokenEndpointAuthentication?: "client_secret_post" | "client_secret_basic" | undefined;
    jwksEndpoint?: string | undefined;
    discoveryEndpoint?: string | undefined;
    scopes?: string[] | undefined;
    pkce?: boolean | undefined;
    overrideUserInfo?: boolean | undefined;
    mapping?: {
      id?: string | undefined;
      email?: string | undefined;
      emailVerified?: string | undefined;
      name?: string | undefined;
      image?: string | undefined;
      extraFields?: Record<string, any> | undefined;
    } | undefined;
  } | undefined;
  samlConfig?: {
    entryPoint?: string | undefined;
    cert?: string | undefined;
    callbackUrl?: string | undefined;
    audience?: string | undefined;
    idpMetadata?: {
      metadata?: string | undefined;
      entityID?: string | undefined;
      cert?: string | undefined;
      privateKey?: string | undefined;
      privateKeyPass?: string | undefined;
      isAssertionEncrypted?: boolean | undefined;
      encPrivateKey?: string | undefined;
      encPrivateKeyPass?: string | undefined;
      singleSignOnService?: {
        Binding: string;
        Location: string;
      }[] | undefined;
    } | undefined;
    spMetadata?: {
      metadata?: string | undefined;
      entityID?: string | undefined;
      binding?: string | undefined;
      privateKey?: string | undefined;
      privateKeyPass?: string | undefined;
      isAssertionEncrypted?: boolean | undefined;
      encPrivateKey?: string | undefined;
      encPrivateKeyPass?: string | undefined;
    } | undefined;
    wantAssertionsSigned?: boolean | undefined;
    authnRequestsSigned?: boolean | undefined;
    signatureAlgorithm?: string | undefined;
    digestAlgorithm?: string | undefined;
    identifierFormat?: string | undefined;
    privateKey?: string | undefined;
    decryptionPvk?: string | undefined;
    additionalParams?: Record<string, any> | undefined;
    mapping?: {
      id?: string | undefined;
      email?: string | undefined;
      emailVerified?: string | undefined;
      name?: string | undefined;
      firstName?: string | undefined;
      lastName?: string | undefined;
      extraFields?: Record<string, any> | undefined;
    } | undefined;
  } | undefined;
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
  providerId: string;
  type: string;
  issuer: string;
  domain: string;
  organizationId: string | null;
  domainVerified: boolean;
  oidcConfig: {
    discoveryEndpoint: string;
    clientIdLastFour: string;
    pkce: boolean;
    authorizationEndpoint: string | undefined;
    tokenEndpoint: string | undefined;
    userInfoEndpoint: string | undefined;
    jwksEndpoint: string | undefined;
    scopes: string[] | undefined;
    tokenEndpointAuthentication: "client_secret_post" | "client_secret_basic" | undefined;
  } | undefined;
  samlConfig: {
    entryPoint: string;
    callbackUrl: string;
    audience: string | undefined;
    wantAssertionsSigned: boolean | undefined;
    authnRequestsSigned: boolean | undefined;
    identifierFormat: string | undefined;
    signatureAlgorithm: string | undefined;
    digestAlgorithm: string | undefined;
    certificate: {
      fingerprintSha256: string;
      notBefore: string;
      notAfter: string;
      publicKeyAlgorithm: string;
    } | {
      error: string;
    };
  } | undefined;
  spMetadataUrl: string;
}, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "200": {
        description: string;
      };
      "404": {
        description: string;
      };
      "403": {
        description: string;
      };
    };
  };
}, undefined>;
declare const deleteSSOProvider: () => better_call0.Endpoint<"/sso/delete-provider", "POST", {
  providerId: string;
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
  success: boolean;
}, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "200": {
        description: string;
      };
      "404": {
        description: string;
      };
      "403": {
        description: string;
      };
    };
  };
}, undefined>;
//#endregion
//#region src/routes/sso.d.ts
interface TimestampValidationOptions {
  clockSkew?: number;
  requireTimestamps?: boolean;
  logger?: {
    warn: (message: string, data?: Record<string, unknown>) => void;
  };
}
/** Conditions extracted from SAML assertion */
interface SAMLConditions {
  notBefore?: string;
  notOnOrAfter?: string;
}
/**
 * Validates SAML assertion timestamp conditions (NotBefore/NotOnOrAfter).
 * Prevents acceptance of expired or future-dated assertions.
 * @throws {APIError} If timestamps are invalid, expired, or not yet valid
 */
declare function validateSAMLTimestamp(conditions: SAMLConditions | undefined, options?: TimestampValidationOptions): void;
declare const spMetadata: (options?: SSOOptions) => better_call0.Endpoint<"/sso/saml2/sp/metadata", "GET", undefined, {
  providerId: string;
  format?: "json" | "xml" | undefined;
}, [], Response, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "200": {
        description: string;
      };
    };
  };
}, undefined>;
declare const registerSSOProvider: <O extends SSOOptions>(options: O) => better_call0.Endpoint<"/sso/register", "POST", {
  providerId: string;
  issuer: string;
  domain: string;
  oidcConfig?: {
    clientId: string;
    clientSecret: string;
    authorizationEndpoint?: string | undefined;
    tokenEndpoint?: string | undefined;
    userInfoEndpoint?: string | undefined;
    tokenEndpointAuthentication?: "client_secret_post" | "client_secret_basic" | undefined;
    jwksEndpoint?: string | undefined;
    discoveryEndpoint?: string | undefined;
    skipDiscovery?: boolean | undefined;
    scopes?: string[] | undefined;
    pkce?: boolean | undefined;
    mapping?: {
      id: string;
      email: string;
      name: string;
      emailVerified?: string | undefined;
      image?: string | undefined;
      extraFields?: Record<string, any> | undefined;
    } | undefined;
  } | undefined;
  samlConfig?: {
    entryPoint: string;
    cert: string;
    callbackUrl: string;
    spMetadata: {
      metadata?: string | undefined;
      entityID?: string | undefined;
      binding?: string | undefined;
      privateKey?: string | undefined;
      privateKeyPass?: string | undefined;
      isAssertionEncrypted?: boolean | undefined;
      encPrivateKey?: string | undefined;
      encPrivateKeyPass?: string | undefined;
    };
    audience?: string | undefined;
    idpMetadata?: {
      metadata?: string | undefined;
      entityID?: string | undefined;
      cert?: string | undefined;
      privateKey?: string | undefined;
      privateKeyPass?: string | undefined;
      isAssertionEncrypted?: boolean | undefined;
      encPrivateKey?: string | undefined;
      encPrivateKeyPass?: string | undefined;
      singleSignOnService?: {
        Binding: string;
        Location: string;
      }[] | undefined;
    } | undefined;
    wantAssertionsSigned?: boolean | undefined;
    authnRequestsSigned?: boolean | undefined;
    signatureAlgorithm?: string | undefined;
    digestAlgorithm?: string | undefined;
    identifierFormat?: string | undefined;
    privateKey?: string | undefined;
    decryptionPvk?: string | undefined;
    additionalParams?: Record<string, any> | undefined;
    mapping?: {
      id: string;
      email: string;
      name: string;
      emailVerified?: string | undefined;
      firstName?: string | undefined;
      lastName?: string | undefined;
      extraFields?: Record<string, any> | undefined;
    } | undefined;
  } | undefined;
  organizationId?: string | undefined;
  overrideUserInfo?: boolean | undefined;
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
}>>], O["domainVerification"] extends {
  enabled: true;
} ? {
  redirectURI: string;
  oidcConfig: OIDCConfig | null;
  samlConfig: SAMLConfig | null;
} & Omit<SSOProvider<O>, "oidcConfig" | "samlConfig"> & {
  domainVerified: boolean;
  domainVerificationToken: string;
} : {
  redirectURI: string;
  oidcConfig: OIDCConfig | null;
  samlConfig: SAMLConfig | null;
} & Omit<SSOProvider<O>, "oidcConfig" | "samlConfig">, {
  openapi: {
    operationId: string;
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
                issuer: {
                  type: string;
                  format: string;
                  description: string;
                };
                domain: {
                  type: string;
                  description: string;
                };
                domainVerified: {
                  type: string;
                  description: string;
                };
                domainVerificationToken: {
                  type: string;
                  description: string;
                };
                oidcConfig: {
                  type: string;
                  properties: {
                    issuer: {
                      type: string;
                      format: string;
                      description: string;
                    };
                    pkce: {
                      type: string;
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
                    authorizationEndpoint: {
                      type: string;
                      format: string;
                      nullable: boolean;
                      description: string;
                    };
                    discoveryEndpoint: {
                      type: string;
                      format: string;
                      description: string;
                    };
                    userInfoEndpoint: {
                      type: string;
                      format: string;
                      nullable: boolean;
                      description: string;
                    };
                    scopes: {
                      type: string;
                      items: {
                        type: string;
                      };
                      nullable: boolean;
                      description: string;
                    };
                    tokenEndpoint: {
                      type: string;
                      format: string;
                      nullable: boolean;
                      description: string;
                    };
                    tokenEndpointAuthentication: {
                      type: string;
                      enum: string[];
                      nullable: boolean;
                      description: string;
                    };
                    jwksEndpoint: {
                      type: string;
                      format: string;
                      nullable: boolean;
                      description: string;
                    };
                    mapping: {
                      type: string;
                      nullable: boolean;
                      properties: {
                        id: {
                          type: string;
                          description: string;
                        };
                        email: {
                          type: string;
                          description: string;
                        };
                        emailVerified: {
                          type: string;
                          nullable: boolean;
                          description: string;
                        };
                        name: {
                          type: string;
                          description: string;
                        };
                        image: {
                          type: string;
                          nullable: boolean;
                          description: string;
                        };
                        extraFields: {
                          type: string;
                          additionalProperties: {
                            type: string;
                          };
                          nullable: boolean;
                          description: string;
                        };
                      };
                      required: string[];
                    };
                  };
                  required: string[];
                  description: string;
                };
                organizationId: {
                  type: string;
                  nullable: boolean;
                  description: string;
                };
                userId: {
                  type: string;
                  description: string;
                };
                providerId: {
                  type: string;
                  description: string;
                };
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
declare const signInSSO: (options?: SSOOptions) => better_call0.Endpoint<"/sign-in/sso", "POST", {
  callbackURL: string;
  email?: string | undefined;
  organizationSlug?: string | undefined;
  providerId?: string | undefined;
  domain?: string | undefined;
  errorCallbackURL?: string | undefined;
  newUserCallbackURL?: string | undefined;
  scopes?: string[] | undefined;
  loginHint?: string | undefined;
  requestSignUp?: boolean | undefined;
  additionalData?: Record<string, unknown> | undefined;
  providerType?: "saml" | "oidc" | undefined;
}, Record<string, any> | undefined, [], {
  url: string;
  redirect: boolean;
}, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object";
            properties: {
              email: {
                type: string;
                description: string;
              };
              issuer: {
                type: string;
                description: string;
              };
              providerId: {
                type: string;
                description: string;
              };
              callbackURL: {
                type: string;
                description: string;
              };
              errorCallbackURL: {
                type: string;
                description: string;
              };
              newUserCallbackURL: {
                type: string;
                description: string;
              };
              loginHint: {
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
                url: {
                  type: string;
                  format: string;
                  description: string;
                };
                redirect: {
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
declare const callbackSSO: (options?: SSOOptions) => better_call0.Endpoint<"/sso/callback/:providerId", "GET", undefined, {
  state: string;
  code?: string | undefined;
  error?: string | undefined;
  error_description?: string | undefined;
}, [], void, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "302": {
        description: string;
      };
    };
  };
  scope: "server";
}, undefined>;
/**
 * Shared OIDC callback endpoint (no `:providerId` in path).
 * Used when `options.redirectURI` is set — the `providerId` is read from
 * the OAuth state instead of the URL path.
 */
declare const callbackSSOShared: (options?: SSOOptions) => better_call0.Endpoint<"/sso/callback", "GET", undefined, {
  state: string;
  code?: string | undefined;
  error?: string | undefined;
  error_description?: string | undefined;
}, [], void, {
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "302": {
        description: string;
      };
    };
  };
  scope: "server";
}, undefined>;
declare const callbackSSOSAML: (options?: SSOOptions) => better_call0.Endpoint<"/sso/saml2/callback/:providerId", ("GET" | "POST")[], {
  SAMLResponse: string;
  RelayState?: string | undefined;
} | undefined, {
  RelayState?: string | undefined;
} | undefined, [], never, {
  allowedMediaTypes: string[];
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "302": {
        description: string;
      };
      "400": {
        description: string;
      };
      "401": {
        description: string;
      };
    };
  };
  scope: "server";
}, undefined>;
declare const acsEndpoint: (options?: SSOOptions) => better_call0.Endpoint<"/sso/saml2/sp/acs/:providerId", "POST", {
  SAMLResponse: string;
  RelayState?: string | undefined;
}, Record<string, any> | undefined, [], never, {
  allowedMediaTypes: string[];
  openapi: {
    operationId: string;
    summary: string;
    description: string;
    responses: {
      "302": {
        description: string;
      };
    };
  };
  scope: "server";
}, undefined>;
declare const sloEndpoint: (options?: SSOOptions) => better_call0.Endpoint<"/sso/saml2/sp/slo/:providerId", ("GET" | "POST")[], {
  SAMLRequest?: string | undefined;
  SAMLResponse?: string | undefined;
  RelayState?: string | undefined;
  SigAlg?: string | undefined;
  Signature?: string | undefined;
} | undefined, {
  SAMLRequest?: string | undefined;
  SAMLResponse?: string | undefined;
  RelayState?: string | undefined;
  SigAlg?: string | undefined;
  Signature?: string | undefined;
} | undefined, [], void | Response, {
  allowedMediaTypes: string[];
  scope: "server";
}, undefined>;
declare const initiateSLO: (options?: SSOOptions) => better_call0.Endpoint<"/sso/saml2/logout/:providerId", "POST", {
  callbackURL?: string | undefined;
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
}>>], never, {
  readonly scope: "server";
}, undefined>;
//#endregion
//#region src/constants.d.ts
/**
 * Default clock skew tolerance (5 minutes).
 * Allows for minor time differences between IdP and SP servers.
 *
 * Accommodates:
 * - Network latency and processing time
 * - Clock synchronization differences (NTP drift)
 * - Distributed systems across timezones
 */
declare const DEFAULT_CLOCK_SKEW_MS: number;
/**
 * Default maximum size for SAML responses (256 KB).
 * Protects against memory exhaustion from oversized SAML payloads.
 */
declare const DEFAULT_MAX_SAML_RESPONSE_SIZE: number;
/**
 * Default maximum size for IdP metadata (100 KB).
 * Protects against oversized metadata documents.
 */
declare const DEFAULT_MAX_SAML_METADATA_SIZE: number;
//#endregion
//#region src/oidc/types.d.ts
/**
 * OIDC Discovery Types
 *
 * Types for the OIDC discovery document and hydrated configuration.
 * Based on OpenID Connect Discovery 1.0 specification.
 *
 * @see https://openid.net/specs/openid-connect-discovery-1_0.html
 */
/**
 * Raw OIDC Discovery Document as returned by the IdP's
 * .well-known/openid-configuration endpoint.
 *
 * Required fields for Better Auth's OIDC support:
 * - issuer
 * - authorization_endpoint
 * - token_endpoint
 * - jwks_uri (required for ID token validation)
 *
 */
interface OIDCDiscoveryDocument {
  /** REQUIRED. URL using the https scheme that the OP asserts as its Issuer Identifier. */
  issuer: string;
  /** REQUIRED. URL of the OP's OAuth 2.0 Authorization Endpoint. */
  authorization_endpoint: string;
  /**
   * REQUIRED (spec says "unless only implicit flow is used").
   * URL of the OP's OAuth 2.0 Token Endpoint.
   * We only support authorization code flow.
   */
  token_endpoint: string;
  /** REQUIRED. URL of the OP's JSON Web Key Set document for ID token validation. */
  jwks_uri: string;
  /** RECOMMENDED. URL of the OP's UserInfo Endpoint. */
  userinfo_endpoint?: string;
  /**
   * OPTIONAL. JSON array containing a list of Client Authentication methods
   * supported by this Token Endpoint.
   * Default: ["client_secret_basic"]
   */
  token_endpoint_auth_methods_supported?: string[];
  /** OPTIONAL. JSON array containing a list of the OAuth 2.0 scope values that this server supports. */
  scopes_supported?: string[];
  /** OPTIONAL. JSON array containing a list of the OAuth 2.0 response_type values that this OP supports. */
  response_types_supported?: string[];
  /** OPTIONAL. JSON array containing a list of the Subject Identifier types that this OP supports. */
  subject_types_supported?: string[];
  /** OPTIONAL. JSON array containing a list of the JWS signing algorithms supported by the OP. */
  id_token_signing_alg_values_supported?: string[];
  /** OPTIONAL. JSON array containing a list of the claim names that the OP may supply values for. */
  claims_supported?: string[];
  /** OPTIONAL. URL of a page containing human-readable information about the OP. */
  service_documentation?: string;
  /** OPTIONAL. Boolean value specifying whether the OP supports use of the claims parameter. */
  claims_parameter_supported?: boolean;
  /** OPTIONAL. Boolean value specifying whether the OP supports use of the request parameter. */
  request_parameter_supported?: boolean;
  /** OPTIONAL. Boolean value specifying whether the OP supports use of the request_uri parameter. */
  request_uri_parameter_supported?: boolean;
  /** OPTIONAL. Boolean value specifying whether the OP requires any request_uri values to be pre-registered. */
  require_request_uri_registration?: boolean;
  /** OPTIONAL. URL of the OP's end session endpoint. */
  end_session_endpoint?: string;
  /** OPTIONAL. URL of the OP's revocation endpoint. */
  revocation_endpoint?: string;
  /** OPTIONAL. URL of the OP's introspection endpoint. */
  introspection_endpoint?: string;
  /** OPTIONAL. JSON array of PKCE code challenge methods supported (e.g., "S256", "plain"). */
  code_challenge_methods_supported?: string[];
  /** Allow additional fields from the discovery document */
  [key: string]: unknown;
}
/**
 * Error codes for OIDC discovery operations.
 */
type DiscoveryErrorCode = /** Request to discovery endpoint timed out */"discovery_timeout" /** Discovery endpoint returned 404 or similar */ | "discovery_not_found" /** Discovery endpoint returned invalid JSON */ | "discovery_invalid_json" /** Discovery URL is invalid or malformed */ | "discovery_invalid_url" /** Discovery URL is not trusted by the trusted origins configuration */ | "discovery_untrusted_origin" /** Discovery document issuer doesn't match configured issuer */ | "issuer_mismatch" /** Discovery document is missing required fields */ | "discovery_incomplete" /** IdP only advertises token auth methods that Better Auth doesn't currently support */ | "unsupported_token_auth_method" /** Catch-all for unexpected errors */ | "discovery_unexpected_error";
/**
 * Custom error class for OIDC discovery failures.
 * Can be caught and mapped to APIError at the edge.
 */
declare class DiscoveryError extends Error {
  readonly code: DiscoveryErrorCode;
  readonly details?: Record<string, unknown>;
  constructor(code: DiscoveryErrorCode, message: string, details?: Record<string, unknown>, options?: {
    cause?: unknown;
  });
}
/**
 * Hydrated OIDC configuration after discovery.
 * This is the normalized shape that gets persisted to the database
 * or merged into provider config at runtime.
 *
 * Field names are camelCase to match Better Auth conventions.
 */
interface HydratedOIDCConfig {
  /** The issuer URL (validated to match configured issuer) */
  issuer: string;
  /** The discovery endpoint URL */
  discoveryEndpoint: string;
  /** URL of the authorization endpoint */
  authorizationEndpoint: string;
  /** URL of the token endpoint */
  tokenEndpoint: string;
  /** URL of the JWKS endpoint */
  jwksEndpoint: string;
  /** URL of the userinfo endpoint (optional) */
  userInfoEndpoint?: string;
  /** Token endpoint authentication method */
  tokenEndpointAuthentication?: "client_secret_basic" | "client_secret_post";
  /** Scopes supported by the IdP */
  scopesSupported?: string[];
}
/**
 * Parameters for the discoverOIDCConfig function.
 */
interface DiscoverOIDCConfigParams {
  /** The issuer URL to discover configuration from */
  issuer: string;
  /**
   * Optional existing configuration.
   * Values provided here will override discovered values.
   */
  existingConfig?: Partial<HydratedOIDCConfig>;
  /**
   * Optional custom discovery endpoint URL.
   * If not provided, defaults to <issuer>/.well-known/openid-configuration
   */
  discoveryEndpoint?: string;
  /**
   * Optional timeout in milliseconds for the discovery request.
   * @default 10000 (10 seconds)
   */
  timeout?: number;
  /**
   * Trusted origin predicate. See "trustedOrigins" option
   * @param url the url to test
   * @returns {boolean} return true for urls that belong to a trusted origin and false otherwise
   */
  isTrustedOrigin: (url: string) => boolean;
}
/**
 * Required fields that must be present in a valid discovery document.
 */
declare const REQUIRED_DISCOVERY_FIELDS: readonly ["issuer", "authorization_endpoint", "token_endpoint", "jwks_uri"];
type RequiredDiscoveryField = (typeof REQUIRED_DISCOVERY_FIELDS)[number];
//#endregion
//#region src/oidc/discovery.d.ts
/**
 * Main entry point: Discover and hydrate OIDC configuration from an issuer.
 *
 * This function:
 * 1. Computes the discovery URL from the issuer
 * 2. Validates the discovery URL
 * 3. Fetches the discovery document
 * 4. Validates the discovery document (issuer match + required fields)
 * 5. Normalizes URLs
 * 6. Selects token endpoint auth method
 * 7. Merges with existing config (existing values take precedence)
 *
 * @param params - Discovery parameters
 * @param isTrustedOrigin - Origin verification tester function
 * @returns Hydrated OIDC configuration ready for persistence
 * @throws DiscoveryError on any failure
 */
declare function discoverOIDCConfig(params: DiscoverOIDCConfigParams): Promise<HydratedOIDCConfig>;
/**
 * Compute the discovery URL from an issuer URL.
 *
 * Per OIDC Discovery spec, the discovery document is located at:
 * <issuer>/.well-known/openid-configuration
 *
 * Handles trailing slashes correctly.
 */
declare function computeDiscoveryUrl(issuer: string): string;
/**
 * Validate a discovery URL before fetching.
 *
 * @param url - The discovery URL to validate
 * @param isTrustedOrigin - Origin verification tester function
 * @throws DiscoveryError if URL is invalid
 */
declare function validateDiscoveryUrl(url: string, isTrustedOrigin: DiscoverOIDCConfigParams["isTrustedOrigin"]): void;
/**
 * Fetch the OIDC discovery document from the IdP.
 *
 * @param url - The discovery endpoint URL
 * @param timeout - Request timeout in milliseconds
 * @returns The parsed discovery document
 * @throws DiscoveryError on network errors, timeouts, or invalid responses
 */
declare function fetchDiscoveryDocument(url: string, timeout?: number): Promise<OIDCDiscoveryDocument>;
/**
 * Validate a discovery document.
 *
 * Checks:
 * 1. All required fields are present
 * 2. Issuer matches the configured issuer (case-sensitive, exact match)
 *
 * Invariant: If this function returns without throwing, the document is safe
 * to use for hydrating OIDC config (required fields present, issuer matches
 * configured value, basic structural sanity verified).
 *
 * @param doc - The discovery document to validate
 * @param configuredIssuer - The expected issuer value
 * @throws DiscoveryError if validation fails
 */
declare function validateDiscoveryDocument(doc: OIDCDiscoveryDocument, configuredIssuer: string): void;
/**
 * Normalize URLs in the discovery document.
 *
 * @param document - The discovery document
 * @param issuer - The base issuer URL
 * @param isTrustedOrigin - Origin verification tester function
 * @returns The normalized discovery document
 */
declare function normalizeDiscoveryUrls(document: OIDCDiscoveryDocument, issuer: string, isTrustedOrigin: DiscoverOIDCConfigParams["isTrustedOrigin"]): OIDCDiscoveryDocument;
/**
 * Normalize a single URL endpoint.
 *
 * @param name - The endpoint name (e.g token_endpoint)
 * @param endpoint - The endpoint URL to normalize
 * @param issuer - The base issuer URL
 * @returns The normalized endpoint URL
 */
declare function normalizeUrl(name: string, endpoint: string, issuer: string): string;
/**
 * Select the token endpoint authentication method.
 *
 * @param doc - The discovery document
 * @param existing - Existing authentication method from config
 * @returns The selected authentication method
 */
declare function selectTokenEndpointAuthMethod(doc: OIDCDiscoveryDocument, existing?: "client_secret_basic" | "client_secret_post"): "client_secret_basic" | "client_secret_post";
/**
 * Check if a provider configuration needs runtime discovery.
 *
 * Returns true if we need discovery at runtime to complete the token exchange
 * and validation. Specifically checks for:
 * - `tokenEndpoint` - required for exchanging authorization code for tokens
 * - `jwksEndpoint` - required for validating ID token signatures
 * - `authorizationEndpoint` - required for redirecting users to the IdP for login
 *
 * @param config - Partial OIDC config from the provider
 * @returns true if runtime discovery should be performed
 */
declare function needsRuntimeDiscovery(config: Partial<HydratedOIDCConfig> | undefined): boolean;
//#endregion
//#region src/sso-state.d.ts
/**
 * Returns the `additionalData` passed by the client at SSO sign-in time.
 * Available in server-side hooks during both OIDC and SAML SSO callbacks.
 * Returns `undefined` outside of an SSO callback request.
 *
 * @example
 * const data = await getSSOState<{ referralCode?: string }>();
 */
declare function getSSOState<T extends Record<string, unknown> = Record<string, unknown>>(): Promise<T | undefined>;
//#endregion
//#region src/index.d.ts
declare module "@better-auth/core" {
  interface BetterAuthPluginRegistry<AuthOptions, Options> {
    sso: {
      creator: typeof sso;
    };
  }
}
type DomainVerificationEndpoints = {
  requestDomainVerification: ReturnType<typeof requestDomainVerification>;
  verifyDomain: ReturnType<typeof verifyDomain>;
};
type SSOEndpoints<O extends SSOOptions> = {
  spMetadata: ReturnType<typeof spMetadata>;
  registerSSOProvider: ReturnType<typeof registerSSOProvider<O>>;
  signInSSO: ReturnType<typeof signInSSO>;
  callbackSSO: ReturnType<typeof callbackSSO>;
  callbackSSOShared: ReturnType<typeof callbackSSOShared>;
  callbackSSOSAML: ReturnType<typeof callbackSSOSAML>;
  acsEndpoint: ReturnType<typeof acsEndpoint>;
  sloEndpoint: ReturnType<typeof sloEndpoint>;
  initiateSLO: ReturnType<typeof initiateSLO>;
  listSSOProviders: ReturnType<typeof listSSOProviders>;
  getSSOProvider: ReturnType<typeof getSSOProvider>;
  updateSSOProvider: ReturnType<typeof updateSSOProvider>;
  deleteSSOProvider: ReturnType<typeof deleteSSOProvider>;
};
type SSOPlugin<O extends SSOOptions> = {
  id: "sso";
  endpoints: SSOEndpoints<O> & (O extends {
    domainVerification: {
      enabled: true;
    };
  } ? DomainVerificationEndpoints : {});
};
declare function sso<O extends SSOOptions & {
  domainVerification?: {
    enabled: true;
  };
}>(options?: O | undefined): {
  id: "sso";
  endpoints: SSOEndpoints<O> & DomainVerificationEndpoints;
  schema: NonNullable<BetterAuthPlugin["schema"]>;
  options: O;
};
declare function sso<O extends SSOOptions>(options?: O | undefined): {
  id: "sso";
  endpoints: SSOEndpoints<O>;
  options: O;
};
//#endregion
export { AlgorithmValidationOptions as A, SAMLConditions as C, SAMLConfig as D, OIDCConfig as E, SignatureAlgorithm as F, DeprecatedAlgorithmBehavior as M, DigestAlgorithm as N, SSOOptions as O, KeyEncryptionAlgorithm as P, DEFAULT_MAX_SAML_RESPONSE_SIZE as S, validateSAMLTimestamp as T, OIDCDiscoveryDocument as _, discoverOIDCConfig as a, DEFAULT_CLOCK_SKEW_MS as b, normalizeDiscoveryUrls as c, validateDiscoveryDocument as d, validateDiscoveryUrl as f, HydratedOIDCConfig as g, DiscoveryErrorCode as h, computeDiscoveryUrl as i, DataEncryptionAlgorithm as j, SSOProvider as k, normalizeUrl as l, DiscoveryError as m, sso as n, fetchDiscoveryDocument as o, DiscoverOIDCConfigParams as p, getSSOState as r, needsRuntimeDiscovery as s, SSOPlugin as t, selectTokenEndpointAuthMethod as u, REQUIRED_DISCOVERY_FIELDS as v, TimestampValidationOptions as w, DEFAULT_MAX_SAML_METADATA_SIZE as x, RequiredDiscoveryField as y };
//# sourceMappingURL=index-DY2w5d2g.d.mts.map