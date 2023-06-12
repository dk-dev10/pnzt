import {defineStore} from "pinia"
import api from '@/api'
import type {User} from "@/models"

export const useUserStore = defineStore({
	id: 'userStore',
	state: () => ({
		user: undefined as User | null | undefined,
	}),
	actions: {
		async logOut() {
			try {
				const res = await api.userApi.logout()
				if (res.status === 200) this.user = null
			} catch (err: unknown) {
				console.log(err)
				return false
			}
		},
		async setCurrentUser() {
			try {
				const res = await api.userApi.getCurrentUser()
				if (res && res.status === 200 && res.data) {
					this.user = res.data
				} else this.user = null
			} catch (err: unknown) {
				console.log(err)
				this.user = null
			}

		},
		async authenticateUser(email: string, password: string) {
			try {
				const res = await api.userApi.login(email, password)
				if (res && res.status === 200 && res.data) {
					this.user = res.data
					return true
				} else return false
			} catch (err: unknown) {
				console.log(err)
				return false
			}
		}
	}
})
