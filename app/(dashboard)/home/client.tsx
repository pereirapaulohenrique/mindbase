'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Inbox,
  ArrowRightLeft,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils/dates';
import type { Item, Profile } from '@/types/database';

interface HomePageClientProps {
  profile: Profile | null;
  stats: {
    inboxCount: number;
    processingCount: number;
    todayCount: number;
    completedTodayCount: number;
    totalItems: number;
    totalCompleted: number;
    spacesCount: number;
    projectsCount: number;
  };
  todayItems: Item[];
  recentItems: Item[];
}

export function HomePageClient({
  profile,
  stats,
  todayItems,
  recentItems,
}: HomePageClientProps) {
  const greeting = getGreeting();
  const userName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Page header - Bigger, more presence */}
      <div className="border-b border-border/50 px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {greeting}, {userName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Here's what's on your mind today
          </p>
        </motion.div>
      </div>

      <div className="flex-1 p-8">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Three-Layer Flow - The signature visual */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            <Link href="/capture" className="group">
              <div className="relative overflow-hidden rounded-xl border border-blue-500/15 bg-blue-500/[0.03] p-6 transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <Inbox className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-400/70">Capture</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">{stats.inboxCount}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">items in inbox</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-blue-400/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>Open inbox</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
            <Link href="/process" className="group">
              <div className="relative overflow-hidden rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-6 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                    <ArrowRightLeft className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-400/70">Process</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">{stats.processingCount}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">items to organize</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-amber-400/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>Start processing</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
            <Link href="/commit" className="group">
              <div className="relative overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6 transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <CalendarCheck className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400/70">Commit</p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">{stats.todayCount}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">today's commitments</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>View schedule</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Completed Today Badge */}
          {stats.completedTodayCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15 px-5 py-3"
            >
              <Flame className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                {stats.completedTodayCount} completed today
              </span>
            </motion.div>
          )}

          {/* Main Content - Two column, focused */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Today's Commitments - Primary focus */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="rounded-xl border border-border/50 bg-card"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="h-4 w-4 text-emerald-400" />
                  <h2 className="text-sm font-semibold">Today's Commitments</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-7 text-xs" asChild>
                  <Link href="/commit">
                    View all
                    <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="p-5">
                {todayItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50">
                      <CalendarCheck className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      No commitments for today
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 h-8 text-xs" asChild>
                      <Link href="/process">
                        Schedule something
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {todayItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg border border-border/30 bg-background/50 p-3.5 transition-colors hover:border-border/60"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/8">
                          <Clock className="h-3.5 w-3.5 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          {item.scheduled_at && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {new Date(item.scheduled_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            {/* Recent Captures */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              className="rounded-xl border border-border/50 bg-card"
            >
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <Inbox className="h-4 w-4 text-blue-400" />
                  <h2 className="text-sm font-semibold">Recent Activity</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-7 text-xs" asChild>
                  <Link href="/capture">
                    View inbox
                    <ChevronRight className="ml-0.5 h-3 w-3" />
                  </Link>
                </Button>
              </div>
              <div className="p-5">
                {recentItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50">
                      <Inbox className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      No recent items
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 h-8 text-xs" asChild>
                      <Link href="/capture">
                        Capture something
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {recentItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg border border-border/30 bg-background/50 p-3.5 transition-colors hover:border-border/60"
                      >
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          item.is_completed
                            ? "bg-emerald-500/8"
                            : item.layer === 'capture'
                              ? "bg-blue-500/8"
                              : item.layer === 'process'
                                ? "bg-amber-500/8"
                                : "bg-emerald-500/8"
                        )}>
                          {item.is_completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : item.layer === 'capture' ? (
                            <Inbox className="h-3.5 w-3.5 text-blue-400" />
                          ) : item.layer === 'process' ? (
                            <ArrowRightLeft className="h-3.5 w-3.5 text-amber-400" />
                          ) : (
                            <CalendarCheck className="h-3.5 w-3.5 text-emerald-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            item.is_completed && "completed-text"
                          )}>
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatRelativeTime(item.created_at)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
