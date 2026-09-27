"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home as HomeIcon,
  BookOpen,
  Brain,
  Target,
  Star,
  Sparkles,
  LogOut,
  PanelLeft,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.165,0.85,0.45,1)";
const DURATION = 300;
const EXPANDED = "18rem";
const COLLAPSED = "3.3rem";

const favorites = [
  "Right-of-way at roundabouts",
  "Parking on hills",
  "Road signs — priority rules",
];

const recentCourses = [
  { title: "Road Rules & Regulations", progress: 75 },
  { title: "Defensive Driving", progress: 45 },
  { title: "Road Signs & Signals", progress: 20 },
];

export type SidebarNavKey =
  | "home"
  | "courses"
  | "quiz"
  | "test"
  | "favorites"
  | "ai-settings";

type NavItem = {
  key: SidebarNavKey;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
};

const navItems: NavItem[] = [
  { key: "home", label: "Home", icon: <HomeIcon className="size-5" />, shortcut: "⌘H" },
  { key: "courses", label: "Courses", icon: <BookOpen className="size-5" />, shortcut: "⌘C" },
  { key: "quiz", label: "Quiz", icon: <Brain className="size-5" />, shortcut: "⌘Q" },
  { key: "test", label: "Test", icon: <Target className="size-5" />, shortcut: "⌘T" },
  { key: "favorites", label: "Favourites", icon: <Star className="size-5" /> },
  { key: "ai-settings", label: "AI Settings", icon: <Sparkles className="size-5" /> },
];

