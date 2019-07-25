import request from "@/utils/request";
export function gettableDate(data) {
  return request({
    url: "/platform/info/selectList",
    method: "post",
    data
  });
}
