'use client';

import { fetcher } from '@/utils/fetcher';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';

type Repository = {
  id: string;
  name: string;
  // TODO: 進捗と最後にタイプした時間も入れる
};

const RepositoriesPage: NextPage = () => {
  const url = '/api/repositories';
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const { data, error } = useSWR([url, accessToken], ([url, accessToken]) =>
    fetcher(url, accessToken),
  );

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  const repositories: Repository[] = camelcaseKeys(data);
  return (
    <div>
      <h1>Repositories</h1>
      {repositories.map((repository) => (
        <Link href={`/repositories/${repository.id}`} key={repository.id}>
          <div>{repository.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default RepositoriesPage;
