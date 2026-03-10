import { SecretConfig } from "../../../crypto/index.mjs";
import { UserWithTwoFactor } from "../types.mjs";
import * as better_call0 from "better-call";

//#region src/plugins/two-factor/backup-codes/index.d.ts
interface BackupCodeOptions {
  /**
   * The amount of backup codes to generate
   *
   * @default 10
   */
  amount?: number | undefined;
  /**
   * The length of the backup codes
   *
   * @default 10
   */
  length?: number | undefined;
  /**
   * An optional custom function to generate backup codes
   */
  customBackupCodesGenerate?: (() => string[]) | undefined;
  /**
   * How to store the backup codes in the database, whether encrypted or plain.
   */
  storeBackupCodes?: ("plain" | "encrypted" | {
    encrypt: (token: string) => Promise<string>;
    decrypt: (token: string) => Promise<string>;
  }) | undefined;
}
declare function generateBackupCodes(secret: string | SecretConfig, options?: BackupCodeOptions | undefined): Promise<{
  backupCodes: string[];
  encryptedBackupCodes: string;
}>;
declare function verifyBackupCode(data: {
  backupCodes: string;
  code: string;
}, key: string | SecretConfig, options?: BackupCodeOptions | undefined): Promise<{
  status: boolean;
  updated: null;
} | {
  status: boolean;
  updated: string[];
}>;
declare function getBackupCodes(backupCodes: string, key: string | SecretConfig, options?: BackupCodeOptions | undefined): Promise<string[] | null>;
declare const backupCode2fa: (opts: BackupCodeOptions) => {
  id: "backup_code";
  endpoints: {
    /**
     * ### Endpoint
     *
     * POST `/two-factor/verify-backup-code`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.verifyBackupCode`
     *
     * **client:**
     * `authClient.twoFactor.verifyBackupCode`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-verify-backup-code)
     */
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
    /**
     * ### Endpoint
     *
     * POST `/two-factor/generate-backup-codes`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.generateBackupCodes`
     *
     * **client:**
     * `authClient.twoFactor.generateBackupCodes`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-generate-backup-codes)
     */
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
    /**
     * ### Endpoint
     *
     * POST `/two-factor/view-backup-codes`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.viewBackupCodes`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-view-backup-codes)
     */
    viewBackupCodes: better_call0.Endpoint<string, "POST", {
      userId: unknown;
    }, Record<string, any> | undefined, any, {
      status: boolean;
      backupCodes: string[];
    }, better_call0.EndpointMetadata | undefined, undefined>;
  };
};
//#endregion
export { BackupCodeOptions, backupCode2fa, generateBackupCodes, getBackupCodes, verifyBackupCode };
//# sourceMappingURL=index.d.mts.map