export default function QuizSidebar({
  active = "home",
  onNavigate,
  onLogout,
  user = { name: "Nova Park", plan: "Pro plan", initials: "NP" },
}: {
  active?: SidebarNavKey;
  onNavigate?: (key: SidebarNavKey) => void;
  onLogout?: () => void;
  user?: { name: string; plan: string; initials: string };
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative flex h-full min-h-[640px]">
      <SidebarProvider
        defaultOpen
        className="min-h-0! h-full w-fit"
        style={{ "--sidebar-width": EXPANDED } as React.CSSProperties}
      >
        <div
          className="shrink-0 overflow-hidden"
          style={{
            width: collapsed ? COLLAPSED : EXPANDED,
            transition: `width ${DURATION}ms ${EASE}`,
          }}
        >
          <Sidebar
            collapsible="none"
            className="flex h-full min-h-[640px] w-full! flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border"
          >
            {/* Header */}
            <SidebarHeader className="relative flex-row! w-full items-center gap-0! p-2! pt-2 h-12 shrink-0">
              <div
                className="flex items-center gap-2 pl-2 h-8 overflow-clip"
                style={{
                  transition: `opacity 150ms ${EASE}`,
                  opacity: collapsed ? 0 : 1,
                  pointerEvents: collapsed ? "none" : "auto",
                }}
              >
                <span className="text-xl">🚗</span>
                <span className="text-base font-bold tracking-tight whitespace-nowrap">
                  Quiz Wheel
                </span>
              </div>
              <button
                type="button"
                aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
                onClick={() => setCollapsed((c) => !c)}
                className="absolute right-2 top-2 z-10 grid size-8 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <PanelLeft className="size-[18px]" />
              </button>
            </SidebarHeader>

            {/* Primary navigation */}
            <SidebarMenu className="gap-px! pt-2 px-2">
              {navItems.map((it) => (
                <SidebarMenuItem key={it.key} className="list-none!">
                  <NavRow
                    item={it}
                    active={active === it.key}
                    collapsed={collapsed}
                    onClick={() => onNavigate?.(it.key)}
                  />
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem className="list-none!">
                <button
                  aria-label="More"
                  className="group flex h-9 w-full items-center rounded-lg px-4 text-sm text-muted-foreground transition-colors duration-75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground overflow-hidden"
                >
                  <div className="flex w-full -translate-x-2 items-center gap-3">
                    <span className="grid size-5 shrink-0 place-items-center opacity-60">
                      <ChevronDown className="size-4" />
                    </span>
                    <span
                      className="flex-1 truncate text-left"
                      style={{
                        transition: `opacity 150ms ${EASE}`,
                        opacity: collapsed ? 0 : 1,
                      }}
                    >
                      More
                    </span>
                  </div>
                </button>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* Secondary content (Favourites + Recent) */}
            <SidebarContent
              className="gap-0! pt-2 overflow-x-hidden!"
              style={{
                transition: `opacity 150ms ${EASE}`,
                opacity: collapsed ? 0 : 1,
                pointerEvents: collapsed ? "none" : "auto",
              }}
              aria-hidden={collapsed}
            >
              <div className="px-2 mt-2">
                <Section title="Favourites">
                  {favorites.map((t) => (
                    <ChatRow key={t} title={t} />
                  ))}
                </Section>
                <Section title="Recent Courses">
                  {recentCourses.map((c) => (
                    <ProgressRow key={c.title} title={c.title} progress={c.progress} />
                  ))}
                </Section>
              </div>
            </SidebarContent>

            {/* Footer — user + logout */}
            <SidebarFooter className="p-0! gap-0! border-t border-sidebar-border mt-auto">
              <div className="flex items-center gap-1 p-1">
                <button
                  className="group flex h-14 flex-1 min-w-0 items-center gap-3 px-2 rounded-md transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden"
                  aria-label="User menu"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                    {user.initials}
                  </div>
                  <div
                    className="flex flex-1 flex-col items-start min-w-0"
                    style={{
                      transition: `opacity 150ms ${EASE}`,
                      opacity: collapsed ? 0 : 1,
                    }}
                  >
                    <span className="truncate text-sm font-medium">{user.name}</span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {user.plan}
                    </span>
                  </div>
                </button>
                {!collapsed && (
                  <button
                    onClick={onLogout}
                    aria-label="Log out"
                    title="Log out"
                    className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="size-4" />
                  </button>
                )}
              </div>
            </SidebarFooter>
          </Sidebar>
        </div>
      </SidebarProvider>
    </div>
  );
}

/* ---- Rows ---- */

function NavRow({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex h-9 w-full items-center rounded-lg px-4 text-sm transition-colors duration-75 active:scale-[0.99] overflow-hidden",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      )}
    >
      <div className="flex w-full -translate-x-2 items-center gap-3">
        <span className="grid size-5 shrink-0 place-items-center text-sidebar-foreground">
          {item.icon}
        </span>
        <span
          className="flex-1 truncate text-left"
          style={{
            transition: `opacity 150ms ${EASE}`,
            opacity: collapsed ? 0 : 1,
          }}
        >
          {item.label}
        </span>
        {item.shortcut && !collapsed && (
          <span className="text-[11px] text-muted-foreground opacity-0 transition-opacity duration-75 group-hover:opacity-100">
            {item.shortcut}
          </span>
        )}
      </div>
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="px-2 pb-1 text-[11px] font-medium tracking-wide text-muted-foreground select-none">
        {title}
      </h3>
      <ul className="flex flex-col gap-px">{children}</ul>
    </div>
  );
}

function ChatRow({ title }: { title: string }) {
  return (
    <li>
      <a
        href="#"
        className="group relative flex h-8 items-center rounded-lg px-3 text-[13px] text-sidebar-foreground/80 transition-colors duration-75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      >
        <span className="flex-1 truncate">{title}</span>
      </a>
    </li>
  );
}

function ProgressRow({ title, progress }: { title: string; progress: number }) {
  return (
    <li>
      <a
        href="#"
        className="group flex flex-col gap-1.5 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground/80 transition-colors duration-75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
      >
        <span className="flex items-center justify-between gap-2">
          <span className="flex-1 truncate">{title}</span>
          <span className="text-[10px] text-muted-foreground">{progress}%</span>
        </span>
        <span className="h-1 w-full overflow-hidden rounded-full bg-sidebar-accent">
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </span>
      </a>
    </li>
  );
}