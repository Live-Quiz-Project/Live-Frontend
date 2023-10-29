declare global {
  type Question = {
    id: string;
    quizId: string;
    isParent: boolean;
    parentId: string;
    type: string;
    order: number;
    content: string;
    note: string;
    media: string;
    timeLimit: number;
    haveTimeFactor: boolean;
    timeFactor: number;
    fontSize: number;
    selectUpTo: number;
    options: Option[];
    answer: Answer;
  };

  type Option = {
    id: string;
    qId: string;
    order: number;
    content: string;
    mark: number;
    color: string;
    isCorrect: boolean;
    qContent: string;
  };

  type Answer = {
    content: string;
    color: string;
    qContent: string;
  };
}

export {};
