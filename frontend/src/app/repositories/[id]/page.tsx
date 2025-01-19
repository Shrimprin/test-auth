"use client";

import type { NextPage } from "next";
import camelcaseKeys from "camelcase-keys";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { FileItemComponent, FileItem } from "./FileItem";

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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repositories/${id}`;
  const { data, error } = useSWR(url, fetcher);

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
