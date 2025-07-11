# Summary

This framework is designed to automate API testing for the PetStore application. It integrates popular tools and libraries like **Supertest**, **JEST**, **Jest HTML Reports**, and **CI/CD - Github Actions**  to provide a robust and maintainable testing solution.

## Tech Stack
1. [TypeScript](https://www.typescriptlang.org/)
2. [SuperTest](https://www.npmjs.com/package/supertest)
3. [Jest](https://jestjs.io/)
4. [Jest HTML Report](https://www.npmjs.com/package/jest-html-reporter)
5. [NodeJs](https://nodejs.org/en)
7. [CI/CD - Github Actions](https://docs.github.com/en/actions)
8. [Git](https://git-scm.com/)

## Getting Started

### Prerequisite
1. Should have [NodeJs](https://nodejs.org/en)  installed on machine.

### How to run
The different test 'packets' are located under `packages` folder.
In most of the cases the setup would still be the same, something along the following lines to be run within the relevant pack:
1. `nvm use`
2. `npm ci` (or if adding new dependencies then `npm install`)
3. `npm run test:pestore` - It will generate junit report in xml format at [result folder](packages/api/result/test-result.xml)
4. `npm run test:petstore-html-report` - It will generate html report at [jest_html_reporters.html](packages/api/jest_html_reporters.html)

### Test Result
1. Default reporter will print console log and Test status on console.
2. We also added jest html reporter, Once test complete report can be found at `packages/api/jest_html_reporters.html`
3. Open above report in Browser


## Contribution

As an initial example `petstore-api.spec.ts` can be used.

1. For New test cases create new spec `...spec.ts` under petstore folder
2. If this is something of a bigger nature - create a dedicated folder and put all of the relevant helpers/utils within it
3. On the top level there is a `commons` folder - add common things here
4. Make sure to run `npm run lint:fix` if adding new code
5. When adding new dependency - make sure to run `npm install` and commit all of the changes


## CI - GitHub Actions
The GitHub actions workflow are found in this directory - [.github/workflows](.github/workflows)

### Running github action and view report
1. Go to Actions tab - [Actions](https://github.com/srthorat/petstore-ts/actions)
2. From the left, below All workflows select the workflow - [PetStore API - E2E](https://github.com/srthorat/petstore-ts/actions/workflows/petstore-api-e2e.yml)
3. A `Run workflow` dropdown will appear on the right, Select it, then choose `branch - main`, and click `Run Workflow`.
4. Refresh Page
5. You can now see - `PetStore API - E2E` job is running, While completes, open Java CI with Maven to monitor the test
   running status and view logs.
6. Once the `PetStore API - E2E` job complete, the `Report - PetStore Api Tests` job will start
   running automatically, wait for it to complete.
7. Once the `Report - PetStore Api Tests` gets completes, double-click on job name. 
8. You can see Status of run in html format