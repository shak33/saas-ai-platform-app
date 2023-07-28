import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { increaseApiLimit, checkApiLimit} from '@/lib/apiLimit';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", {status: 500});
    }

    if (!messages) {
      return new NextResponse("Messages are required", {status: 400});
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("API limit reached", {status: 403});
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('Conversation Error');
    return new NextResponse("Internal error", {status: 500});
  }
}