import { Border1 } from "@/components/border";
import { CourseSection } from "@/components/home/CourseSection";
import { MockTestSection } from "@/components/home/MockTestSection";
import { PracticalQuizSection } from "@/components/home/PracticalQuizSection";
import QuizSidebar, { SidebarNavKey } from "@/components/home/sidebar";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Brain, FileText, Target, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

/* ---------- Types ---------- */
export type Lesson = {
  id: number;
  title: string;
  duration: string;
  questions: number;
  completed: boolean;
  unlocked: boolean;
  score: number | null;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  students: number;
  rating: number;
  lessons_list: Lesson[];
  color?: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
};

/* ---------- Sample data ---------- */
const coursesData: Course[] = [
  {
    id: "c1",
    title: "Road Signs & Signals",
    description: "Learn every road sign, signal, and marking you'll meet.",
    image: "🚦",
    lessons: 12,
    duration: "2h 30m",
    level: "Beginner",
    progress: 45,
    students: 1240,
    rating: 4.8,
    color: "blue",
    lessons_list: [
      {
        id: 1,
        title: "Introduction to Road Signs",
        duration: "10 min",
        questions: 8,
        completed: true,
        unlocked: true,
        score: 7,
      },
      {
        id: 2,
        title: "Warning Signs",
        duration: "12 min",
        questions: 10,
        completed: true,
        unlocked: true,
        score: 9,
      },
      {
        id: 3,
        title: "Regulatory Signs",
        duration: "15 min",
        questions: 12,
        completed: false,
        unlocked: true,
        score: null,
      },
      {
        id: 4,
        title: "Informational Signs",
        duration: "10 min",
        questions: 8,
        completed: false,
        unlocked: false,
        score: null,
      },
      {
        id: 5,
        title: "Road Markings",
        duration: "14 min",
        questions: 10,
        completed: false,
        unlocked: false,
        score: null,
      },
    ],
  },
  {
    id: "c2",
    title: "Traffic Rules & Regulations",
    description: "Master the rules of the road and right-of-way.",
    image: "📋",
    lessons: 18,
    duration: "3h 15m",
    level: "Beginner",
    progress: 20,
    students: 980,
    rating: 4.6,
    color: "green",
    lessons_list: [
      {
        id: 1,
        title: "Right-of-Way Basics",
        duration: "12 min",
        questions: 10,
        completed: true,
        unlocked: true,
        score: 8,
      },
      {
        id: 2,
        title: "Intersections",
        duration: "15 min",
        questions: 12,
        completed: false,
        unlocked: true,
        score: null,
      },
      {
        id: 3,
        title: "Roundabouts",
        duration: "10 min",
        questions: 8,
        completed: false,
        unlocked: false,
        score: null,
      },
      {
        id: 4,
        title: "Pedestrian Rules",
        duration: "11 min",
        questions: 9,
        completed: false,
        unlocked: false,
        score: null,
      },
    ],
  },
  {
    id: "c3",
    title: "Safe Driving Practices",
    description: "Defensive driving, hazard awareness, and safety.",
    image: "🛡️",
    lessons: 10,
    duration: "1h 50m",
    level: "Intermediate",
    progress: 0,
    students: 720,
    rating: 4.9,
    color: "purple",
    lessons_list: [
      {
        id: 1,
        title: "Defensive Driving Intro",
        duration: "10 min",
        questions: 8,
        completed: false,
        unlocked: true,
        score: null,
      },
      {
        id: 2,
        title: "Hazard Perception",
        duration: "14 min",
        questions: 12,
        completed: false,
        unlocked: false,
        score: null,
      },
      {
        id: 3,
        title: "Night Driving",
        duration: "12 min",
        questions: 10,
        completed: false,
        unlocked: false,
        score: null,
      },
    ],
  },
  {
    id: "c4",
    title: "Vehicle Controls & Handling",
    description: "Understand your vehicle and how to control it.",
    image: "🚗",
    lessons: 8,
    duration: "1h 20m",
    level: "Beginner",
    progress: 0,
    students: 560,
    rating: 4.5,
    color: "orange",
    lessons_list: [
      {
        id: 1,
        title: "Dashboard & Controls",
        duration: "8 min",
        questions: 6,
        completed: false,
        unlocked: true,
        score: null,
      },
      {
        id: 2,
        title: "Starting & Stopping",
        duration: "10 min",
        questions: 8,
        completed: false,
        unlocked: false,
        score: null,
      },
      {
        id: 3,
        title: "Steering Techniques",
        duration: "12 min",
        questions: 8,
        completed: false,
        unlocked: false,
        score: null,
      },
    ],
  },
];

