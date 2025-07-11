import request from 'supertest';
import StatusCode from 'status-code-enum';
import { getBaseUrl } from '../commons/config/config-utils';
import { Validator } from 'jsonschema';
import { createUpdatePETPayload, petStoreApiSchema, updatePetAPISchema, UpdatePETPayload } from './petstore-api-utils';

describe('Pet Store API Suite', () => {
	const autBaseUrl = getBaseUrl();
	const appRequest = request(autBaseUrl);
	let randomPetId: any;
	let updatePETPayload: UpdatePETPayload;
	const validator = new Validator();

	test('Make a call to GET API and get a list of all the available pets and select any random PET ID', async () => {
		console.log(
			'Executing Test 1: Make a call to GET API and get a list of all the available pets and select any random PET ID'
		);
		console.log(`Making GET request with path '/pet/findByStatus' and query parameter 'status: 'available'`);
		const response = await appRequest.get(`pet/findByStatus`).set('Accept', 'application/json').query({
			status: 'available'
		});
		console.log('Validating the JSON response schema');
		const validationResult = validator.validate(response.body, petStoreApiSchema);
		if (validationResult.errors.length > 0) {
			console.error('Response does not match the JSON schema:', validationResult.errors);
			throw validationResult.errors;
		} else {
			console.log('Successfully validated the JSON response schema');
		}
		console.log('Validating the response from the GET API.');
		expect(response.statusCode, response.text).toBe(StatusCode.SuccessOK);
		console.log(
			`Successfully validated the response from the PUT API, Received Response code = ${response.statusCode}.`
		);
		console.log('GET request successful.');
		console.log(`Random PET ID for future use.`);
		const allPetIds = response.body.map((item: { id: any }) => item.id);
		randomPetId = allPetIds[Math.floor(Math.random() * allPetIds.length)];
		console.log(`Random PET ID ${randomPetId} saved successfully.`);
	});

	test('Pick a random Pet ID and update the details of the Pet using a PUT call.', async () => {
		console.log(`Executing Test 2: Pick a random Pet ID and update the details of the Pet using a PUT call.`);
		console.log(`Picking up random PET ID = ${randomPetId} for update`);
		updatePETPayload = createUpdatePETPayload(randomPetId);
		console.log(`Making Put request with PET ID = ${randomPetId}, and payload = ${JSON.stringify(updatePETPayload)}`);
		const putResponse = await appRequest.put(`pet`).set('Content-Type', 'application/json').send(updatePETPayload);
		if (putResponse.statusCode !== StatusCode.SuccessOK) {
			console.error(
				`PUT request failed. Expected status code ${StatusCode.SuccessOK}, but got ${putResponse.statusCode}`
			);
			console.error('Response Body:', putResponse.body);
		}
		console.log('Validating the response from the PUT API.');
		expect(putResponse.statusCode, putResponse.text).toBe(StatusCode.SuccessOK);
		console.log(
			`Successfully validated the response from the PUT API, Received Response code = ${putResponse.statusCode}.`
		);
		console.log('PUT request successful.');
	});

	test('Use the same pet ID to GET the details of the pet using the pet ID.', async () => {
		console.log(`Executing Test 3: Use the same pet ID to GET the details of the pet using the pet ID.`);
		console.log(`Picking up random PET ID = ${randomPetId} to GET the details of the pet using the pet ID`);
		console.log(`Making GET request with PET ID = ${randomPetId}.`);
		const getResponse = await appRequest.get(`pet/${randomPetId}`).set('Accept', 'application/json');
		if (getResponse.statusCode !== StatusCode.SuccessOK) {
			console.error(
				`GET request failed. Expected status code ${StatusCode.SuccessOK}, but got ${getResponse.statusCode}`
			);
			console.error('Response Body:', getResponse.body);
		}
		console.log('GET request successful.');
		console.log('Validating the JSON response schema');
		const validationResult = validator.validate(getResponse.body, updatePetAPISchema);
		if (validationResult.errors.length > 0) {
			console.error('Response does not match the JSON schema:', validationResult.errors);
			throw validationResult.errors;
		} else {
			console.log('Successfully validated the JSON response schema');
		}
		console.log('Validating the name, status and tag of the pet with payload used for update PET');
		expect(getResponse.body.name).toEqual(updatePETPayload.name);
		console.log(`Expected Name: ${updatePETPayload.name}`);
		console.log(`Actual Name  : ${getResponse.body.name}`);
		expect(getResponse.body.status).toEqual(updatePETPayload.status);
		console.log(`Expected Status: ${updatePETPayload.status}`);
		console.log(`Actual Status  : ${getResponse.body.status}`);
		// Expectations for the first tag in tags array
		const updateTag = updatePETPayload.tags[0];
		const responseTag = getResponse.body.tags[0];
		expect(responseTag).toBeDefined(); // Make sure responseTag is defined
		expect(responseTag.id).toEqual(updateTag.id);
		console.log(`Expected Tag ID: ${updateTag.id}`);
		console.log(`Actual Tag ID  : ${responseTag.id}`);
		expect(responseTag.name).toEqual(updateTag.name);
		console.log(`Expected Tag Name: ${updateTag.name}`);
		console.log(`Actual Tag Name  : ${responseTag.name}`);
		console.log('Successfully validated the name, status and tag of the pet with payload used for update PET');
	});
});
