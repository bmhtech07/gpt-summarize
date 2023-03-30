import { Configuration, OpenAIApi } from 'openai';
import { prompts as promptOptions } from '~~/config/prompts';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY 
});

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
  const { prompt: formPrompt, report } = await readBody(event)
  const prompt = promptOptions[formPrompt].prompt; // Reconsile form prompt against our list of prompts
  console.log("prompt: ", prompt);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: "user", content: `${prompt} ${report}` }],
      temperature: 0,
    })
    console.log("Response: ", response.data.choices[0].message.content);
    return response.data;
  } catch (err) {
    console.log("Error fetching OpenAI: ", err);
    return err;
  }
});