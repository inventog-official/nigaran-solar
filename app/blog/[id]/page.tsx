"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useBlog } from "@/lib/queries/blogs";

export default function BlogPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading, error } = useBlog(params.id);

  if (isLoading) {
    return <div className="min-h-screen pt-20 container">Loading...</div>;
  }

  if (error || !data?.blog) {
    return (
      <div className="min-h-screen pt-20 container">
        Error loading blog post
      </div>
    );
  }

  const blog = data.blog;

  return (
    <div className="min-h-screen pt-20 lg:pb-56 pb-[80%]">
      <div className="container py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="text-sm text-primary font-medium">
                {blog.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                {blog.title}
              </h1>
              <p className="text-muted-foreground mt-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}