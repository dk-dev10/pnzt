import {onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import type { Button} from '../models'

export const useQueryParams = (buttons: Button[], emit: (event: 'chartChange', ...args: any[]) => void, delay = 0) => {
	const router = useRouter()
	const route = useRoute()
	const queryName = Object.getOwnPropertyNames(buttons[0].path.query)[0] as string
	const activateButton = (idx: number) => {
		buttons.forEach(button => button.isActive = false)
		buttons[idx].isActive = true
	}
	const getActiveButtonFromPath = () => {
		const matchedButtonIdx = buttons.findIndex(button => button.path.query[queryName] === route.query[queryName])
		if (matchedButtonIdx >= 0) {
			activateButton(matchedButtonIdx)
			console.log("Emit...")
			emit('chartChange', `${queryName}${matchedButtonIdx + 1}`)
		}
	}
	watch(() => route.query, () => {
			getActiveButtonFromPath()
		},
		{
			deep: true
		})
	onMounted(() => {
		setTimeout(async () => {
			if (!route.query[queryName]) {
				await router.push({path: buttons[0].path.path, query: {...route.query, ...{[queryName]: '1'}}})
			}
			getActiveButtonFromPath()
		}, delay)

	})
	return activateButton
}
