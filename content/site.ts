import type { Locale, PageKey } from "@/lib/i18n";

export interface PageHeroCopy {
  eyebrow: string;
  title: string;
  ghostTitle: string;
  statement: string;
  description: string;
}

export interface PageCopy {
  navLabel: string;
  headerMeta: string;
  metaTitle: string;
  metaDescription: string;
  hero?: PageHeroCopy;
}

export interface SiteCopy {
  languageName: string;
  alternateLanguageName: string;
  brandHomeLabel: string;
  primaryNavigationLabel: string;
  mobileNavigationLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  skipLinkLabel: string;
  languageSwitchLabel: string;
  privacyLabel: string;
  backHomeLabel: string;
  footerLocaleLabel: string;
  pages: Record<PageKey, PageCopy>;
  home: {
    kicker: string;
    title: string;
    subtitle: string;
    subtitleDetail: string;
    intro: string;
    note: string;
  };
}

export interface HomeSocialLink {
  name: "QQ" | "VRChat" | "Discord";
  href: string;
  iconSrc: string;
  placeholder: boolean;
}

// Set this to a site-root path after the club provides an approved homepage image.
// Keeping it null intentionally renders the designed black background.
export const homeBackgroundSrc: string | null = null;

export const homeSocialLinks: readonly HomeSocialLink[] = [
  {
    name: "QQ",
    href: "https://qun.qq.com/universal-share/share?ac=1&authKey=LNlrUNfp5UiuvgXV95A9CmGbIwI2lU5cg4sYJKKb1aN7fhHbrBVvjeffxLE9RznM&busi_data=eyJncm91cENvZGUiOiIyMjU2OTU2MDQiLCJ0b2tlbiI6Ik5PZG1YQ0ZBZGNYYllxTWc1RG1YaDZKVFpQSE8xZ1JKSFNEMGwvZFY1cUJDNE1JRGIwaWtxRDhXeEp0cThObkwiLCJ1aW4iOiI0NjE3NTUzNTkifQ%3D%3D&data=yptXIfMwo4G84TGk9eSy0cuq5_p-sthFpu3EHf5mFvMrH5LpwIjNDiwrjoaWKDLR5ve66nO-OcKAjv0uuzedlw&svctype=4&tempid=h5_group_info",
    iconSrc: "/icons/social/qq.svg",
    placeholder: false,
  },
  {
    name: "VRChat",
    href: "https://vrc.group/PSPC.2575",
    iconSrc: "/icons/social/vrchat.svg",
    placeholder: false,
  },
  {
    name: "Discord",
    href: "https://discord.gg/T4yFrRafum",
    iconSrc: "/icons/social/discord.svg",
    placeholder: false,
  },
];

