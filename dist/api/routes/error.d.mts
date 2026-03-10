import * as better_call0 from "better-call";

//#region src/api/routes/error.d.ts
declare const error: better_call0.Endpoint<"/error", "GET", undefined, Record<string, any> | undefined, [], Response, {
  openapi: {
    description: string;
    responses: {
      "200": {
        description: string;
        content: {
          "text/html": {
            schema: {
              type: "string";
              description: string;
            };
          };
        };
      };
    };
  };
  scope: "server";
}, undefined>;
//#endregion
export { error };
//# sourceMappingURL=error.d.mts.map