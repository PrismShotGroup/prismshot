import type { Locale } from "@/lib/i18n";

import { photoAssets } from "./photo-assets";
import type { LocalizedText, PhotoAsset } from "./types";

export type ContestStatus = "upcoming" | "submitting" | "voting" | "ended";

export interface ContestRound {
    issue: string;
    theme: LocalizedText;
    subtitle: LocalizedText;
    summary: LocalizedText;
    visual: PhotoAsset;
    submissionStart: string;
    voteStart: string;
    voteEnd: string;
    submissionDisplay: string;
    statusOverride: ContestStatus | null;
    submissionUrl?: string;
    votingUrl?: string;
}

export interface ContestChampion {
    id: string;
    issue: string;
    theme?: LocalizedText;
    author?: string;
    image: PhotoAsset;
}

export const currentContest: ContestRound = {
    issue: "14",
    theme: { zh: "风", en: "Wind" },
    subtitle: { zh: "无形之物", en: "The Formless" },
    summary: {
        zh: "看不见，不代表不存在。风没有轮廓，却能改变光影；没有颜色，却能改变一整个画面。本期主题 「风」，我们邀请你寻找一种属于自己的表达——如果风无法被看见，你会如何把它拍下来？",
        en: "Invisibility does not mean absence. Wind has no outline, yet it can reshape light and shadow; it has no colour, yet it can transform an entire frame. For this round's theme, “Wind,” we invite you to find an expression of your own—if wind cannot be seen, how would you photograph it?",
    },
    visual: photoAssets.issue13,
    submissionStart: "2026-08-29T00:00:00+08:00",
    voteStart: "2026-09-11T00:00:00+08:00",
    voteEnd: "2026-09-16T00:00:00+08:00",
    submissionDisplay: "08.29 — 09.11",
    statusOverride: null,
};

export const contestChampions: readonly ContestChampion[] = [
    {
        id: "issue-13",
        issue: "13",
        theme: { zh: "失控", en: "" },
        author: "0-Nova-0",
        image: photoAssets.issue13,
    },
    {
        id: "issue-12",
        issue: "12",
        theme: { zh: "安全距离", en: "" },
        author: "糸云恋Koishi",
        image: photoAssets.issue12,
    },
    {
        id: "issue-11",
        issue: "11",
        theme: { zh: "未拆封的告白", en: "" },
        author: "SenSundy白",
        image: photoAssets.issue11,
    },
    {
        id: "issue-10",
        issue: "10",
        theme: { zh: "黑暗面", en: "" },
        author: "Null_零",
        image: photoAssets.issue10,
    },
    {
        id: "issue-09",
        issue: "09",
        theme: { zh: "季节", en: "" },
        author: "~KY39~",
        image: photoAssets.issue9,
    },
    {
        id: "issue-08",
        issue: "08",
        theme: { zh: "与孤独共生", en: "" },
        author: "YuTsuKi",
        image: photoAssets.issue8,
    },
    {
        id: "issue-07",
        issue: "07",
        theme: { zh: "生活", en: "" },
        author: "YuTsuKi",
        image: photoAssets.issue7,
    },
    {
        id: "issue-06",
        issue: "06",
        theme: { zh: "重生", en: "" },
        author: "LinxxxMeng",
        image: photoAssets.issue6,
    },
    {
        id: "issue-05",
        issue: "05",
        theme: { zh: "背叛", en: "" },
        author: "LuKiJ",
        image: photoAssets.issue5,
    },
    {
        id: "issue-04",
        issue: "04",
        theme: { zh: "反差感", en: "" },
        author: "远雾lynn",
        image: photoAssets.issue4,
    },
    {
        id: "issue-03",
        issue: "03",
        theme: { zh: "美味", en: "" },
        author: "~KY39~",
        image: photoAssets.issue3,
    },
    {
        id: "issue-02",
        issue: "02",
        theme: { zh: "慵懒", en: "" },
        author: "xzi",
        image: photoAssets.issue2,
    },
];

export const contestPageCopy: Record<
    Locale,
    {
        currentSection: {
            number: string;
            title: string;
            accent: string;
            note: string;
        };
        rulesSection: {
            number: string;
            title: string;
            accent: string;
            note: string;
        };
        archiveSection: {
            number: string;
            title: string;
            accent: string;
            note: string;
        };
        status: Record<ContestStatus, string>;
        callout: string;
        rules: readonly { label: string; body: string; restriction?: string }[];
        submissionPeriod: string;
        submissionLink: string;
        votingLink: string;
        rulesLink: string;
        championLabel: string;
        photographyBy: string;
    }
> = {
    zh: {
        currentSection: {
            number: "01 / Current",
            title: "正在发生的",
            accent: "观看练习",
            note: "",
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
            note: "",
        },
        status: {
            upcoming: "即将开始",
            submitting: "投稿中",
            voting: "投票中",
            ended: "已结束",
        },
        callout: "每位成员可提交 1 张作品，无技术要求，新人也欢迎积极报名！",
        rules: [
            {
                label: "作品要求",
                body: "题材贴合当期主题即可，无过多限制。上传至群内指定相册并标注照片比例。",
            },
            {
                label: "投票方式",
                body: "投稿期持续两周，于周六结束。投稿截止后立即开启群内投票，投票于次周三截止。",
            },
            {
                label: "胜负判定",
                body: "得票数最高者获胜。若票数相同，由管理员进行最终投票。",
            },
            {
                label: "优胜奖品",
                body: "2000 日元 Booth 自选礼品。",
                restriction: "可转赠，不兑现。",
            },
            {
                label: "实体喷绘",
                body: "获奖作品的实体喷绘定制",
                restriction: "由川云集团赞助。",
            },
        ],
        submissionPeriod: "投稿期 · UTC+8",
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
            note: "",
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
            note: "",
        },
        status: {
            upcoming: "Upcoming",
            submitting: "Submissions open",
            voting: "Voting open",
            ended: "Ended",
        },
        callout:
            "Each member may submit one photograph. No technical requirements—new photographers are warmly encouraged to join.",
        rules: [
            {
                label: "Submission",
                body: "Create in response to the current prompt, upload to the designated community album, and note the image ratio.",
            },
            {
                label: "Voting",
                body: "The submission period runs for two weeks and closes on Saturday. Community voting opens immediately after submissions close and ends the following Wednesday.",
            },
            {
                label: "Winner",
                body: "The photograph with the most votes wins. Administrators cast the deciding vote in a tie.",
            },
            {
                label: "Prize",
                body: "A Booth item of the winner's choice up to ¥2,000.",
                restriction: "Transferable, not redeemable for cash.",
            },
            {
                label: "Physical print",
                body: "A custom physical print of the winning photograph.",
                restriction: "Sponsored by Cross Clouds.",
            },
        ],
        submissionPeriod: "Submissions · UTC+8",
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
    if (timestamp < new Date(contest.submissionStart).getTime())
        return "upcoming";
    if (timestamp < new Date(contest.voteStart).getTime()) return "submitting";
    if (timestamp < new Date(contest.voteEnd).getTime()) return "voting";
    return "ended";
}
