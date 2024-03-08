'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/types/post';

export default function PostCard({
  post: { slug, title, date, cover, categories, author },
}: {
  post: Post;
}) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="mx-auto flex max-w-[25rem] flex-col overflow-hidden transition-all duration-300 hover:scale-[1.05]">
        <div className="relative h-60 overflow-hidden mb-4">
          <Image
            src={cover}
            alt="cover image"
            fill
            quality={80}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="truncate text-lg md:text-lg font-bold mb-2 flex gap-3 items-center"><div className='w-1 h-6 bg-red-600' />{title}</h3>
          <p className="mb-4 text-sm text-gray-400 flex gap-1 uppercase font-semibold"><span className='text-red-600'>{author}</span> - {new Date(date.replace(/-/g, "/") + " 00:00:00").toLocaleDateString("pt-BR", { day: '2-digit', month: 'long', year: 'numeric' })} - <Link href={'/categoria/'+ categories[0]} className='text-red-600 hover:text-red-400'>{categories[0]}</Link></p>
        </div>
      </article>
    </Link>
  );
}
