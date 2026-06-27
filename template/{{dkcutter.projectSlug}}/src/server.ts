import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server.js";

// eslint-disable-next-line import/no-default-export
export default createServerEntry({
  {{ "async " if dkcutter.useEslintWithType }}fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, {{ "async " if dkcutter.useEslintWithType }}() => handler.fetch(req));
  },
});
