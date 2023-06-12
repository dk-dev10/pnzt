export type FBItemType = "toggle" | "select" | "radio-group" | "period-calendar" | "checkbox" | 'heading'

export interface FilterItem {
	hideDashed?: boolean;
	text?: string;
	inline?: boolean;
	type: FBItemType;
	search?: boolean;
	title?: string;
	radioGroupQueryName?: string;
	items?: string[];
	isActive?: boolean;
	activeItemIdx?: number | null;
	isIncreasing?: boolean;
	selectQueryName?: string;
	unselect?: boolean;
	availableYears?: number[];
	calendarQueryName?: string;
	from?: Date | null;
	to?: Date | null;
	isFullscreen?: boolean;
	visibleItem?: number;
	typeOfHover?: string;
	watchActive?: boolean;
	isChecked?: boolean;
	checkboxName?: string;
	multiSelect?: boolean;
	activeColor?: string;
	color?: string;
}
