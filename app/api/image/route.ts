import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import { increaseApiLimit, checkApiLimit} from '@/lib/apiLimit';
import {checkSubscription} from "@/lib/subscription";

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
    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", {status: 500});
    }

    if (!prompt) {
      return new NextResponse("Prompt are required", {status: 400});
    }

    if (!amount) {
      return new NextResponse("Amount are required", {status: 400});
    }

    if (!resolution) {
      return new NextResponse("Resolution are required", {status: 400});
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("API limit reached", {status: 403});
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log('Image Error');
    return new NextResponse("Internal error", {status: 500});
  }
}