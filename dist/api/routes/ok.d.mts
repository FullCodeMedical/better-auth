import * as better_call0 from "better-call";

//#region src/api/routes/ok.d.ts
declare const ok: better_call0.Endpoint<"/ok", "GET", undefined, Record<string, any> | undefined, [], {
  ok: boolean;
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
                ok: {
                  type: string;
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
//#endregion
export { ok };
//# sourceMappingURL=ok.d.mts.map