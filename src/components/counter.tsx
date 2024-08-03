import { component$ } from "@builder.io/qwik";

import { Counter } from "qwik-test-lib";

export const LocalCounter = component$(() => {
  return <Counter />;
});
