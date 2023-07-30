import Prompt from '@models/prompt';
import { connectToDB } from '@utils/db';

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });
    return new Response('Prompt added successfully', { status: 201 });
  } catch (error) {
    return new Response('Failed to add prompt successfully', { status: 500 });
  }
};
