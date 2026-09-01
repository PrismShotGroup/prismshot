import type { Locale } from "@/lib/i18n";

import type { LocalizedText } from "./types";

export type ContestStatus = "upcoming" | "submitting" | "voting" | "ended";

export interface ContestRound {
  issue: string;
  theme: LocalizedText;
  themeEn: string;
  summary: LocalizedText;
  visualSrc: string;
  visualAlt: LocalizedText;
  submissionStart: string;
  voteStart: string;
  voteEnd: string;
  submissionDisplay: string;
  voteDisplay: string;
  statusOverride: ContestStatus | null;
  submissionUrl?: string;
  votingUrl?: string;
}

export interface ContestChampion {
  id: string;
  issue: string;
  theme: LocalizedText;
  author: string;
  imageSrc: string;
  imageAlt: LocalizedText;
}

export const currentContest: ContestRound = {
  issue: "07",
  theme: { zh: "霓虹之后", en: "After the Neon" },
  themeEn: "After the neon fades",
  summary: {
    zh: "当光源离开画面，色彩还会留下些什么？本期请围绕“余光、残影与夜色中的呼吸”进行创作，题材与拍摄方式不限。",
    en: "What colour remains after the light leaves the frame? Explore afterglow, visual echoes, and the breath of night in any subject or photographic approach.",
  },
  visualSrc: "/generated/events/event-04-1600.webp",
  visualAlt: {
    zh: "霓虹灯光下的活动现场占位图",
    en: "Placeholder scene under neon event lights",
  },
  submissionStart: "2026-08-24T00:00:00+08:00",
  voteStart: "2026-09-07T00:00:00+08:00",
  voteEnd: "2026-09-17T00:00:00+08:00",
  submissionDisplay: "08.24 — 09.06",
  voteDisplay: "09.07 — 09.16",
  statusOverride: null,
};

export const contestChampions: readonly ContestChampion[] = [
  {
    id: "issue-06",
    issue: "06",
    theme: { zh: "边界以外", en: "Beyond the Boundary" },
    author: "Lin",
    imageSrc: "/generated/events/event-10-1600.webp",
    imageAlt: {
      zh: "旷野中的层叠地貌与远方人物",
      en: "Layered terrain and a distant figure in the open landscape",
    },
  },
  {
    id: "issue-05",
    issue: "05",
    theme: { zh: "醒来之前", en: "Before Waking" },
    author: "anonymous",
    imageSrc: "/generated/events/event-11-1600.webp",
    imageAlt: {
      zh: "晨雾与群山之间的光线",
      en: "Light moving through morning mist and mountains",
    },
  },
  {
    id: "issue-04",
    issue: "04",
    theme: { zh: "一束远光", en: "A Distant Light" },
    author: "Yoru",
    imageSrc: "/generated/events/event-12-1600.webp",
    imageAlt: {
      zh: "自然景观中的远方光线",
      en: "Distant light across a natural landscape",
    },
  },
];

export const contestPageCopy: Record<Locale, {
  currentSection: { number: string; title: string; accent: string; note: string };
  rulesSection: { number: string; title: string; accent: string; note: string };
  archiveSection: { number: string; title: string; accent: string; note: string };
  status: Record<ContestStatus, string>;
  callout: string;
  rules: readonly { label: string; body: string; restriction?: string }[];
  submissionPeriod: string;
  votingPeriod: string;
  scheduleNote: string;
  submissionLink: string;
  votingLink: string;
  rulesLink: string;
  championLabel: string;
  photographyBy: string;
}> = {
  zh: {
    currentSection: {
      number: "01 / Current",
      title: "正在发生的",
      accent: "观看练习",
      note: "当期主题与日期为可替换内容；未配置群相册或投票链接时不会显示外链按钮。",
    },
    rulesSection: {
      number: "02 / Rules",
      title: "简单规则，",
      accent: "专注表达",
      note: "",
    },
    archiveSection: {
      number: "03 / Archive",
      title: "历届冠军，",
      accent: "一张图记住一期",
      note: "这里只展示主题、冠军作品与作者展示名；作品图为可替换占位素材。",
    },
    status: { upcoming: "即将开始", submitting: "投稿中", voting: "投票中", ended: "已结束" },
    callout: "每位成员可提交 1 张作品，无技术要求，新人也欢迎积极报名！",
    rules: [
      { label: "作品要求", body: "题材贴合当期主题即可，无过多限制；上传至群内指定相册并标注照片比例。" },
      { label: "投票方式", body: "投稿结束后立即开启群内投票。官网不接收作品，也不记录票数。" },
      { label: "胜负判定", body: "得票数最高者获胜；若票数相同，由管理员进行最终投票。" },
      { label: "优胜奖品", body: "2000 日元 Booth 自选礼品。", restriction: "可转赠，不兑现。" },
    ],
    submissionPeriod: "投稿期 · UTC+8",
    votingPeriod: "投票期 · UTC+8",
    scheduleNote: "状态按照 Asia/Shanghai 时间自动切换。投稿期结束的同一时刻立即进入投票状态，不存在中间阶段。",
    submissionLink: "前往群相册",
    votingLink: "前往群内投票",
    rulesLink: "查看完整规则",
    championLabel: "CHAMPION",
    photographyBy: "摄影",
  },
  en: {
    currentSection: {
      number: "01 / Current",
      title: "A practice in",
      accent: "seeing differently",
      note: "The prompt and dates are replaceable content. External actions only appear when a valid album or voting link is configured.",
    },
    rulesSection: {
      number: "02 / Rules",
      title: "Simple rules,",
      accent: "clear expression",
      note: "",
    },
    archiveSection: {
      number: "03 / Archive",
      title: "Past champions,",
      accent: "one frame per round",
      note: "Each entry shows the prompt, winning photograph, and display name. Images are replaceable placeholders.",
    },
    status: { upcoming: "Upcoming", submitting: "Submissions open", voting: "Voting open", ended: "Ended" },
    callout: "Each member may submit one photograph. No technical requirements—new photographers are warmly encouraged to join.",
    rules: [
      { label: "Submission", body: "Create in response to the current prompt, upload to the designated community album, and note the image ratio." },
      { label: "Voting", body: "Community voting opens the moment submissions close. The website does not accept work or record votes." },
      { label: "Winner", body: "The photograph with the most votes wins. Administrators cast the deciding vote in a tie." },
      { label: "Prize", body: "A Booth item of the winner's choice up to ¥2,000.", restriction: "Transferable, not redeemable for cash." },
    ],
    submissionPeriod: "Submissions · UTC+8",
    votingPeriod: "Voting · UTC+8",
    scheduleNote: "Status follows Asia/Shanghai time. Voting begins at the exact moment submissions close; there is no intermediate phase.",
    submissionLink: "Open community album",
    votingLink: "Open community vote",
    rulesLink: "Read the full rules",
    championLabel: "CHAMPION",
    photographyBy: "Photography",
  },
};

export function getContestStatus(
  contest: ContestRound,
  now: Date,
): ContestStatus {
  if (contest.statusOverride) {
    return contest.statusOverride;
  }

  const timestamp = now.getTime();
  if (timestamp < new Date(contest.submissionStart).getTime()) return "upcoming";
  if (timestamp < new Date(contest.voteStart).getTime()) return "submitting";
  if (timestamp < new Date(contest.voteEnd).getTime()) return "voting";
  return "ended";
}
