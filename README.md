# Hack9 2019 - Dashboard

Scoreboard for Hack9 2019


## Run in local

**MySql and LocalStack in Docker container:**

run "docker-compose up" from project directory.

**Run the application:**

`sls offline`

**Run the StepFunction on LocalStack:**

1. Deploy Lambda functions to LocalStack with *sls deploy --stage local --config ./localstack-config.yml*
2. Create StepFunction with *aws stepfunctions --endpoint-url http://localhost:4585 create-state-machine --name ttlMachine --definition "{\"Comment\":\"Delete message after it expires\",\"StartAt\":\"FirstState\",\"States\":{\"FirstState\":{\"Type\":\"Task\",\"Resource\":\"arn:aws:lambda:eu-west-1:000000000000:function:hack9-dashboard-local-postMessageWithExpirationTime\",\"Next\":\"WaitState\"},\"WaitState\":{\"Type\":\"Wait\",\"SecondsPath\":\"$.expirationTime\",\"Next\":\"FinalState\"},\"FinalState\":{\"Type\":\"Task\",\"Resource\":\"arn:aws:lambda:eu-west-1:000000000000:function:hack9-dashboard-local-deleteMessage\",\"InputPath\":\"$.id\",\"End\":true}}}" --role-arn arn:aws:iam::000000000000:role/my-role*
3. Execute StepFunction with *aws stepfunctions --endpoint-url http://localhost:4585 start-execution --state-machine-arn arn:aws:states:eu-west-1:000000000000:stateMachine:ttlMachine --input "{\"title\":\"titleExample\",\"isGlobal\":true,\"content\": \"contentExample\",\"expirationTime\":\"30\"}"*

## Deploy to AWS

`sls deploy`
