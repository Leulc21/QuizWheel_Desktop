import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Users } from "lucide-react";

interface MockTestSectionProps {
  quizzes: any[];
}

export function MockTestSection({ quizzes }: MockTestSectionProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
        );
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-500"
          >
            Upcoming
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {quizzes.map((quiz) => {
        const Icon = quiz.icon;
        return (
          <Card
            key={quiz.id}
            className="hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border-0 shadow-sm bg-white/80 dark:bg-slate-900/80"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${quiz.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-800 dark:text-white">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                      {quiz.description}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(quiz.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-center">
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    {quiz.questions}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Questions
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-center">
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    {quiz.time}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Duration
                  </p>
                </div>
                {quiz.submissions > 0 && (
                  <>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-center">
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">
                        {quiz.submissions}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Submissions
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3 text-center">
                      <p className="text-2xl font-bold text-green-500">
                        {quiz.passRate}%
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Pass Rate
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" /> Difficulty:{" "}
                  {quiz.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {quiz.submissions} attempts
                </span>
              </div>
              <Button
                className={`w-full ${quiz.status === "upcoming" ? "opacity-50 bg-slate-400" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                disabled={quiz.status === "upcoming"}
              >
                {quiz.status === "upcoming" ? "Coming Soon" : "Start Mock Test"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
