import { errorHandler } from "../infrastructure/error-handler";
import { responseHandler } from "../infrastructure/response-handler";
import { ExecutionStatus } from "./enum/execution-status";
import { getEmail } from "../infrastructure/get-email";
import { ServiceFactory } from "../infrastructure/service-factory";
import { UserService } from "./service/user.service";
import { TeamService } from "./service/team.service";
import { TestExecutionService } from "./service/test-execution.service";
import { TestToTestExecutionService } from "./service/test-to-test-execution.service";
import { MessageService } from "./service/message.service";

const userService: UserService = ServiceFactory.get('user');
const teamService: TeamService = ServiceFactory.get('team');
const testExecutionService: TestExecutionService = ServiceFactory.get('testExecution');
const testToTestExecutionService: TestToTestExecutionService = ServiceFactory.get('testToTestExecution');
const messageService: MessageService = ServiceFactory.get('message');

const getResults = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const response = await teamService.getAll();
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const getResultDetails = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const response = await testToTestExecutionService.getLatestByTeamId(event.pathParameters.teamId);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const getLatestExecution = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email = getEmail(event);
    await userService.checkAccess(event.pathParameters.teamId, email);
    const response = await testExecutionService.getLatestExecution(event.pathParameters.teamId);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}


const getApiUrl = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const response = await teamService.getApiUrl(event.pathParameters.teamId);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const putApiUrl = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email = getEmail(event);
    await userService.checkAccess(event.pathParameters.teamId, email);
    const response = await teamService.updateApiUrl(event.pathParameters.teamId, JSON.parse(event.body).apiUrl);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}


const postTestRequest = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email = getEmail(event);
    await userService.checkAccess(event.pathParameters.teamId, email);
    const response = await testExecutionService.createFromTeam(event.pathParameters.teamId);
    await teamService.updateStatus(event.pathParameters.teamId, ExecutionStatus.SCHEDULED);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const getTestRequest = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const cloudProvider = event.queryStringParameters && event.queryStringParameters.cloudProvider || process.env.DEFAULT_PROVIDER;
    const region = event.queryStringParameters && event.queryStringParameters.region || process.env.DEFAULT_REGION;
    const response = await testExecutionService.acquire(cloudProvider, region);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const postTestResults = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    await testExecutionService.postTestResults(body.id, body.data);
    const testExecution = await testExecutionService.getByCode(body.id);
    const response = await teamService.updateStatus(testExecution.teamId, ExecutionStatus.READY);
    console.log(`Save test execution results. Code ${body.id}. Results: ${body.data}`);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const preTokenGeneration = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const user = await userService.getByEmail(event.request.userAttributes.email);
    event.response = { claimsOverrideDetails: { claimsToAddOrOverride: { role: user ? user.type : 'USER' } } };
    context.done(null, event);
  } catch (error) {
    context.fail(error);
  }
};

const calculateScores = async () => {
  try {
    const response = await testExecutionService.calculateScores();
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const getMessages = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email = getEmail(event);
    const response = await messageService.findAllForUser(email);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const postMessage = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body);
    const email = getEmail(event);
    await userService.checkAccess(-1, email);
    const response = await messageService.create(body, email);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}

const deleteMessage = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const email = getEmail(event);
    await userService.checkAccess(-1, email);
    const response = await messageService.delete(event.pathParameters.messageId);
    return responseHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
}



export {
  getResults,
  getLatestExecution,
  getApiUrl,
  putApiUrl,
  postTestRequest,
  getTestRequest,
  postTestResults,
  preTokenGeneration,
  calculateScores,
  getResultDetails,
  getMessages,
  postMessage,
  deleteMessage
}