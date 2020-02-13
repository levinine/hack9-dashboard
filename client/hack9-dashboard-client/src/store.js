import MessageService from "./service/message.service";
import AuthService from "./service/auth.service";

const getAllMessages = async () => {
	const response = await MessageService.getMessages();
	state.messages = [...response.data];
}

const getNewMessages = async () => {
	state.newMessages = [];
	const response = await MessageService.getMessages();
	response.data.forEach(m => {
		try {
			let message = state.messages.find(message => message.id === m.id);
			if (!message) {
				state.messages.push(m);
				state.newMessages.push(m);
			}
		} catch (error) {
			throw error;
		}
	});

}
const closeMessage = (messageId) => {
	let index = -1;
	state.newMessages.some((message, idx) => {
		if (message.id === messageId) {
			index = idx;
			return true;
		}
		return false;
	});
	if (index !== -1) {
		state.newMessages.splice(index, 1);
	}
}

const isUserAdmin = () => {
	return AuthService.isUserAdmin();
}
const isUserAuthenticated = () => {
	return AuthService.isUserAuthenticated();
}

const getUserEmail = () => {
	return AuthService.getUserEmail();
}

const state = {
	loading: false,
	messages: [],
	newMessages: []
}

export default {
	state,
	closeMessage,
	getAllMessages,
	getNewMessages,
	isUserAdmin,
	isUserAuthenticated,
	getUserEmail
}