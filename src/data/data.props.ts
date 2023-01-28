type TDate = Date | string
type TImage = null | string

export type TMessages = {
	date: TDate
	messages: TMessage[]
}

type TMessage = {
	text: string
	date: TDate
	image: TImage
	owner: boolean
	isReaded: boolean
}

export type TDialogues = {
	dialogues: TDialogue[]
}

type TDialogue = {
	user: {
		name: string
		avatarSrc: TImage
	}
	lastMessage: {
		text: string
		image: TImage
		date: TDate
		owner: boolean
	}
	newMessagesCount: number | null
}

export type TAuth = {
	inputs: TInput[]
}

type TInput = {
	id: string
	label: string
	name: string
	inputType: string
	value?: string
	placeholder?: string
	errMessage?: string
	disabled?: boolean
}

export type TProfile = {
	inputs: { fields: TInput[] }
	passwords: { fields: TInput[] }
	shortFormat: {
		avatarSrc: TImage
		email: string
		login: string
		first_name: string
		second_name: string
		display_name: string
		phone: string
		oldPassword: string
		newPassword: string
	}
}
