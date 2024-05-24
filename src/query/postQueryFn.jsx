import { request } from "./request";

export const postQueryFn = async (params) => {
  const param = params?.queryKey;
  const { data } = await request({
    url: param[0],
    method: params?.method ?? "get",
    params: param[1] ?? {},
    data: param[2] ?? {},
  });

  // console.log(param);
  return {
    data,
  };
};
