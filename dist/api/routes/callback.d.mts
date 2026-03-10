import * as better_call0 from "better-call";

//#region src/api/routes/callback.d.ts
declare const callbackOAuth: better_call0.Endpoint<"/callback/:id", ("GET" | "POST")[], {
  code?: string | undefined;
  error?: string | undefined;
  device_id?: string | undefined;
  error_description?: string | undefined;
  state?: string | undefined;
  user?: string | undefined;
} | undefined, {
  code?: string | undefined;
  error?: string | undefined;
  device_id?: string | undefined;
  error_description?: string | undefined;
  state?: string | undefined;
  user?: string | undefined;
} | undefined, [], void, {
  allowedMediaTypes: string[];
  scope: "server";
}, undefined>;
//#endregion
export { callbackOAuth };
//# sourceMappingURL=callback.d.mts.map