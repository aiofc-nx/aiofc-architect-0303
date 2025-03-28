import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface IMessage {
  reasoning: string;
  content: string;
}

@Injectable()
export class CoreService {
  private openaiInstance: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openaiInstance = new OpenAI({
      apiKey: 'sk-ba1d1300d44c467283cd05f71a1eaa8d',
      baseURL: 'https://api.deepseek.com',
    });
  }

  async invoke(content: string): Promise<IMessage> {
    const completion = await this.openaiInstance.chat.completions.create({
      model: 'deepseek-r1',
      messages: [{ role: 'user', content }],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reasonBody: any = completion.choices[0].message as unknown;

    return {
      reasoning: reasonBody.reasoning_content,
      content: completion.choices[0].message.content,
    } as IMessage;
  }
}
