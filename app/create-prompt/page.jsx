'use client';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function CreatePrompt() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <Form
      type='Create'
      isSubmitted={isSubmitted}
      post={post}
      setPost={setPost}
      handleSubmit={handleCreatePost}
    />
  );
}

export default CreatePrompt;
