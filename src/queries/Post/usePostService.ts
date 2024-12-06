import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostService from "./PostService";

const queryKeys = {
  posts: ["posts"] as const,
  post: ({ id }: { id: number }) => [...queryKeys.posts, id] as const,
  comments: ({ postId }: { postId: number }) =>
    [...queryKeys.post({ id: postId }), "comments"] as const,
  comment: ({ id }: { id: number }) => ["comments", id] as const,
};

export const usePosts = () =>
  useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => PostService.getPosts(),
  });

export const usePost = ({ id }: { id: number }) =>
  useQuery({
    queryKey: queryKeys.post({ id }),
    queryFn: () => PostService.getPostById({ id }),
  });

export const useComments = ({ postId }: { postId: number }) =>
  useQuery({
    queryKey: queryKeys.comments({ postId }),
    queryFn: () => PostService.getCommentsByPostId({ postId }),
  });

export const useComment = ({ id }: { id: number }) =>
  useQuery({
    queryKey: queryKeys.comment({ id }),
    queryFn: () => PostService.getCommentById({ id }),
  });

export const usePostPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: PostService.postPost,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.posts }),
    },
    queryClient
  );
};
