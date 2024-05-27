import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Answer, Quiz, getQuiz, saveQuiz } from '../services/quizService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import * as Yup from 'yup';
import QuizFormHeader from '../components/QuizFormHeader';
import QuizFormButton from '../components/QuizFormButton';

export default function QuizForm() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Quiz>({
    id: '',
    title: '',
    questions: [],
    timer: 5,
    score: 0,
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Quiz name is required'),
    questions: Yup.array()
      .min(1, 'At least one question is required')
      .of(
        Yup.object().shape({
          text: Yup.string().required('Question title is required'),
          points: Yup.number().required('Points for question is required').min(1, 'Points must be at least 1'),
          answers: Yup.array()
            .min(2, 'At least two answers are required')
            .of(
              Yup.object().shape({
                text: Yup.string().required('Answer text is required'),
              })
            ),
          correctAnswerId: Yup.string().required('Select correct answer for each question'),
        })
      ),
  });

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      getQuiz(id)
        .then(quiz => {
          if (quiz) {
            setInitialValues(quiz);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleSubmit = async (values: Quiz) => {
    try {
      if (!values.id) {
        values.id = uuidv4();
      }
      await saveQuiz(values);
      navigate('/');
    } catch (e) {
      throw new Error("Error during saving quiz");
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col gap-3 w-2/4">
      <QuizFormHeader isEditing={!!id} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-3">
            <div className="flex justify-between items-center mb-3">
              <div className="relative w-full mr-2">
                <Field type="text" name="title" className="border rounded-md p-3 w-full placeholder-transparent peer hover:border-gray-500" placeholder="Name your quiz" />
                <label htmlFor="title" className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-gray-600">
                  Name your quiz
                </label>
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="relative w-1/2">
                <Field type="number" name="timer" className="border rounded-md p-3 w-full placeholder-transparent peer hover:border-gray-500" placeholder="Set time to quiz" />
                <label htmlFor="timer" className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-gray-600">
                  Enter minutes to pass quiz
                </label>
                <ErrorMessage name="timer" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <FieldArray name="questions">
              {({ push, remove }) => (
                <div className="flex flex-col gap-3">
                  {values.questions.map((question, index) => (
                    <div key={question.id} className="flex flex-col gap-3 p-3 border rounded-md">
                      <div className="flex justify-between">
                        <h3 className="text-xl">
                          Question {index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1 rounded-full hover:bg-gray-500 duration-300"
                        >
                          <img
                            src="/src/assets/icon-close.svg"
                            alt="Delete this question"
                            title="Delete this question"
                          />
                        </button>
                      </div>
                      <div className='relative mt-3'>
                        <Field type="text" name={`questions.${index}.text`} className="border rounded-md p-3 w-full placeholder-transparent peer hover:border-gray-500" placeholder="Question's title" />
                        <label htmlFor={`questions.${index}.text`} className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-gray-600">
                          Question's title
                        </label>
                        <ErrorMessage name={`questions.${index}.text`} component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className='relative mt-3'>
                        <Field type="number" name={`questions.${index}.points`} className="border rounded-md p-3 w-1/5 placeholder-transparent peer hover:border-gray-500" placeholder="Points for question" />
                        <label
                          htmlFor={`questions.${index}.points`}
                          className="absolute left-3 -top-3.5 bg-white px-1 text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:left-3 peer-focus:text-gray-600"
                        >
                          Points for question
                        </label>
                        <ErrorMessage
                          name={`questions.${index}.points`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block mb-1">Variants of answer</label>
                        <FieldArray name={`questions.${index}.answers`}>
                          {({ push, remove }) => (
                            <div className="flex flex-col gap-3">
                              {question.answers.map((_, answerIndex: number) => (
                                <div key={answerIndex} className="relative flex gap-3 items-center">
                                  <Field
                                    type="text"
                                    name={`questions.${index}.answers.${answerIndex}.text`}
                                    className="h-10 border rounded-md p-3 w-full placeholder-transparent peer hover:border-gray-500"
                                    placeholder="Answer"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(answerIndex)}
                                    className="absolute right-0 p-2 duration-300"
                                  >
                                    <img
                                      src="/src/assets/icon-delete.svg"
                                      alt="Delete answer"
                                    />
                                  </button>
                                  <ErrorMessage name={`questions.${index}.answers.${answerIndex}.text`} component="div" className="text-red-500 text-sm" />
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push({ id: uuidv4(), text: '' })}
                                className="h-10 py-2 border rounded-md hover:border-gray-500 duration-300"
                              >
                                Add variant of answer
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <div className='relative mt-3'>
                        <Field as="select" name={`questions.${index}.correctAnswerId`} className="input border rounded-md p-3 w-full placeholder-transparent peer hover:border-gray-500" placeholder="Correct answer" disabled={!question.answers.length}>
                          <option value="">Select correct answer</option>
                          {question.answers.map((answer: Answer) => (
                            <option key={answer.id} value={answer.id}>{answer.text}</option>
                          ))}
                        </Field>
                        <ErrorMessage name={`questions.${index}.correctAnswerId`} component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ text: '', points: 1, answers: [], correctAnswerId: '' })}
                    className="py-2 h-10 border rounded-md hover:border-gray-500 duration-300"
                    title="Add new question"
                    style={{
                      backgroundImage: `url('/src/assets/icon-add.svg')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              )}
            </FieldArray>

            <QuizFormButton isEditing={!!id} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
