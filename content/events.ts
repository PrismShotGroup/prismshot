import type { Locale } from "@/lib/i18n";

import { photoAssets } from "./photo-assets";
import type { LocalizedText, PhotoContent } from "./types";

export type EventKind = "gather" | "partner" | "class";

export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarEvent {
  id: string;
  date: string;
  kind: EventKind;
  typeLabel: LocalizedText;
  title: LocalizedText;
  time: string;
  note: LocalizedText;
}

export interface ActivityContent {
  id: string;
  name: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  meta: LocalizedText[];
  photos: PhotoContent[];
}

export const configuredEventMonths: readonly CalendarMonth[] = [
  { year: 2026, month: 8 },
  { year: 2026, month: 9 },
  { year: 2026, month: 10 },
];

export const calendarEvents: readonly CalendarEvent[] = [
  {
    id: "class-2026-08-09",
    date: "2026-08-09",
    kind: "class",
    typeLabel: { zh: "摄影教学", en: "Workshop" },
    title: { zh: "教练，我要学摄影", en: "Coach, Teach Me Photography" },
    time: "20:00",
    note: {
      zh: "摄影插件基础与实拍练习。",
      en: "Camera-tool basics followed by a practical shoot.",
    },
  },
  {
    id: "partner-2026-08-16",
    date: "2026-08-16",
    kind: "partner",
    typeLabel: { zh: "盲盒挑战", en: "Mystery challenge" },
    title: { zh: "同镜搭子", en: "Frame Partners" },
    time: "20:30",
    note: {
      zh: "2–3 人组队，现场抽取创作任务。",
      en: "Teams of two or three draw a creative prompt on site.",
    },
  },
  {
    id: "gather-2026-08-30",
    date: "2026-08-30",
    kind: "gather",
    typeLabel: { zh: "集体合拍", en: "Group shoot" },
    title: { zh: "相聚一镜", en: "Together in One Frame" },
    time: "20:30",
    note: { zh: "本期主题：城市夜游。", en: "Prompt: City after dark." },
  },
  {
    id: "class-2026-09-05",
    date: "2026-09-05",
    kind: "class",
    typeLabel: { zh: "摄影教学", en: "Workshop" },
    title: { zh: "教练，我要学摄影", en: "Coach, Teach Me Photography" },
    time: "20:00",
    note: {
      zh: "本期主题：人像光线入门。",
      en: "An introduction to lighting virtual portraits.",
    },
  },
  {
    id: "partner-2026-09-12",
    date: "2026-09-12",
    kind: "partner",
    typeLabel: { zh: "盲盒挑战", en: "Mystery challenge" },
    title: { zh: "同镜搭子", en: "Frame Partners" },
    time: "20:30",
    note: {
      zh: "基础卡组与进阶挑战同步开放。",
      en: "Core prompt decks and advanced challenges are both open.",
    },
  },
  {
    id: "gather-2026-09-26",
    date: "2026-09-26",
    kind: "gather",
    typeLabel: { zh: "集体合拍", en: "Group shoot" },
    title: { zh: "相聚一镜", en: "Together in One Frame" },
    time: "20:30",
    note: {
      zh: "主题将在活动前一周公开征集。",
      en: "The prompt will be chosen by the community one week ahead.",
    },
  },
  {
    id: "partner-extra-2026-09-26",
    date: "2026-09-26",
    kind: "partner",
    typeLabel: { zh: "盲盒挑战", en: "Mystery challenge" },
    title: { zh: "同镜搭子 · 加映场", en: "Frame Partners · Late Session" },
    time: "22:00",
    note: {
      zh: "当日第二场，小队名额有限。",
      en: "A second session with limited team capacity.",
    },
  },
  {
    id: "gather-2026-10-10",
    date: "2026-10-10",
    kind: "gather",
    typeLabel: { zh: "集体合拍", en: "Group shoot" },
    title: { zh: "相聚一镜", en: "Together in One Frame" },
    time: "20:30",
    note: { zh: "秋季主题合拍活动。", en: "An autumn-themed group shoot." },
  },
  {
    id: "class-2026-10-24",
    date: "2026-10-24",
    kind: "class",
    typeLabel: { zh: "摄影教学", en: "Workshop" },
    title: { zh: "教练，我要学摄影", en: "Coach, Teach Me Photography" },
    time: "20:00",
    note: {
      zh: "构图诊疗室与作品复盘。",
      en: "Composition clinic and a review of recent work.",
    },
  },
];

