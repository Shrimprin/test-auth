"use client";

import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosPost } from "@/lib/axios";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const accessToken = session?.user?.accessToken;
    const url = "/api/repositories";
    const postData = {
      repository: { url: data.url },
    };
    try {
      const res = await axiosPost(url, accessToken, postData);
      router.push(`/repositories/${res.data.id}`);
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred");
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
