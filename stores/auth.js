import { defineStore } from 'pinia'
import backendApi from '@/networkServices/api/backendApi.js'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        isActive: false,
        userId: null,
        userData: '',
        email: '',
        MissingPersonId: null,
        MissingPersonData:'',
        selectedUser:null
    }),
    getters: {
        isUserAuthenticated: (state) => state.isAuthenticated,
        authAccessToken: (state) => state.accessToken,
        authRefreshToken: (state) => state.refreshToken,
        isUserActive: (state) => state.isActive,
        getUserData: (state) => state.userData,
        getMissingPersonData: (state) => state.MissingPersonData,
        getMissingPersonId: (state) => {
            return (id) => state.MissingPersonData.find(MissingPersonData => MissingPersonData.id === id);
          },
    },        
    actions: {
        async initializeStore() {
            if (localStorage.getItem('accessToken')) {
                this.accessToken = localStorage.getItem('accessToken')
                this.refreshToken = localStorage.getItem('refreshToken')
                this.isAuthenticated = true
                this.isActive = true

                await backendApi.get(`auth/me`, {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        this.userId = response.data.id
                        this.email = response.data.email
                        this.isAuthenticated = true
                        this.isActive = true
                    }
                }).catch((error) => {
                    this.$reset()
                    localStorage.clear();
                })
            } else {
                this.$reset()
                localStorage.clear();
            }
        },
        initializeAuthSyncr() {
            if (localStorage.getItem('accessToken')) {
                this.accessToken = localStorage.getItem('accessToken')
                this.refreshToken = localStorage.getItem('refreshToken')
                this.isAuthenticated = true
                this.isActive = true

                backendApi.get(`auth/me`, {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        this.userId = response.data.id
                        
                        this.email = response.data.email
                        
                        this.isAuthenticated = true
                        this.isActive = true
                    }
                }).catch((error) => {

                    backendApi.get(`auth/refresh`, {
                        headers: {
                            Authorization: 'Bearer ' + this.refreshToken
                        }
                    }).then((response) => {
                        this.accessToken = response.data.accessToken
                        this.refreshToken = response.data.refreshToken
                        localStorage.setItem("accessToken", this.accessToken)
                        localStorage.setItem("refreshToken", this.refreshToken)
                        this.isAuthenticated = true
                        this.isActive = true
                    }).catch((error) => {
                        this.$reset()
                        localStorage.clear()
                    })
                })
            } else {
                backendApi.get(`auth/me`, {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken
                    }
                }).then((response) => {
                    if (response.status == 500) {
                        navigateTo('/')
                    }
                }).catch((error) => {
                    this.$reset()
                    localStorage.clear()
                })
            }
        },
        
        setAuthenticated(accessToken) {
            this.accessToken = accessToken
            localStorage.setItem('accessToken', this.accessToken)
            backendApi.defaults.headers.common["Authorization"] = 'Bearer ' + this.accessToken;
            this.isAuthenticated = true
            this.isActive = true
            //this.initializeStore()
        },
        setRefreshed(accessToken, refreshToken) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
            localStorage.setItem("accessToken", this.accessToken)
            localStorage.setItem("refreshToken", this.refreshToken)
        },
        
        checkAuth() {
            if (this.isAuthenticated == false) {
                return navigateTo('/login')
            }
        },
        
        
        async fetchMissingPersonById(id){
                await backendApi.get(`/missing_person_info/${id}`, {
                    headers: {
                        Authorization: 'Bearer '
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        this.selectedUser = response.data;
                    }
                }).catch((error) => {
                    console.error('Error fetching Missing Person By Id:', error)
                })
        },

        
        
        async logout() {
            await backendApi.get(`auth/logout`, {
                headers: {
                    Authorization: "Bearer " + this.accessToken
                }
            }).then((res) => {
                this.$reset()
                localStorage.clear()
                return navigateTo('/login')
            }).catch((err) => {
                this.$reset()
                localStorage.clear()
                return navigateTo('/login')
            })
        }
    },
})