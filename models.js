const axios = require('axios');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const handleRequest = async (body) => {
  const msg = await getWikiSummary(body);
  return msg
}



const getWikiSummary = async (body) => {

  const twiml = new MessagingResponse();
  const { data } = await axios(`https://api.duckduckgo.com/?skip_disambig=1&format=json&pretty=1&q=${body}`);

  if (!data.Results.length && data["Abstract"] === "") {
    return twiml.message("No Article found in Wikipedia");
  }

  if (data["Abstract"] === "") {
    data["Abstract"] = data["RelatedTopics"][0]["Text"]
  }

  const title = data["Heading"];
  const summary = data["Abstract"];
  const link = data["AbstractURL"];

  return twiml.message(`*${title}*
  
  ${summary}

${link}
  `);
}

module.exports = {
  handleRequest
}