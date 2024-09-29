import { formSchema } from "$lib/schema.js";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { hc } from "hono/client";
import type { AppType } from "$lib/api/index.js";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const { api } = hc<AppType>("/", { fetch: event.fetch });
    const form = await superValidate(event, zod(formSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    await api.todo.$post({
      json: {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        task: form.data.todo,
        completed: false,
      },
    });

    return {
      form,
    };
  },
};
