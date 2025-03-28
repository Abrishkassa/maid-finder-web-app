export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    _hydrated: false,
  }),

  actions: {
    hydrate() {
      if (process.client) {
        const accessCookie = useCookie("access_token");
        const refreshCookie = useCookie("refresh_token");
        this.accessToken = accessCookie.value;
        this.refreshToken = refreshCookie.value;
        this._hydrated = true;
      }
    },

    setTokens(accessToken, refreshToken, expiresIn) {
      const accessCookie = useCookie("access_token", {
        secure: true,
        sameSite: "strict",
        maxAge: expiresIn || 60 * 60 * 24,
      });

      const refreshCookie = useCookie("refresh_token", {
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });

      accessCookie.value = accessToken;
      refreshCookie.value = refreshToken;

      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },

    setUser(userData) {
      this.user = userData;
    },

    logout() {
      const accessCookie = useCookie("access_token");
      const refreshCookie = useCookie("refresh_token");

      accessCookie.value = null;
      refreshCookie.value = null;

      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
    },

    async checkTokenRefresh() {
      if (this.tokenExpired && this.refreshToken) {
        try {
          const { data } = await $fetch("/auth/refresh", {
            method: "POST",
            body: { refreshToken: this.refreshToken },
          });
          this.setTokens(data.accessToken, data.refreshToken, data.expiresIn);
          return true;
        } catch (error) {
          this.logout();
          return false;
        }
      }
      return !this.tokenExpired;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !state.tokenExpired,
    currentUser: (state) => state.user,
    tokenExpired(state) {
      if (!state.accessToken) return true;
      try {
        const payload = JSON.parse(atob(state.accessToken.split(".")[1]));
        return payload.exp * 1000 < Date.now();
      } catch {
        return true;
      }
    },
    isHydrated: (state) => state._hydrated,
  },
});
