export interface Quiz {
  id: string,
  title: string,
  questions: Question[],
  timer: number,
  score: number,
}

export interface Question {
  id: string,
  text: string,
  type: 'text' | 'mupltiple',
  answers: Answer[],
  correctAnswerId: string,
  points: number,
}

export interface Answer {
  id: string,
  text: string,
}

export const getQuizzes = (): Promise<Quiz[]> => {
  return new Promise(resolve => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      try {
        const quizzes = JSON.parse(storedQuizzes) as Quiz[];
        resolve(quizzes);
      } catch (error) {
        console.error('Error parsing quizzes from localStorage:', error);
        resolve([]);
      }
    } else {
      resolve([]);
    }
  });
}

export const getQuiz = (id: string | undefined): Promise<Quiz | null> => {
  return new Promise(resolve => {
    if (!id) {
      resolve(null);
      return;
    }

    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]') as Quiz[];
    const quiz = quizzes.find(quiz => quiz.id === id) || null;
    setTimeout(() => {
      resolve(quiz)
    }, 1000);
  })
};

export const saveQuiz = (quiz: Quiz): Promise<void> => {
  return new Promise(resolve => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const existingIndex = quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (existingIndex !== -1) {
      quizzes[existingIndex] = quiz;
    } else {
      quizzes.push(quiz);
    }
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    setTimeout(() => resolve(), 500);
  });
}

export const deleteQuiz = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const updatedQuizzes = quizzes.filter((quiz: Quiz) => quiz.id !== id);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    setTimeout(() => resolve(), 500);
  });
};
