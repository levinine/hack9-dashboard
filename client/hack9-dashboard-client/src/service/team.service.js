import getAxios from './base.service';

const path = '/teams';

export default {
  getLatestExecution(teamId) {
    return getAxios().get(`${path}/${teamId}/executions/latest`);
  },
  getApiUrl(teamId) {
    return getAxios().get(`${path}/${teamId}/apiUrl`);
  },
  postTestRequest(teamId) {
    return getAxios().post(`${path}/${teamId}/testRequests`, { teamId });
  },
  putApiUrl(teamId, apiUrl) {
    return getAxios().put(`${path}/${teamId}/apiUrl`, { apiUrl });
  },
  getResults() {
    return getAxios().get('/results');
  },
  getResultDetails(teamId) {
    return getAxios().get(`/results/${teamId}/details`);
  },
}
