import { Post, NewPost, NewComment } from 'global/types';
import axios from 'axios';
import { BOARD_ERROR_MESSAGE } from '@/constants/constants';

export const boardApi = {
  getPostList: async (start: number, count: number): Promise<Post[]> => {
    try {
      const postList = await axios.get(`/test/post/list?start=${start}&count=${count}`);
      return postList.data.data;
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_GET_POST_LIST_FROM_SERVER,
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
        message: BOARD_ERROR_MESSAGE.CANNOT_GET_POST_DATA_FROM_SERVER,
      };
    }
  },
  createPost: async (data: NewPost) => {
    try {
      await axios.post(`/test/post`, data);
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_CREATE_POST,
      };
    }
  },
  modifyPost: async (postIdx: string, data: NewPost) => {
    try {
      await axios.patch(`/test/post/${postIdx}`, data);
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_MODIFY_OR_DELETE_POST,
      };
    }
  },
  deletePost: async (postIdx: string) => {
    try {
      await axios.delete(`/test/post/${postIdx}`);
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_MODIFY_OR_DELETE_POST,
      };
    }
  },
  getCommentList: async (postIdx: string, start: number, count: number) => {
    try {
      const commentListData = await axios.get(`/test/post/${postIdx}/comment/list?start=${start}&count=${count}`);
      return commentListData.data.data;
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_GET_COMMENT_LIST,
      };
    }
  },
  createComment: async (postIdx: string, data: NewComment) => {
    try {
      await axios.post(`/test/post/${postIdx}/comment`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_CREATE_COMMENT,
      };
    }
  },
  modifyComment: async (postIdx: string, commentIdx: number, data: NewComment) => {
    try {
      await axios.patch(`/test/post/${postIdx}/comment/${commentIdx}`, data, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_MODIFY_COMMENT,
      };
    }
  },
  deleteComment: async (postIdx: string, commentIdx: number) => {
    try {
      await axios.delete(`/test/post/${postIdx}/comment/${commentIdx}`, { withCredentials: true });
    } catch {
      throw {
        code: 500,
        message: BOARD_ERROR_MESSAGE.CANNOT_DELETE_COMMENT,
      };
    }
  },
};