export const siteContent: Record<Locale, SiteCopy> = {
  zh: {
    languageName: "中文",
    alternateLanguageName: "EN",
    brandHomeLabel: "PrismShot 棱镜定格首页",
    primaryNavigationLabel: "主导航",
    mobileNavigationLabel: "移动端导航",
    openMenuLabel: "打开菜单",
    closeMenuLabel: "关闭菜单",
    skipLinkLabel: "跳至主要内容",
    languageSwitchLabel: "Switch to English",
    privacyLabel: "隐私说明",
    backHomeLabel: "返回首页",
    footerLocaleLabel: "简体中文",
    pages: {
      home: {
        navLabel: "主页",
        headerMeta: "Virtual photography",
        metaTitle: "PrismShot 棱镜定格｜VRChat虚拟摄影群组",
        metaDescription:
          "PrismShot 棱镜定格——面向 VRChat 摄影爱好者与视频创作者的灵感聚集地。",
      },
      events: {
        navLabel: "活动",
        headerMeta: "Schedule / UTC+8",
        metaTitle: "活动｜PrismShot 棱镜定格",
        metaDescription:
          "查看 PrismShot 棱镜定格的活动日历、摄影共创活动与教学安排。",
        hero: {
          eyebrow: "Events · 一起按下快门",
          title: "Event",
          ghostTitle: "Schedule",
          statement: "把相遇排进日历，\n让灵感准时发生。",
          description:
            "从主题合拍、盲盒挑战到摄影教学，选择一场喜欢的活动，在镜头里和我们见面。活动时间均为北京时间（UTC+8）。",
        },
      },
      contests: {
        navLabel: "主题赛",
        headerMeta: "Theme challenge",
        metaTitle: "主题赛｜PrismShot 棱镜定格",
        metaDescription:
          "查看 PrismShot 棱镜定格当期摄影主题赛的赛程、规则与历届冠军作品。",
        hero: {
          eyebrow: "Theme contest · 本期主题",
          title: "Theme",
          ghostTitle: "Contest",
          statement: "同一个主题，\n无数种观看世界的方式。",
          description:
            "每期围绕一个主题展开摄影赛。成员在社群内投稿与投票，在这里关注赛程并查看获奖作品。",
        },
      },
      gallery: {
        navLabel: "画廊",
        headerMeta: "Archive / Moments",
        metaTitle: "画廊｜PrismShot 棱镜定格",
        metaDescription:
          "浏览 PrismShot 棱镜定格的社团活动摄影档案与成员创作瞬间。",
        hero: {
          eyebrow: "Gallery · 活动档案",
          title: "Photo",
          ghostTitle: "Archive",
          statement: "记忆没有标准比例，\n所以让每张照片自由生长。",
          description:
            "沿着拍摄时间，重温社团活动中的共同记忆。选择任意照片，进入大图细看。",
        },
      },
      about: {
        navLabel: "关于我们",
        headerMeta: "Club / About",
        metaTitle: "关于我们｜PrismShot 棱镜定格",
        metaDescription:
          "认识 PrismShot 棱镜定格，并通过 QQ、VRChat、Discord、抖音与 Bilibili 找到我们。",
        hero: {
          eyebrow: "About us · 棱镜定格",
          title: "Behind",
          ghostTitle: "The Lens",
          statement: "我们分享的不只是照片，\n也是彼此看见世界的方式。",
          description:
            "欢迎摄影爱好者、视频创作者与所有仍在摸索的人，在虚拟世界里一起创作。",
        },
      },
    },
    home: {
      kicker: "Virtual photography group",
      title: "PRISM SHOT",
      subtitle: "Photography Club",
      subtitleDetail: "棱镜定格",
      intro:
        "这里是 PrismShot 棱镜定格，一个为 VRChat 摄影爱好者与视频创作者量身打造的灵感聚集地！无论你是想解锁虚拟拍摄技能，还是想找到同好共创作品，这里都有属于你的创作舞台",
      note: "在虚拟次元，定格真实热爱",
    },
  },
  en: {
    languageName: "English",
    alternateLanguageName: "中文",
    brandHomeLabel: "PrismShot Photography Club home",
    primaryNavigationLabel: "Primary navigation",
    mobileNavigationLabel: "Mobile navigation",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    skipLinkLabel: "Skip to main content",
    languageSwitchLabel: "切换到中文",
    privacyLabel: "Privacy",
    backHomeLabel: "Back home",
    footerLocaleLabel: "English",
    pages: {
      home: {
        navLabel: "Home",
        headerMeta: "Virtual photography",
        metaTitle: "PrismShot | VRChat Photography Group",
        metaDescription:
          "PrismShot is a creative home for VRChat photographers and video makers.",
      },
      events: {
        navLabel: "Events",
        headerMeta: "Schedule / UTC+8",
        metaTitle: "Events | PrismShot",
        metaDescription:
          "Explore PrismShot's event calendar, collaborative shoots, and photography workshops.",
        hero: {
          eyebrow: "Events · Meet behind the lens",
          title: "Event",
          ghostTitle: "Schedule",
          statement: "Put every encounter on the calendar,\nand let inspiration arrive on time.",
          description:
            "From themed group shoots and mystery challenges to photography workshops, choose an event and meet us behind the lens. All times are shown in China Standard Time (UTC+8).",
        },
      },
      contests: {
        navLabel: "Contests",
        headerMeta: "Theme challenge",
        metaTitle: "Theme Contests | PrismShot",
        metaDescription:
          "See the current PrismShot photography theme, timeline, rules, and past champions.",
        hero: {
          eyebrow: "Theme contest · Current prompt",
          title: "Theme",
          ghostTitle: "Contest",
          statement: "One shared theme,\ncountless ways to see the world.",
          description:
            "Each round explores a photography theme. Members submit and vote in the community; follow the timeline and discover the winning photographs here.",
        },
      },
      gallery: {
        navLabel: "Gallery",
        headerMeta: "Archive / Moments",
        metaTitle: "Gallery | PrismShot",
        metaDescription:
          "Browse PrismShot's archive of community events and member-made photographic moments.",
        hero: {
          eyebrow: "Gallery · Event archive",
          title: "Photo",
          ghostTitle: "Archive",
          statement: "Memory has no standard ratio,\nso every photograph is free to grow.",
          description:
            "Follow the timeline through memories made at club events. Select any photograph to take a closer look.",
        },
      },
      about: {
        navLabel: "About us",
        headerMeta: "Club / About",
        metaTitle: "About Us | PrismShot",
        metaDescription:
          "Meet PrismShot and find the club on QQ, VRChat, Discord, Douyin, and Bilibili.",
        hero: {
          eyebrow: "About us · PrismShot",
          title: "Behind",
          ghostTitle: "The Lens",
          statement: "We share more than photographs—\nwe share ways of seeing the world.",
          description:
            "Photographers, video makers, and curious beginners are all welcome to create with us in virtual worlds.",
        },
      },
    },
    home: {
      kicker: "Virtual photography group",
      title: "PRISM SHOT",
      subtitle: "Photography Club",
      subtitleDetail: "PrismShot",
      intro:
        "PrismShot is a creative home built for VRChat photographers and video makers. Whether you are learning to shape a virtual frame or looking for people to create with, there is a place for your perspective here.",
      note: "Across virtual worlds, capture what we truly love",
    },
  },
};

export function getSiteContent(locale: Locale): SiteCopy {
  return siteContent[locale];
}
