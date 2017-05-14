const fetch = require("node-fetch");

async function showGitHubUser(handle) {
    const url = `https://api.github.com/users/${handle}`;
    const response = await fetch(url);
    const user = await response.json();
    console.log(user.name);
    console.log(user.location);
}

async function fetchFromGithub(endPoint) {
    const url = `https://api.github.com${endPoint}`;
    const response = await fetch(url);
    return await response.json(); 
}

async function showUserAndRepos(handle) {

	// can use try/catch for error handling
	try {

		//const userPromise = fetchFromGithub(`/users/${handle}`);
		//const reposPromise = fetchFromGithub(`/users/${handle}/repos`);

		//let user = await userPromise;
		//let repos = await reposPromise;

		// promise.all example
		let [user, repos] = await Promise.all([
			fetchFromGithub(`/users/${handle}`),
			fetchFromGithub(`/users/${handle}/repos`)
		]);

		console.log(user.name);
		console.log(`${repos.length} repos`);

	}catch (err){
		console.log(err)
	}
	
}

//showGitHubUser("mariusschulz");

showUserAndRepos('mariusschulz');

/*
	Generator converter
*/

// Symbol.asyncIterator = Symbol.asyncIterator || Symbol("asyncIterator");

// const delay = (ms) => new Promise(resolve => {
//     setTimeout(resolve, ms);
// });

// async function* someGenerator() {
//     await delay(1000);
//     yield 1;
//     await delay(1000);
//     yield 2;
//     await delay(1000);
//     yield 3;
// }

// async function main() {
//     for await (const value of someGenerator()) {
//         console.log(value);
//     }
// }
