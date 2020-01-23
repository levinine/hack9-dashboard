import getAxios from './base.service';

const path = '/messages';

export default {
  getMessages() {
    return getAxios().get(`${path}`);
  },
  postMessage(message) {
    return getAxios().post(`${path}`, { message });
  },
  deleteMessage(messageId) {
    return getAxios().delete(`${path}/${messageId}`);
  }
}
