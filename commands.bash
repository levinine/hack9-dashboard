aws stepfunctions --endpoint-url http://localhost:4585 create-state-machine --name ttlMachine --definition "{\"Comment\":\"Delete message after it expires\",\"StartAt\":\"FirstState\",\"States\":{\"FirstState\":{\"Type\":\"Task\",\"Resource\":\"arn:aws:lambda:eu-west-1:000000000000:function:hack9-dashboard-local-postMessageWithExpirationTime\",\"Next\":\"WaitState\"},\"WaitState\":{\"Type\":\"Wait\",\"SecondsPath\":\"$.expirationTime\",\"Next\":\"FinalState\"},\"FinalState\":{\"Type\":\"Task\",\"Resource\":\"arn:aws:lambda:eu-west-1:000000000000:function:hack9-dashboard-local-deleteMessage\",\"InputPath\":\"$.id\",\"End\":true}}}" --role-arn arn:aws:iam::000000000000:role/my-role


sls deploy --stage local --config ./localstack-config.yml

aws stepfunctions --endpoint-url http://localhost:4585 start-execution --state-machine-arn arn:aws:states:eu-west-1:000000000000:stateMachine:ttlMachine --input "{\"title\":\"jdskls\",\"isGlobal\":true,\"content\": \"blgfdfa\",\"expirationTime\":\"2020-01-24T15:00:00Z\"}"

aws stepfunctions --endpoint-url http://localhost:4585 list-state-machines