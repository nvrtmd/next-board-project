import { Post, NewPost } from 'global/types';
import axios from 'axios';

export const boardApi = {
  getPostList: async (start: number, count: number): Promise<Post[]> => {
    try {
      const postList = await axios.get(`/test/post/list?start=${start}&count=${count}`);

      return postList.data.data;
    } catch {
      throw {
        code: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
  },
  getPostData: async (postIdx: string) => {
    try {
      const postData = await axios.get(`/test/post/${postIdx}`);
      return postData.data.data;
    } catch {
      throw {
        code: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
  },
  createPost: async (data: NewPost) => {
    try {
      await axios.post(`/test/post`, data);
    } catch {
      throw {
        code: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
  },
  modifyPost: async (postIdx: string, data: NewPost) => {
    try {
      await axios.patch(`/test/post/${postIdx}`, data);
    } catch {
      throw {
        code: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
  },
};
