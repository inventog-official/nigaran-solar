"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogs } from "@/lib/queries/blogs";
import { Badge } from "../ui/badge";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  index: number;
}

const BlogCard = ({ id, title, excerpt, imageUrl, index }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden shadow-sm"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={338}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        <Link href={`/blog/${id}`}>
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-primary"
          >
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useBlogs();

  if (isLoading) {
    return <div className="py-16 text-center">Loading blog posts...</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        Error loading blog posts
      </div>
    );
  }

  const blogs = data?.blogs || [];

  if (!blogs.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="lg:p-[5%] px-[2%] py-[10%] bg-[#F3F9FF]"
    >
      <div className="container ">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">Blogs</Badge>
            <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl text-black/80">
              Insights, Trends, And Tips From Industry Experts
            </h2>
            <div className="w-20 h-1 mb-6 bg-primary"></div>
            <p className="text-lg text-muted-foreground text-justify mb-6">
              Stay informed with the latest news and developments in renewable
              energy and sustainable practices.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post, index) => (
            <>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  index={index}
                />
              </motion.div>
            </>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
