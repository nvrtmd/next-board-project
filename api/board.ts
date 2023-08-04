import axios from 'axios';

export const boardApi = {
  getPostList: async (start: number, count: number) => {
    try {
      const postList = await axios.get(`/test/post/list?start=${start}&count=${count}`);

      return postList;
    } catch {
      throw {
        code: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
  },
};
