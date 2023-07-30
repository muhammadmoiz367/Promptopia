import { connectToDB } from '@utils/db';
import Prompt from '@models/prompt';

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const promptExist = await Prompt.findById(params.id).populate('creator');
    if (!promptExist) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(promptExist), { status: 200 });
  } catch (error) {
    console.log('🚀 ~ file: route.js:14 ~ GET ~ error:', error);
    return new Response('Failed to get specific prompt', {
      status: 500,
    });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const promptExist = await Prompt.findById(params.id);
    if (!promptExist) {
      return new Response('Prompt not found', { status: 404 });
    }
    promptExist.prompt = prompt;
    promptExist.tag = tag;
    await promptExist.save();
    return new Response('prompt updated successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to edit prompt', {
      status: 500,
    });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', {
      status: 500,
    });
  }
};
