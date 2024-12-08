import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CapsuleService from "./CapsuleService";

export const queryKeys = {
  capsule: ({ code }: { code: string }) => ["capsule", code] as const,
};

export const useCapsuleQuery = ({ code }: { code: string }) =>
  useQuery({
    queryKey: queryKeys.capsule({ code }),
    queryFn: () => CapsuleService.getCapsule({ code }),
  });

export const useCapsuleMutate = () =>
  useMutation({ mutationFn: CapsuleService.postCapsule });

interface UseDigMutateProps {
  code: string;
}
export const useDigMutate = ({ code }: UseDigMutateProps) => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: CapsuleService.putCapsuleDig,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: queryKeys.capsule({ code }),
        }),
    },
    queryClient
  );
};
