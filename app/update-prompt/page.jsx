'use client';
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function UpdatePrompt() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const promptId = searchParam.get('id');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const handleEditPost = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!promptId) alert('Prompt ID not found');
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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

  useEffect(() => {
    const fetchPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) fetchPromptDetails();
  }, [promptId]);

  return (
    <Form
      type='Edit'
      isSubmitted={isSubmitted}
      post={post}
      setPost={setPost}
      handleSubmit={handleEditPost}
    />
  );
}

export default UpdatePrompt;
