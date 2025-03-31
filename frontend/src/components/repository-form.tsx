'use client';

import { axiosPost } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type FormValues = {
  url: string;
};

const schema = z.object({
  url: z
    .string()
    .url('有効なURLを入力してください')
    .nonempty('URLは必須です')
    .regex(
      /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
      'GitHubのリポジトリURLを入力してください',
    ),
});

export default function RepositoryForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const accessToken = session?.user?.accessToken;
    const url = '/api/repositories';
    const postData = {
      repository: { url: data.url },
    };
    try {
      const res = await axiosPost(url, accessToken, postData);
      router.push(`/repositories/${res.data.id}`);
    } catch (error) {
      console.log(error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Create Repository</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('url')}
          placeholder="Enter repository URL"
        />
        {errors.url && (
          <span style={{ color: 'red' }}>{errors.url.message}</span>
        )}
        <button type="submit" disabled={isSubmitting}>
          Create
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