const practicalQuizzes: Quiz[] = [
  {
    id: "pq1",
    title: "Road Signs Practice",
    description: "Test your knowledge of common road signs.",
    questions: 20,
    duration: "15 min",
    difficulty: "Easy",
    category: "Signs",
  },
  {
    id: "pq2",
    title: "Right-of-Way Scenarios",
    description: "Who goes first? Practice intersection rules.",
    questions: 15,
    duration: "12 min",
    difficulty: "Medium",
    category: "Rules",
  },
  {
    id: "pq3",
    title: "Hazard Perception",
    description: "Spot hazards before they become problems.",
    questions: 25,
    duration: "20 min",
    difficulty: "Hard",
    category: "Safety",
  },
];

const actualQuizzes: Quiz[] = [
  {
    id: "mt1",
    title: "Full Mock Test #1",
    description: "50 questions under real exam conditions.",
    questions: 50,
    duration: "45 min",
    difficulty: "Medium",
    category: "Full Test",
  },
  {
    id: "mt2",
    title: "Full Mock Test #2",
    description: "A second full-length practice exam.",
    questions: 50,
    duration: "45 min",
    difficulty: "Hard",
    category: "Full Test",
  },
  {
    id: "mt3",
    title: "Quick Mock Test",
    description: "A shorter 20-question mock for warm-up.",
    questions: 20,
    duration: "18 min",
    difficulty: "Easy",
    category: "Quick Test",
  },
];

/* Map sidebar keys → tab values */
const KEY_TO_TAB: Record<string, "courses" | "practical" | "actual"> = {
  home: "courses",
  courses: "courses",
  quiz: "practical",
  test: "actual",
};

export function Home() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<Course>(coursesData[0]);
  const [nav, setNav] = useState<SidebarNavKey>("home");
  const [tab, setTab] = useState<"courses" | "practical" | "actual">("courses");

  const handleNavigate = (key: SidebarNavKey) => {
    setNav(key);
    const mapped = KEY_TO_TAB[key];
    if (mapped) setTab(mapped);
    // for "favorites" / "ai-settings" you can route to dedicated pages:
    // if (key === "favorites") navigate("/favorites");
    // if (key === "ai-settings") navigate("/settings/ai");
  };

  const handleLogout = () => navigate("/");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Sidebar */}
      <QuizSidebar
        active={nav}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <main className="relative flex-1 min-w-0 overflow-y-auto">
        {/* Top utility bar */}
        <div className="sticky top-0 z-40 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-slate-800 dark:text-white truncate">
                Welcome back, Nova 👋
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Practice driving theory, take quizzes, and prepare for your
                test.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all">
                <AvatarImage src="/src/assets/avatar.png" alt="User" />
                <AvatarFallback className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                  NP
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              }
              tint="bg-blue-100 dark:bg-blue-900/50"
              value="12"
              label="Courses Available"
            />
            <StatCard
              icon={
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              }
              tint="bg-green-100 dark:bg-green-900/50"
              value="150+"
              label="Practice Questions"
            />
            <StatCard
              icon={
                <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              }
              tint="bg-yellow-100 dark:bg-yellow-900/50"
              value="5,280"
              label="Students Practicing"
            />
            <StatCard
              icon={
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              }
              tint="bg-purple-100 dark:bg-purple-900/50"
              value="68%"
              label="Average Pass Rate"
            />
          </div>

          {/* Main Tabs — controlled by sidebar nav */}
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as typeof tab)}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md bg-white/80 dark:bg-slate-900/80">
              <TabsTrigger
                value="courses"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <BookOpen className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger
                value="practical"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Brain className="h-4 w-4" />
                Practice Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="actual"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Target className="h-4 w-4" />
                Mock Tests
              </TabsTrigger>
            </TabsList>

            {/* Content blocks wrapped in border decor */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-0">
                <Border1 />
              </div>

              <TabsContent value="courses" className="relative z-10">
                <CourseSection
                  courses={coursesData}
                  selectedCourse={selectedCourse}
                  onSelectCourse={setSelectedCourse}
                />
              </TabsContent>

              <TabsContent value="practical" className="relative z-10">
                <PracticalQuizSection quizzes={practicalQuizzes} />
              </TabsContent>

              <TabsContent value="actual" className="relative z-10">
                <MockTestSection quizzes={actualQuizzes} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

/* Small helper so stat cards stay DRY */
function StatCard({
  icon,
  tint,
  value,
  label,
}: {
  icon: React.ReactNode;
  tint: string;
  value: string;
  label: string;
}) {
  return (
    <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-900/80">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`rounded-full p-3 ${tint}`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {value}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
