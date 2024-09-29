import type { AppType } from "$lib/api/index.js";
import { hc } from "hono/client";

export const load = async ({ data, parent, fetch }) => {
  const { api } = hc<AppType>("/", { fetch: fetch });

  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: async () => (await api.todo.$get()).json(),
  });

  return {
    form: data.form,
  };
};
