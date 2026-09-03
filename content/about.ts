import type { Locale } from "@/lib/i18n";

import type { LocalizedText } from "./types";

export interface SocialPlatform {
  id: "qq" | "vrchat" | "discord" | "douyin" | "bilibili";
  name: string;
  account: string;
  href: string;
  iconSrc: string;
  linkNote: LocalizedText;
  qrAlt: LocalizedText;
  placeholder: boolean;
}

export interface TeamMember {
  id: "linqi" | "lukij" | "ky39" | "yumi";
  name: string;
  monogram: string;
  role: LocalizedText;
  portraitSrc: string | null;
  portraitAlt: LocalizedText;
}

export const socialPlatforms: readonly SocialPlatform[] = [
  {
    id: "qq",
    name: "QQ",
    account: "PrismShot-棱镜定格",
    href: "https://qun.qq.com/universal-share/share?ac=1&authKey=LNlrUNfp5UiuvgXV95A9CmGbIwI2lU5cg4sYJKKb1aN7fhHbrBVvjeffxLE9RznM&busi_data=eyJncm91cENvZGUiOiIyMjU2OTU2MDQiLCJ0b2tlbiI6Ik5PZG1YQ0ZBZGNYYllxTWc1RG1YaDZKVFpQSE8xZ1JKSFNEMGwvZFY1cUJDNE1JRGIwaWtxRDhXeEp0cThObkwiLCJ1aW4iOiI0NjE3NTUzNTkifQ%3D%3D&data=yptXIfMwo4G84TGk9eSy0cuq5_p-sthFpu3EHf5mFvMrH5LpwIjNDiwrjoaWKDLR5ve66nO-OcKAjv0uuzedlw&svctype=4&tempid=h5_group_info",
    iconSrc: "/icons/social/qq.svg",
    linkNote: { zh: "群号 225695604", en: "QQ Group: 225695604"},
    qrAlt: { zh: "QQ 社群链接二维码", en: "QR code for the QQ community link" },
    placeholder: false,
  },
  {
    id: "vrchat",
    name: "VRChat",
    account: "PrismShot",
    href: "https://vrc.group/PSPC.2575",
    iconSrc: "/icons/social/vrchat.svg",
    linkNote: { zh: "群组链接", en: "Group link" },
    qrAlt: { zh: "VRChat 社群链接二维码", en: "QR code for the VRChat community link" },
    placeholder: false,
  },
  {
    id: "discord",
    name: "Discord",
    account: "PrismShot-棱镜定格",
    href: "https://discord.gg/T4yFrRafum",
    iconSrc: "/icons/social/discord.svg",
    linkNote: { zh: "邀请链接", en: "Invite link" },
    qrAlt: { zh: "Discord 邀请链接二维码", en: "QR code for the Discord invite" },
    placeholder: false,
  },
  {
    id: "douyin",
    name: "抖音 / Douyin",
    account: "PRISM SHOT · 棱镜定格",
    href: "https://v.douyin.com/E0ZmQGi6c0M",
    iconSrc: "/icons/social/douyin.svg",
    linkNote: { zh: "抖音号: 59470793965", en: "Douyin: 59470793965" },
    qrAlt: { zh: "抖音主页二维码", en: "QR code for the Douyin profile" },
    placeholder: false,
  },
  {
    id: "bilibili",
    name: "Bilibili",
    account: "PRISOM-SHOT棱镜定格",
    href: "https://space.bilibili.com/3706975426710102",
    iconSrc: "/icons/social/bilibili.svg",
    linkNote: { zh: "UID: 3706975426710102", en: "UID: 3706975426710102" },
    qrAlt: { zh: "Bilibili 主页二维码", en: "QR code for the Bilibili profile" },
    placeholder: false,
  },
];

export const teamMembers: readonly TeamMember[] = [
  {
    id: "linqi",
    name: "林琪",
    monogram: "LQ",
    role: { zh: "创始人", en: "Founder" },
    portraitSrc: null,
    portraitAlt: { zh: "林琪的人物照片", en: "Portrait of Linqi" },
  },
  {
    id: "lukij",
    name: "LukiJ",
    monogram: "LJ",
    role: { zh: "负责人", en: "Lead" },
    portraitSrc: null,
    portraitAlt: { zh: "LukiJ 的人物照片", en: "Portrait of LukiJ" },
  },
  {
    id: "ky39",
    name: "~KY39~",
    monogram: "KY39",
    role: { zh: "管理员", en: "Administrator" },
    portraitSrc: null,
    portraitAlt: { zh: "~KY39~ 的人物照片", en: "Portrait of ~KY39~" },
  },
  {
    id: "yumi",
    name: "尤米",
    monogram: "YUMI",
    role: { zh: "网站制作人", en: "Web Producer" },
    portraitSrc: null,
    portraitAlt: { zh: "尤米的人物照片", en: "Portrait of Yumi" },
  },
];

