import request from "@/utils/request";
export function fetchcitys () { 
  return request({
    url: "/cities/sheng",
    method: "get"
  });
}
export function fetchshi (data) {  
  return request({
    url: "/cities/shi",
    method: "post",
    data
  });
}

export function fetchxian (pro,city) {  
  return request({
    url: "/cities/xian",
    method: "post",
    pro,
    city
  });
}