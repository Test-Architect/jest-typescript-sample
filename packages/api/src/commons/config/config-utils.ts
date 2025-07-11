enum TestEnv {
	PROD = 'prod',
	QA = 'qa'
}
const PROD_BASE_URL = 'https://petstore.swagger.io/v2/';
const QA_BASE_URL = 'https://qa.petstore.swagger.io/v2/';

function getTestEnv(): string {
	return process.env.TEST_ENV || TestEnv.PROD;
}

export function getBaseUrl(): string {
	let result = PROD_BASE_URL;
	const testEnv = getTestEnv();
	switch (testEnv) {
		case TestEnv.QA:
			result = QA_BASE_URL;
			break;
		default:
			break;
	}

	return result;
}
