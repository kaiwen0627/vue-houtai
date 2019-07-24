import Layout from "@/layout";
const reset = {
  path: "/reset",
  component: Layout,
  redirect: "/reset/index",
  name: "reset",
  hidden: true,
  meta: {
    title: "修改密码",
    icon: "Rest"
  },
  children: [
    {
      path: "/reset/index",
      component: () => import("@/views/reset/index"),
      name: "index"
    }
  ]
};
export default reset;
