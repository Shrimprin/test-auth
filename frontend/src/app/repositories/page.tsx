"use client";

import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/utils";
import camelcaseKeys from "camelcase-keys";

type Repository = {
  id: string;
  name: string;
  // TODO: 進捗と最後にタイプした時間も入れる
};

const RepositoriesPage: NextPage = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repositories`;
  const { data, error } = useSWR(url, fetcher);

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
