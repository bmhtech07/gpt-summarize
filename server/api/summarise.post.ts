import { Configuration, OpenAIApi } from 'openai';
import { prompts as promptOptions } from '~~/config/prompts';
import { validateSummarize } from '../utils/summarizeValidator';

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY 
});

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    validateSummarize.parse(body)
    const { prompt: formPrompt, report } = body
    const prompt = promptOptions[formPrompt].prompt; // Validate form prompt against our list of prompts
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: "user", content: `${prompt} ${report}` }],
      temperature: 0,
    })
    return response.data.choices[0].message.content
  } catch (err) {
    console.log("Error fetching OpenAI: ", err)
    return err
  }
});