'use client';

import { useMutation } from '@tanstack/react-query';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { FormEvent, useRef, useState } from 'react';
import { Loader } from '~/src/components/Loader';
import { Message } from '~/src/components/Message';
import { TextArea } from '~/src/components/TextArea';

const createChatCompletion = (messages: ChatCompletionRequestMessage[]) => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  return openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
};

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const ref = useRef<HTMLUListElement>(null);

  const mutation = useMutation(
    (newMessages: ChatCompletionRequestMessage[]) =>
      createChatCompletion(newMessages),
    {
      onSuccess: (response) => {
        const newText = response.data.choices[0].message?.content;

        if (!newText) {
          return;
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: newText,
          },
        ]);

        scrollToLastMessage();
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = String(formData.get('user'));

    const newMessage = {
      role: 'user',
      content: user,
    } satisfies ChatCompletionRequestMessage;

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    scrollToLastMessage();

    e.currentTarget.reset();

    mutation.mutate(newMessages);
  };

  const scrollToLastMessage = () => {
    setTimeout(() => {
      ref.current?.children[ref.current?.children.length - 1].scrollIntoView();
    }, 1);
  };

  return (
    <main className="m-auto max-w-xl flex flex-col px-2 py-8 h-full">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center">ChatGEPETO</h1>
        <ul ref={ref} className="flex flex-col flex-1">
          {messages.map((message, i) => (
            <Message message={message} key={message.content + i} />
          ))}
          {messages.length === 0 && <li>No messages yet, start a conversation!</li>}

          {mutation.isLoading && (
            <li className="flex items-center w-full p-4">
              <Loader />
              <p className="text-zinc-300 animate-pulse">
                ChatGEPETO is thinking...
              </p>
            </li>
          )}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={mutation.isLoading} className="flex items-end gap-2">
          <div className="flex-1">
            <TextArea name="user" label="Your message" />
          </div>
          <button
            type="submit"
            className="text-white disabled:dark:bg-green-800 disabled:dark:text-zinc-400 disabled:text-zinc-400 disabled:bg-green-300 disabled:cursor-not-allowed bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </main>
  );
}