export const activities: readonly ActivityContent[] = [
  {
    id: "together-one-frame",
    name: { zh: "相聚一镜", en: "Together in One Frame" },
    summary: {
      zh: "围绕主题展开集体合拍，用镜头定格每一次美好同框。",
      en: "A themed group shoot that turns every shared frame into a memory.",
    },
    description: {
      zh: "活动提前一周开放合照主题征集与讨论，活动期间以摄影创作为核心，开展集体合拍活动，用镜头定格社团温暖瞬间，记录每一次美好同框。",
      en: "One week before each event, the community opens submissions and discussion for the group-photo theme. The event centres on photography and a collaborative group shoot, capturing the club's warm moments and every memorable frame we share.",
    },
    meta: [
      { zh: "形式 · 主题合拍 / 集体创作", en: "Format · Themed group creation" },
      { zh: "规模 · 全体成员开放", en: "Access · Open to all members" },
      { zh: "图片为可替换占位素材", en: "Images are replaceable placeholders" },
    ],
    photos: [
      {
        id: "event-gather-01",
        asset: photoAssets.event01,
        title: { zh: "相聚一镜 · 城市夜游", en: "Together in One Frame · City at Night" },
        caption: { zh: "在虚拟城市的霓虹里完成本期集体合照。", en: "Our group portrait set among the neon lights of a virtual city." },
        author: "PrismShot",
        date: "2026-08-30",
      },
      {
        id: "event-gather-02",
        asset: photoAssets.event02,
        title: { zh: "灯光测试", en: "Lighting Test" },
        caption: { zh: "活动开始前的灯光与构图测试。", en: "Lighting and composition tests before the event." },
        author: "Rin",
        date: "2026-08-30",
      },
      {
        id: "event-gather-03",
        asset: photoAssets.event03,
        title: { zh: "同框时刻", en: "The Shared Frame" },
        caption: { zh: "快门落下前的最后一秒。", en: "The final second before the shutter falls." },
        author: "anonymous",
        date: "2026-08-30",
      },
      {
        id: "event-gather-04",
        asset: photoAssets.event04,
        title: { zh: "幕后记录", en: "Behind the Frame" },
        caption: { zh: "一次共同创作，也是一段共同记忆。", en: "A shared creation and a shared memory." },
        author: "Mori",
        date: "2026-08-30",
      },
    ],
  },
  {
    id: "frame-partners",
    name: { zh: "同镜搭子", en: "Frame Partners" },
    summary: {
      zh: "2–3 人自由组队，通过盲盒卡组完成基础与进阶摄影挑战。",
      en: "Teams of two or three use mystery card decks to complete core and advanced photography challenges.",
    },
    description: {
      zh: "参与者可自由组队，以 2–3 人为一组参与盲盒挑战。基础卡组包含任务状态卡、镜头卡与氛围卡三类。完成基础挑战后，即可解锁进阶玩法。完成对应挑战可兑换社团定制奖品，三项进阶挑战全部完成后，还可解锁专属神秘定制奖品。",
      en: "Participants form teams of two or three for a mystery-card challenge. The core deck contains task-status, lens, and atmosphere cards; completing the core challenge unlocks the advanced rounds. Each completed challenge can be redeemed for a club-made prize, while completing all three advanced challenges unlocks an exclusive mystery prize.",
    },
    meta: [
      { zh: "基础卡组 · 任务状态卡 / 镜头卡 / 氛围卡", en: "Core deck · Task-status / lens / atmosphere cards" },
      { zh: "终极挑战 · 解锁四类盲盒卡组，完成创作挑战", en: "Ultimate challenge · Unlock four card categories and complete a creative challenge" },
      { zh: "趣味复刻 · 完成 Meme 图片复刻创作", en: "Meme recreation · Recreate a meme image" },
      { zh: "互拍创作 · 互相拍摄专属头像与封面作品", en: "Portrait swap · Create personalised profile and cover images for one another" },
      { zh: "挑战奖励 · 完成对应挑战兑换定制奖品；三项进阶全部完成解锁神秘奖品", en: "Challenge rewards · Redeem custom prizes; complete all three advanced challenges to unlock a mystery prize" },
    ],
    photos: [
      {
        id: "event-partner-01",
        asset: photoAssets.event05,
        title: { zh: "盲盒任务：氛围卡", en: "Mystery Prompt: Atmosphere" },
        caption: { zh: "小队抽到的关键词是“冷色、距离与等待”。", en: "The team drew: cool tones, distance, and waiting." },
        author: "Kite",
        date: "2026-08-16",
      },
      {
        id: "event-partner-02",
        asset: photoAssets.event06,
        title: { zh: "互拍创作", en: "Portrait Swap" },
        caption: { zh: "两位搭档交换摄影师与模特身份。", en: "Two partners trade the roles of photographer and subject." },
        author: "Aki",
        date: "2026-08-16",
      },
      {
        id: "event-partner-03",
        asset: photoAssets.event07,
        title: { zh: "镜头卡：低机位", en: "Lens Prompt: Low Angle" },
        caption: { zh: "从限制条件里找到新的观看方式。", en: "Finding a new point of view inside a constraint." },
        author: "Yu",
        date: "2026-08-16",
      },
      {
        id: "event-partner-04",
        asset: photoAssets.event08,
        title: { zh: "挑战完成", en: "Challenge Complete" },
        caption: { zh: "完成基础卡组后的团队记录。", en: "A team portrait after completing the core deck." },
        author: "PrismShot",
        date: "2026-08-16",
      },
    ],
  },
  {
    id: "photo-coaching",
    name: { zh: "教练，我要学摄影", en: "Coach, Teach Me Photography" },
    summary: {
      zh: "从摄影插件到现场实操，零基础也能轻松开始虚拟摄影。",
      en: "From camera tools to field practice, a friendly start for new photographers.",
    },
    description: {
      zh: "VRChat 专项摄影教学，聚焦插件功能讲解与实操。活动前半段是茶话会环节，将介绍插件的基础功能与使用方法，活动后半段开启实战教学，带领大家上手练习插件拍摄技巧。",
      en: "This VRChat photography workshop focuses on camera plugin features and hands-on practice. The first half is a relaxed discussion introducing the plugin's core features and how to use them; the second moves into practical instruction, guiding everyone through its photography tools and techniques.",
    },
    meta: [
      { zh: "形式 · 茶话会 + 实战教学", en: "Format · Talk and guided practice" },
      { zh: "难度 · 零基础友好", en: "Level · Beginner-friendly" },
      { zh: "内容 · 插件 / 构图 / 光线", en: "Topics · Tools / composition / light" },
    ],
    photos: [
      {
        id: "event-class-01",
        asset: photoAssets.event09,
        title: { zh: "摄影插件课堂", en: "Camera Tool Workshop" },
        caption: { zh: "从界面开始，理解焦距、景深与曝光。", en: "Starting with the interface to understand focal length, depth, and exposure." },
        author: "PrismShot Coaches",
        date: "2026-08-09",
      },
      {
        id: "event-class-02",
        asset: photoAssets.event10,
        title: { zh: "构图练习", en: "Composition Practice" },
        caption: { zh: "用同一个场景完成三种不同叙事。", en: "Three different stories made from one scene." },
        author: "PrismShot Coaches",
        date: "2026-08-09",
      },
      {
        id: "event-class-03",
        asset: photoAssets.event11,
        title: { zh: "光线观察", en: "Reading Light" },
        caption: { zh: "让光成为画面真正的主角。", en: "Letting light become the subject of the frame." },
        author: "Nanami",
        date: "2026-08-09",
      },
      {
        id: "event-class-04",
        asset: photoAssets.event12,
        title: { zh: "课后实拍", en: "Field Practice" },
        caption: { zh: "把刚学到的方法带进真实场景。", en: "Taking new techniques into a live setting." },
        author: "Workshop Participant",
        date: "2026-08-09",
      },
    ],
  },
];

