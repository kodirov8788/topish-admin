import axios from "../../api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users-get"],
    queryFn: async () =>
      await axios
        .get(`/users/AllUsers`)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
        }),
  });
};
