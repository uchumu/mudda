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

  const mutation = useMutation(
    {
      mutationFn: CapsuleService.putCapsuleDig,
      onSuccess: () => {},
    },
    queryClient
  );

  return {
    ...mutation,
    invalidateCapsuleQueries: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.capsule({ code }),
      }),
  };
};

// 모달 확인 하기전에 캐싱이 초기화되서 페이지 전환되어 디자인 규격 안맞는 문제
// onSuccess: () =>
//   queryClient.invalidateQueries({
//     queryKey: queryKeys.capsule({ code }),
//   }),
