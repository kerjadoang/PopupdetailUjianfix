type IUjianExplanationType = 'shuffle_question' | 'shuffle_option';
type IQuestionTypeName = 'MCQ BASE' | 'ESSAY BASE' | 'MCQ COMPLEX';
type IQuestionType = {
  id?: number;
  name?: IQuestionTypeName;
};
type IRenderQuestionBodyType = IQuestionType;
type IRenderQuestionBodyMode = 'PREVIEW' | 'ANSWER';

interface IUjianExplanation {
  id?: string;
  paper?: Paper;
  student_exam?: StudentExam;
  user?: User;
}

interface IUjianCheck {
  _id?: string;
  id?: string;
  paper: Paper;
  student_exam?: StudentExam;
  school_exam?: SchoolExam;
  user?: User;
}

interface Paper {
  id?: number;
  name?: string;
  instructions?: string;
  descriptions?: string;
  total_question?: number;
  total_essay?: number;
  total_answered?: number;
  total_multiple?: number;
  total_multiple_complex?: number;
  total_essay_short?: number;
  total_matchmaking?: number;
  total_true_false?: number;
  chapter?: User;
  subject?: User;
  class?: User;
  question_package_service?: User;
  original_questions?: PaperQuestion[];
  questions?: PaperQuestion[];
  max_point?: number;
  wrong_answer?: number;
  correct_answer?: number;
  pass_answer?: number;
  submitted_answer?: number;
  exam_type?: string;
  duration?: number;
  total_point?: number;
  point?: number;
}

interface User {
  id?: number;
  name?: string;
}

interface PaperQuestion {
  id?: number;
  orig_order?: number;
  order?: number;
  questions?: string;
  instructions?: string;
  marks?: number;
  file_id?: string;
  chapter?: User;
  subject?: User;
  class?: User;
  question_level?: User;
  question_package_service?: User;
  school?: User;
  tag?: string;
  question_type?: User;
  options?: Option[] | null | undefined;
  selected_option?: Option | null | undefined;
  discussion?: string;
  user_input?: string;
  status?: string;
  point?: number;
  is_scored?: boolean;
}

interface Option {
  id?: number;
  answer?: string;
  orig_key?: string;
  key?: string;
  is_correct?: boolean;
  question_id?: number;
  file_id?: string;
  is_choosed?: boolean;
  point?: number;
}

interface StudentExam {
  id?: number;
  school?: User;
  status?: string;
  start_at?: string | undefined;
  finished_at?: string | undefined;
  token?: string;
  room?: string;
  recording?: string;
  duration?: number;
  school_exam_id?: number;
}

interface SchoolExam {
  id?: number;
  title?: string;
  teacher?: Curriculumn;
  school?: Curriculumn;
  curriculumn?: Curriculumn;
  question_package_service?: Curriculumn;
  rombel_class_school?: Curriculumn;
  subject?: Curriculumn;
  start_time?: string;
  end_time?: string;
  start_at?: string;
  end_at?: string;
  duration?: number;
  instructions?: string;
  status?: string;
  completed_at?: string;
  created_at?: string;
  teacher_token?: string;
  room?: string;
  total_assigned?: number;
  total_finished?: number;
  is_active_proctoring?: boolean;
  is_shuffle_questions?: boolean;
  is_shuffle_answers?: boolean;
}

interface Curriculumn {
  id?: number;
  name?: string;
}
