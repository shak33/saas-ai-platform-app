import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';
import ReactMarkdown from 'react-markdown';

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
        <ReactMarkdown
          components={{
            pre: ({ node, ...props }) => (
              <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                <pre {...props} />
              </div>
            ),
            code: ({ node, ...props }) => (
              <code className="bg-black/10 rounded-lg p-1" {...props} />
            ),
          }}
          className="text-sm overflow-hidden leading-7"
          key={content}
        >
          {content || ''}
        </ReactMarkdown>
      ))}
    </div>
  )
}

export default Messages;