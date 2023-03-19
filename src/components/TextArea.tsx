'use client';

import { ComponentPropsWithoutRef, useId } from 'react';

type TextAreaProps = {
  label: string;
} & ComponentPropsWithoutRef<'textarea'>;

export const TextArea = ({ label, ...props }: TextAreaProps) => {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-green-500 focus:border-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        placeholder="Write your thoughts here..."
        {...props}
      ></textarea>
    </div>
  );
};
