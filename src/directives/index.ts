import DOMPurify from 'dompurify'

export const saneHtml = (el: { innerHTML: any }, binding: { value: any }) => {
  el.innerHTML = binding.value === 0 ? 0 : DOMPurify.sanitize(binding.value)
}
import {Directive} from 'vue'

export const vClickOutside = <Directive<HTMLElement, () => void>>{
	mounted(el, cb) {
		window.addEventListener('click', (event: MouseEvent | TouchEvent) => {
			const target = event.target as HTMLElement
			if (!el.contains(target)) {
				cb.value()
			}
		})
	}
}

