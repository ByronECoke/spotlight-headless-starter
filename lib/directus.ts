import { createDirectus, staticToken } from "@directus/sdk";
import { rest } from "@directus/sdk/rest";

export const directus = createDirectus(process.env.DIRECTUS_URL!)
  .with(rest())
  .with(staticToken(process.env.DIRECTUS_TOKEN_PUBLIC!));