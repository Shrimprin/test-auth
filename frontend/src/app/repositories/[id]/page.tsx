'use client';

import { fetcher } from '@/utils/fetcher';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import type { FileItem } from './FileItem';
import { FileItemComponent } from './FileItem';

type RepositoryDetailProps = {
  params: { id: string };
};

type Repository = {
  name: string;
  url: string;
  fileItems: FileItem[];
};

const RepositoryDetail: NextPage<RepositoryDetailProps> = ({ params }) => {
  const id = params.id;
  const url = `/api/repositories/${id}`;
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const { data, error } = useSWR([url, accessToken], ([url, accessToken]) =>
    fetcher(url, accessToken),
  );

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  const repository: Repository = camelcaseKeys(data);
  return (
    <div>
      <h1>{repository.name}</h1>
      <p>URL: {repository.url}</p>
      <h2>File Items</h2>
      {repository.fileItems &&
        repository.fileItems.map((item: FileItem) => (
          <FileItemComponent key={item.id} item={item} />
        ))}
    </div>
  );
};

export default RepositoryDetail;
