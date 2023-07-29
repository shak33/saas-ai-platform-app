import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { increaseApiLimit, checkApiLimit} from '@/lib/apiLimit';
import {checkSubscription} from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

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
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("API limit reached", {status: 403});
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('Code Error');
    return new NextResponse("Internal error", {status: 500});
  }
}