import clsx from 'clsx';
import Image from 'next/image';
import { ChatCompletionRequestMessage } from 'openai';
import ReactMarkdown from 'react-markdown';

type MessageProps = {
  message: ChatCompletionRequestMessage;
};

export const Message = ({ message }: MessageProps) => {
  if (message.role === 'system') return null;

  const isUser = message.role === 'user';

  const imageUrl = isUser ? '/avatar.webp' : '/ia.png';

  return (
    <li
      className={clsx('w-full flex gap-4 p-4', {
        'bg-zinc-700': isUser,
      })}
    >
      <div className="w-12 h-12">
        <Image src={imageUrl} width={42} height={42} alt="Avatar" />
      </div>
      <div className="prose dark:prose-invert w-full">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </li>
  );
};
