import react from "@astrojs/react";
import qwik from "@qwikdev/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/demo-template/",
  integrations: [qwik({ include: "src/components/*" }), react()],
});
