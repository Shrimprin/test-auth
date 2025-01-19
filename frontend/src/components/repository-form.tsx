"use client";

import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormValues = {
  url: string;
};

export default function RepositoryForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const session = await getSession();
      const githubId = session?.user?.githubId;
      const accessToken = session?.user?.accessToken;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repositories`;
      const postData = {
        repository: { url: data.url },
        github_id: githubId,
        access_token: accessToken,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(url, postData, { headers: headers });
      router.push(`/repositories/${res.data.id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Create Repository</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("url", { required: "URL is required" })}
          placeholder="Enter repository URL"
        />
        {errors.url && (
          <span style={{ color: "red" }}>{errors.url.message}</span>
        )}
        <button type="submit" disabled={isSubmitting}>
          Create
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
