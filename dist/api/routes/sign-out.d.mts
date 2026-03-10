import * as better_call0 from "better-call";

//#region src/api/routes/sign-out.d.ts
declare const signOut: better_call0.Endpoint<"/sign-out", "POST", undefined, Record<string, any> | undefined, [], {
  success: boolean;
}, {
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
}, undefined>;
//#endregion
export { signOut };
//# sourceMappingURL=sign-out.d.mts.map