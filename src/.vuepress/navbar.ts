import { navbar } from "vuepress-theme-hope";

export const Navbar = navbar([
  { text: "博客主页", icon: "blog", link: "/blog/" },
  { text: "自定义左侧目录", icon: "code", link: "/docs/" },
  { text: "左侧自动目录", icon: "free", link: "/autodir/" },
  {
    text: "资源宝库",
    icon: "advance",
    prefix: "/resources/",
    children: [
      {
        text: "书籍资源",
        icon: "animation",
        link: "books/",
      },
      {
        text: "影音资源",
        icon: "play",
        link: "videos/",
      },
    ],
  },
]);
