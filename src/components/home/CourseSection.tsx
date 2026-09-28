import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  CheckCircle,
  CircleDot,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  Play,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

interface CourseSectionProps {
  courses: any[];
  selectedCourse: any;
  onSelectCourse: (course: any) => void;
}

export function CourseSection({
  courses,
  selectedCourse,
  onSelectCourse,
}: CourseSectionProps) {
  const [hoveredLesson, setHoveredLesson] = useState<number | null>(null);

  const getLevelBadge = (level: string) => {
    const colors = {
      Beginner: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      Intermediate:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      Advanced: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };
    return colors[level as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getLessonStatusIcon = (lesson: any) => {
    if (lesson.completed)
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (lesson.unlocked) return <CircleDot className="h-5 w-5 text-blue-500" />;
    return <Lock className="h-5 w-5 text-gray-400" />;
  };

  const getLessonStatusColor = (lesson: any) => {
    if (lesson.completed)
      return "border-green-500 bg-green-50 dark:bg-green-950/20";
    if (lesson.unlocked)
      return "border-blue-500 bg-blue-50 dark:bg-blue-950/20";
    return "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20 opacity-60";
  };

  const getLessonBadge = (lesson: any) => {
    if (lesson.completed) {
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          Completed
        </Badge>
      );
    }
    if (lesson.unlocked) {
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          Available
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-gray-400">
        Locked
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Course List */}
      <div className="lg:col-span-2 space-y-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-0 shadow-sm bg-white/80 dark:bg-slate-900/80 ${
              selectedCourse.id === course.id
                ? "ring-2 ring-blue-500 shadow-md"
                : ""
            }`}
            onClick={() => onSelectCourse(course)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{course.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                        {course.description}
                      </p>
                    </div>
                    <Badge className={getLevelBadge(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Details */}
      <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-900/80">
        <CardHeader className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-800 dark:text-white">
                Course Content
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                {selectedCourse.title}
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {selectedCourse.lessons} Lessons
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ScrollArea className="h-[450px] pr-4">
            <div className="space-y-3">
              {selectedCourse.lessons_list.map((lesson: any, index: number) => (
                <div
                  key={lesson.id}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${getLessonStatusColor(lesson)} ${
                    hoveredLesson === lesson.id
                      ? "transform scale-[1.02] shadow-md"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredLesson(lesson.id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        {getLessonStatusIcon(lesson)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                            Lesson {index + 1}
                          </span>
                          {getLessonBadge(lesson)}
                        </div>
                        <p
                          className={`font-medium text-slate-800 dark:text-white ${!lesson.unlocked ? "opacity-50" : ""}`}
                        >
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {lesson.questions} questions
                          </span>
                          {lesson.completed && lesson.score !== null && (
                            <span className="flex items-center gap-1 text-green-500">
                              <CheckCircle className="h-3 w-3" />
                              {lesson.score}/{lesson.questions}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {lesson.unlocked && !lesson.completed && (
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0"
                      >
                        Start <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                    {lesson.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-950 flex-shrink-0"
                      >
                        Review
                      </Button>
                    )}
                    {!lesson.unlocked && (
                      <div className="flex-shrink-0">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                  {!lesson.unlocked && index > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Complete previous lesson to
                        unlock
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
            <Play className="h-4 w-4 mr-2" /> Continue Learning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
