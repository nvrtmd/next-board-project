export interface Post {
  post_idx: number;
  post_title: string;
  post_contents: string;
  createdAt: Date;
  updatedAt: Date;
  member_idx: number;
  post_writer: {
    member_id: string;
    member_nickname: string;
  };
  comments?: Comment[];
  comments_count?: number;
}

export interface NewPost {
  title: string;
  contents: string;
}

export interface CustomError {
  code: string;
  message: string;
}

export interface NewComment {
  contents: string;
}

export interface Comment {
  comment_contents: string;
  comment_idx: number;
  comment_writer: {
    member_id: string;
    member_nickname: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  member_idx?: number;
  post_idx?: number;
}
