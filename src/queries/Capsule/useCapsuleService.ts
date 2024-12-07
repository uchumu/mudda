import { useMutation, useQuery } from "@tanstack/react-query";
import CapsuleService from "./CapsuleService";

const queryKeys = {
  capsule: ({ code }: { code: string }) => ["capsule", code] as const,
};

export const useCapsuleQuery = ({ code }: { code: string }) =>
  useQuery({
    queryKey: queryKeys.capsule({ code }),
    queryFn: () => CapsuleService.getCapsule({ code }),
  });

export const useCapsuleMutate = () =>
  useMutation({ mutationFn: CapsuleService.postCapsule });