export const aboutPageCopy: Record<Locale, {
  manifestoSection: { number: string; title: string; accent: string; note: string };
  connectSection: { number: string; title: string; accent: string; note: string };
  supportSection: { number: string; title: string; accent: string; note: string };
  teamSection: { number: string; title: string; accent: string; note: string };
  placeholderTag: string;
  lead: string;
  body: readonly string[];
  supportIntro: readonly string[];
  supportUsesLabel: string;
  supportUses: readonly string[];
  supportContact: string;
  supportContactLabel: string;
  teamIntro: string;
  portraitPendingLabel: string;
  logoAlt: string;
  privacyTitle: string;
  privacyBody: string;
}> = {
  zh: {
    manifestoSection: {
      number: "01 / Manifesto",
      title: "在虚拟次元，",
      accent: "定格真实热爱",
      note: "",
    },
    connectSection: {
      number: "02 / Connect",
      title: "在你常用的平台，",
      accent: "找到我们",
      note: "",
    },
    supportSection: {
      number: "03 / Support",
      title: "一份支持，",
      accent: "让更多光影赛事发生",
      note: "",
    },
    teamSection: {
      number: "04 / Team",
      title: "在镜头之外，",
      accent: "他们同样重要",
      note: "",
    },
    placeholderTag: "VRChat虚拟摄影群组",
    lead: "这里是 PrismShot 棱镜定格，一个为 VRChat 摄影爱好者量身打造的灵感聚集地。",
    body: [
      "无论你是想解锁虚拟拍摄技能，还是想找到同好共创作品，这里都有属于你的创作舞台。我们相信，摄影不是少数人的技术竞赛，而是一种可以共同练习的观看方式。",
      "从主题合拍、搭档挑战，到面向新人的摄影教学，我们希望每一次活动都能让成员带走一张喜欢的作品，也带走一段值得记住的关系。",
    ],
    supportIntro: [
      "我们是由 VRChat 摄影爱好者自发组成的小众社群，至今所有活动都靠大家用爱发电。",
      "你的每一份赞助，都将直接用于摄影比赛奖金、创作奖品与主题活动落地，让更多热爱虚拟摄影的人，能在镜头里被看见。",
    ],
    supportUsesLabel: "赞助用途",
    supportUses: [
      "主题摄影赛事的奖金与奖品",
      "大型创作活动的支持",
      "优秀作品的推广与展映",
      "社群创作资源的补给",
    ],
    supportContact: "赞助与合作可在 QQ 群联系社团负责人，备注「社团赞助」；所有支持，我们都会在社群内公开致谢。",
    supportContactLabel: "前往 QQ 群联系",
    teamIntro: "PrismShot 运营团队，驱动社团日常与所有创作项目。",
    portraitPendingLabel: "人物照片待替换",
    logoAlt: "PrismShot 棱镜定格彩色棱镜标志",
    privacyTitle: "隐私说明",
    privacyBody: "本站为静态展示网站，不提供登录、投稿、报名或站内表单，不主动收集访客个人信息。外部社交平台链接与二维码将带你离开本站，其数据处理规则以对应平台的隐私政策为准。正式站点如启用 Cloudflare Web Analytics，将仅用于了解匿名化的基础访问情况。",
  },
  en: {
    manifestoSection: {
      number: "01 / Manifesto",
      title: "Across virtual worlds, ",
      accent: "capture what we truly love",
      note: "",
    },
    connectSection: {
      number: "02 / Connect",
      title: "Find us on ",
      accent: "the platforms you use",
      note: "",
    },
    supportSection: {
      number: "03 / Support",
      title: "A little support, ",
      accent: "more stories in light",
      note: "",
    },
    teamSection: {
      number: "04 / Team",
      title: "Beyond the lens, ",
      accent: "they matter just as much",
      note: "",
    },
    placeholderTag: "VRChat Photography Group",
    lead: "PrismShot is a creative home built for VRChat photographers.",
    body: [
      "Whether you are learning virtual photography or looking for people to create with, there is room for your perspective here. We see photography not as a technical contest for a few, but as a way of looking that anyone can practise together.",
      "From themed group shoots and partner challenges to beginner workshops, we hope every event leaves members with a photograph they love and a connection worth remembering.",
    ],
    supportIntro: [
      "We are a small, self-organised community of VRChat photography enthusiasts, and every event so far has been made possible by members volunteering their time and care.",
      "Every contribution goes directly towards contest prizes, creative awards, and themed events—helping more virtual photographers have their work seen.",
    ],
    supportUsesLabel: "How support is used",
    supportUses: [
      "Prizes and awards for themed photography contests",
      "Support for major creative events",
      "Promotion and showcases for outstanding work",
      "Creative resources for the community",
    ],
    supportContact: "For sponsorships and collaborations, contact the club lead through our QQ group and include “Club Sponsorship” in your message. We publicly acknowledge every contribution within the community.",
    supportContactLabel: "Contact us on QQ",
    teamIntro: "The PrismShot operations team keeps the community and every creative project moving.",
    portraitPendingLabel: "Portrait to be added",
    logoAlt: "Colour prism mark for PrismShot Photography Club",
    privacyTitle: "Privacy",
    privacyBody: "This is a static presentation site with no accounts, on-site submissions, registration, or forms, and it does not actively collect visitors' personal information. Social links and QR codes take you to third-party platforms governed by their own privacy policies. If Cloudflare Web Analytics is enabled, it will only provide basic anonymised traffic information.",
  },
};
