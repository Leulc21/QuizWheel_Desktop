export interface Lesson {
  id: number;
  title: string;
  completed: boolean;
  unlocked: boolean;
  duration: string;
  questions: number;
  score: number | null;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  lessons: number;
  duration: string;
  level: string;
  image: string;
  color: string;
  students: number;
  rating: number;
  lessons_list: Lesson[];
}

export interface PracticalQuiz {
  id: number;
  title: string;
  description: string;
  questions: number;
  time: string;
  difficulty: string;
  status: string;
  icon: any;
  color: string;
  attempts: number;
  passRate: number;
}

export interface ActualQuiz {
  id: number;
  title: string;
  description: string;
  questions: number;
  time: string;
  difficulty: string;
  status: string;
  submissions: number;
  passRate: number;
  icon: any;
  color: string;
}
