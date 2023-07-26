import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';

import { cn } from '@/lib/utils';
import { ChatCompletionRequestMessage } from 'openai';

interface MessagesProps {
  messages: ChatCompletionRequestMessage[];
}

const Messages = ({
  messages,
} : MessagesProps) => {
  return (
    <div className="flex flex-col-reverse gap-y-4">
      {messages.map(({content, role}) => (
        <div
          key={content}
          className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg", role === 'user' ? "bg-white border border-black/10" : "bg-muted")}

        >
          {role === 'user' ? <UserAvatar /> : <BotAvatar />}
          <p className="text-sm">
            {content}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Messages;