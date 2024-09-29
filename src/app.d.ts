// See https://kit.svelte.dev/docs/types#app

import type { ClientType } from "$lib/api";

// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      api: ClientType["api"];
    }
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
