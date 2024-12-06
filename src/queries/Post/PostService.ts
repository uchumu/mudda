/**
 * reference: https://jsonplaceholder.typicode.com/
 */

import { Comment, Post } from "@/types/server";
import getQueryString from "@/utils/getQueryString";
import Service from "../Service";

class PostService extends Service {
  getPosts = () => this.http.get<Post[]>(`/posts`);
  postPost = (body: { title: string; body: string; userId: number }) =>
    this.http.post<Post[]>(`/posts`, body);
  getPostById = ({ id }: { id: number }) => this.http.get<Post>(`/post/${id}`);
  getCommentsByPostId = ({ postId }: { postId: number }) =>
    this.http.get<Comment[]>(`/comments?${getQueryString({ postId })}`);
  getCommentById = ({ id }: { id: number }) =>
    this.http.get<Comment>(`/comments/${id}`);
}

export default new PostService();
