export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    email: null,
    verificationEmail: null, // New field for email verification
    refreshToken: null,
    user: null,
    _hydrated: false,
  }),

  actions: {
    hydrate() {
      if (process.client) {
        const accessCookie = useCookie("access_token");
        const refreshCookie = useCookie("refresh_token");
        const userCookie = useCookie("user_data");

        this.accessToken = accessCookie.value;
        this.refreshToken = refreshCookie.value;

        try {
          this.user = userCookie.value ? JSON.parse(userCookie.value) : null;
        } catch (e) {
          this.user = null;
        }

        this._hydrated = true;
      }
    },

    setTokens(accessToken, refreshToken, expiresIn) {
      const accessCookie = useCookie("access_token", {
        secure: true,
        sameSite: "strict",
        maxAge: expiresIn || 60 * 60 * 24, // Default 24 hours
      });

      const refreshCookie = useCookie("refresh_token", {
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      accessCookie.value = accessToken;
      refreshCookie.value = refreshToken;

      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },

    setUser(userData) {
      this.user = userData;
      const userCookie = useCookie("user_data", {
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      userCookie.value = JSON.stringify(userData);
    },

    setVerificationEmail(email) {
      this.verificationEmail = email;
      const verificationCookie = useCookie("verification_email", {
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      verificationCookie.value = email;
    },

    clearVerificationEmail() {
      this.verificationEmail = null;
      const verificationCookie = useCookie("verification_email");
      verificationCookie.value = null;
    },

    setEmail(email) {
      this.email = email;
    },

    logout() {
      const accessCookie = useCookie("access_token");
      const refreshCookie = useCookie("refresh_token");
      const userCookie = useCookie("user_data");
      const verificationCookie = useCookie("verification_email");

      accessCookie.value = null;
      refreshCookie.value = null;
      userCookie.value = null;
      verificationCookie.value = null;

      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      this.verificationEmail = null;
    },

    async checkTokenRefresh() {
      if (this.tokenExpired && this.refreshToken) {
        try {
          const { data } = await $fetch("/auth/refresh", {
            method: "POST",
            body: { refreshToken: this.refreshToken },
          });

          if (data?.accessToken && data?.refreshToken) {
            this.setTokens(data.accessToken, data.refreshToken, data.expiresIn);
            return true;
          }
          return false;
        } catch (error) {
          this.logout();
          return false;
        }
      }
      return !this.tokenExpired;
    },

    // New method to check verification status
    async checkVerificationStatus() {
      if (!this.user?.email) return false;

      try {
        const { verified } = await $fetch(
          `/auth/verify-status?email=${encodeURIComponent(this.user.email)}`
        );
        return verified;
      } catch (error) {
        console.error("Verification check failed:", error);
        return false;
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !state.tokenExpired,
    currentUser: (state) => state.user,
    needsVerification: (state) => !!state.verificationEmail,

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

    // New getter for user role
    userRole: (state) => state.user?.role || null,

    // New getter for verification email
    getVerificationEmail: (state) => state.verificationEmail,
  },
});
