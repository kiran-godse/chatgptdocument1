const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');


const octokit = new Octokit({
  auth: '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', // Replace with your GitHub personal access token
});

const repositoryOwner = 'kiran-godse'; // Replace with your GitHub username
const repositoryName = 'chatgptdocument1'; // Replace with your repository name

async function postChatbotResponseToDiscussion(discussionId, response) {
  try {
    await octokit.rest.issues.createComment({
      owner: repositoryOwner,
      repo: repositoryName,
      issue_number: discussionId,
      body: response,
    });
  } catch (error) {
    console.error('Error posting comment:', error);
  }
}

async function processDiscussion(event) {
  const discussionId = event.discussion.id;
  const discussionTitle = event.discussion.title;
  const discussionBody = event.discussion.body;

  // Call your chatbot script with discussionBody as input and get the response
  const chatbotResponse = await callChatbotScript(discussionBody);

  // Post the chatbot response as a comment in the discussion
  await postChatbotResponseToDiscussion(discussionId, chatbotResponse);
}

async function callChatbotScript(input) {
  // This is where you'd call your chatbot script and pass the input
  // You'll need to adapt this part to how your chatbot script is designed
  // You can use child_process.spawn or similar methods to execute your script
  // and capture its output
  const response = 'Chatbot response'; // Replace with the actual response
  return response;
}

async function main() {
  try {
    const discussions = await octokit.rest.discussions.listForRepo({
      owner: repositoryOwner,
      repo: repositoryName,
    });

    for (const discussion of discussions.data) {
      await processDiscussion({ discussion });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
