import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys as CapsuleQueryKeys } from "../Capsule/useCapsuleService";
import MessageService from "./MessageService";

interface useMessageMutateProps {
  code: string;
}
export const useMessageMutate = ({ code }: useMessageMutateProps) => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: (formData: FormData) => MessageService.postMessage(formData),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: CapsuleQueryKeys.capsule({ code }),
        }),
    },
    queryClient
  );
};
