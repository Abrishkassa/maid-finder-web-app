import { defineStore } from 'pinia';
export const useMaidStore = defineStore('maidStore', {
  state: () => ({ maids: [] }),
  actions: {
    async fetchMaids() {
      const res = await fetch('/api/maids');
      this.maids = await res.json();
    }
  }
});
