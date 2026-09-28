import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PracticalQuizSectionProps {
  quizzes: any[];
}

export function PracticalQuizSection({ quizzes }: PracticalQuizSectionProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>
        );
      case "locked":
        return <Badge variant="secondary">Locked</Badge>;
      default:
        return null;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      Beginner: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      Intermediate:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      Advanced: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      Hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      Medium:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      Easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => {
        const Icon = quiz.icon;
        return (
          <Card
            key={quiz.id}
            className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-t-4 ${quiz.color} border-0 shadow-sm bg-white/80 dark:bg-slate-900/80`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/50 p-2">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                {getStatusBadge(quiz.status)}
              </div>
              <CardTitle className="mt-2 text-xl text-slate-800 dark:text-white">
                {quiz.title}
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {quiz.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Questions
                  </span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {quiz.questions}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Time
                  </span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {quiz.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Difficulty
                  </span>
                  <Badge className={getLevelBadge(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Attempts
                  </span>
                  <span className="font-medium text-slate-800 dark:text-white">
                    {quiz.attempts}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Pass Rate
                  </span>
                  <span className="font-medium text-green-500">
                    {quiz.passRate}%
                  </span>
                </div>
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                  Start Practice
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