export const eventPageCopy: Record<Locale, {
  calendarSection: { number: string; title: string; accent: string; note: string };
  programSection: { number: string; title: string; accent: string; note: string };
  selectedDateLabel: string;
  emptyDate: string;
  monthPrevious: string;
  monthNext: string;
  weekdays: readonly string[];
  legends: Record<EventKind, string>;
  photoGroupLabel: string;
}> = {
  zh: {
    calendarSection: {
      number: "01 / Calendar",
      title: "本月，和我们在",
      accent: "镜头里见",
      note: "选择有标记的日期查看活动安排。",
    },
    programSection: {
      number: "02 / Program",
      title: "三种相遇，",
      accent: "三种创作方式",
      note: "选择活动名称查看详情。点击照片进入大图预览。",
    },
    selectedDateLabel: "Selected date · UTC+8",
    emptyDate: "这一天暂时没有已配置活动。",
    monthPrevious: "上一个有活动的月份",
    monthNext: "下一个有活动的月份",
    weekdays: ["一", "二", "三", "四", "五", "六", "日"],
    legends: { gather: "相聚一镜", partner: "同镜搭子", class: "摄影教学" },
    photoGroupLabel: "活动照片",
  },
  en: {
    calendarSection: {
      number: "01 / Calendar",
      title: "Meet us this month,",
      accent: "behind the lens",
      note: "Choose a marked date to view the event schedule.",
    },
    programSection: {
      number: "02 / Program",
      title: "Three ways to meet,",
      accent: "three ways to create",
      note: "Select an activity name to view its details. Select a photograph to open the viewer.",
    },
    selectedDateLabel: "Selected date · UTC+8",
    emptyDate: "No event is currently configured for this date.",
    monthPrevious: "Previous month with events",
    monthNext: "Next month with events",
    weekdays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    legends: { gather: "Group shoot", partner: "Frame Partners", class: "Workshop" },
    photoGroupLabel: "Event photographs",
  },
};
