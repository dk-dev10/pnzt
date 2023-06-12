import axios from './axios'

export default {
	async getCurrentUser () {
		try {
			const resp = await axios.get('/user/current')
			return {
				data: resp.data,
				status: resp.status
			}
		} catch (err: any) {
			return err.response.status
		}
	},
	async login (mail: string, pass: string) {
		try {
			const resp = await axios.post('user/login', {
				email: mail,
				password: pass
			})
			return {
				data: resp.data,
				status: resp.status
			}
		} catch (err: any) {
			return err.response.status
		}
	},
	async logout () {
		try {
			const resp = await axios.get('/user/logout')
			return {
				data: resp.data,
				status: resp.status
			}
		} catch (err: any) {
			return err.response.status
		}
	}
}
