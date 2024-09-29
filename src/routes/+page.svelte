<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { formSchema, type FormSchema } from "$lib/schema";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { createQuery, useQueryClient } from "@tanstack/svelte-query";
  import type { AppType } from "$lib/api/index.js";
  import { hc } from "hono/client";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";

  export let data;

  const { api } = hc<AppType>("/");
  const queryClient = useQueryClient();

  const query = createQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const response = await api.todo.$get();
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
        }
        return response.json();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error();
      }
    },
  });

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
    onUpdate: async ({ form }) => {
      if (form.valid) {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });

  const { form: formData, enhance, delayed } = form;
</script>

<div class="max-w-screen-md mx-auto my-10">
  {#if $query.isLoading}
    {#each { length: 5 } as _}
      <div class="space-y-2 mb-2">
        <Skeleton class="h-8 w-full" />
      </div>
    {/each}
  {:else if $query.isError}
    <div>Error: {JSON.stringify($query.error.message)}</div>
  {:else if $query.isSuccess && !!$query.data?.todos?.length}
    {#each $query?.data?.todos as { task }}
      <div>{task}</div>
    {/each}
  {/if}

  <form method="POST" use:enhance>
    <Form.Field {form} name="todo">
      <Form.Control let:attrs>
        <Input {...attrs} bind:value={$formData.todo} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button disabled={$delayed}>
      {#if $delayed}
        Loading...
      {:else}
        Create
      {/if}</Form.Button
    >
  </form>
</div>
