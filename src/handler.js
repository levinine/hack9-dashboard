const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');

let connection = null;
const getConnection = function () {
  if (connection == null) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
  }
  return connection;
}
const query = function (sql, args) {
  return new Promise(async (resolve, reject) => {
    try {
      getConnection().query(sql, args, (error, rows) => {
        if (error) {
          conenction = null;
          console.error('SQL query failed', sql, args, error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    } catch (error) {
      connection = null;
      console.log('Error with db query', error);
      reject(error);
    }
  });
}
// connection.end();

exports.staticContent = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let content = fs.readFileSync('src/index.html', { encoding: 'utf8' });
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8'
    },
    body: content
  };
}

const checkAccess = async (event) => {
  // get team id from request and check if that's own team _OR_ check if I'm admin
  const teamId = event.pathParameters.teamId;
  const email = event.requestContext.authorizer.claims.email; // from JWT
  const user = await users.getByEmail(email);
  console.log(`Check access: user ${JSON.stringify(user)}; email ${email}; teamId ${teamId}`);
  return user && (user.type === 'admin' || user.team_id == teamId);
}
exports.putApiUrl = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (await checkAccess(event)) {
    await teams.updateApiUrl(event.pathParameters.teamId, JSON.parse(event.body).apiUrl);
    return {
      statusCode: 200
    }
  } else {
    return {
      statusCode: 403
    }
  }
}

exports.postTestRequest = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (await checkAccess(event)) {
    await testExecutions.create(event.pathParameters.teamId);
    await teams.updateStatus(event.pathParameters.teamId, 'scheduled');
    return {
      statusCode: 200,
      body: ''
    };
  } else {
    return {
      statusCode: 403
    }
  }
}

exports.getTestRequest = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const cloudProvider = event.queryStringParameters && event.queryStringParameters.cloudProvider || 'aws';
  const region = event.queryStringParameters && event.queryStringParameters.region || 'eu-west-1';
  const testExecution = await testExecutions.acquire(cloudProvider, region);
  if (testExecution) {
    return {
      statusCode: 200,
      body: JSON.stringify(testExecution)
    };
  } else {
    return {
      statusCode: 404
    }
  }
}

exports.postTestResults = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse(event.body);
  const testExecutionCode = body.id;
  const results = body.data;
  await testExecutions.saveResults(testExecutionCode, results);
  const testExecution = await testExecutions.getByCode(testExecutionCode);
  await teams.updateStatus(testExecution.team_id, 'ready');
  console.log(`Save test execution results. Code ${testExecutionCode}. Results: ${results}`);
  return {
    statusCode: 200,
    body: ''
  };
}

exports.results = async (_event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return {
    statusCode: 200,
    body: JSON.stringify({
      teams: await teams.getAll()
    })
  };
}

exports.preTokenGeneration = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const user = await users.getByEmail(event.request.userAttributes.email);
    event.response = { claimsOverrideDetails: { claimsToAddOrOverride: { role: user.type } } };
    context.done(null, event);
  } catch (error) {
    context.fail(error);
  }
};

const users = {
  getByEmail: (email) => query(`SELECT * FROM user WHERE email = ? `, [email]).then(users => users.length === 1 ? users[0] : null)
}
const teams = {
  getAll: () => query(`SELECT t.id AS id, t.name AS name, t.score AS score, status, GROUP_CONCAT(u.email SEPARATOR ",") AS members \
                       FROM team t \
                       LEFT JOIN user u ON t.id = u.team_id \
                       GROUP BY t.id, status \
                       ORDER BY t.score DESC, t.id ASC`).then(teams => {
                         teams.forEach(team => {
                           team.members = team.members ? team.members.split(',') : [];
                         });
                         return teams;
                       }),
  findByEmail: (email) => teams.getAll().then(teams => teams.find(team => team.members && team.members.includes(email))),
  updateStatus: (teamId, status) => query(`UPDATE team SET status = ? WHERE id = ?`, [status, teamId]),
  updateApiUrl: (teamId, apiUrl) => query(`UPDATE team SET api_url = ? WHERE id = ?`, [apiUrl, teamId])
}

const testExecutions = {
  all: [],
  create: (teamId) => query(`INSERT INTO test_execution (api_url, team_id, cloud_provider, region) \
                           SELECT api_url, id, cloud_provider, region FROM team WHERE id = ?`, [teamId]),
  acquire: async (cloudProvider, region) => {
    const testExecutions = await query(`SELECT * FROM test_execution WHERE cloud_provider = ? AND region = ? AND status = 'scheduled' \
      ORDER BY id ASC LIMIT 1`, [cloudProvider, region]);
    if (testExecutions.length === 1) {
      const code = crypto.randomBytes(20).toString('hex');
      console.log(`updating test_execution to running with code ${code}`);
      await query(`UPDATE test_execution SET status = 'running', code = ? WHERE id = ? AND status = 'scheduled'`, [code, testExecutions[0].id]);
      await teams.updateStatus(testExecutions[0].team_id, 'running');
      return {
        id: code,
        url: testExecutions[0].api_url
      }
    } else {
      return null;
    }
  },
  getByCode: (code) => query(`SELECT * FROM test_execution WHERE code = ?`, [code]).then(tes => tes.length === 1 ? tes[0] : null),
  saveResults: (code, results) => query(`UPDATE test_execution SET status = 'finished', results = ? WHERE code = ?`, [results, code])
}
