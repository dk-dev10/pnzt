import { type TextTag } from "./index"
import { Ref } from "vue"

export interface RouteObject {
	path: string;
	query: { [query: string]: string };
}

export interface Button {
	path: RouteObject;
	titleLevel?: number;
	textTag?: TextTag;
	title?: string;
	text?: string | number | Ref<string | number>;
	isActive?: boolean;
}
