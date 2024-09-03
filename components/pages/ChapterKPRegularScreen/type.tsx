export interface _IDataChapter {
  chapter?: {
    id: number;
    subject_id: number;
    name: string;
    is_active: boolean;
    order: number;
  };
  practice_progress?: {
    total_material?: number;
    user_progress?: number;
    progress_percentage?: number;
  };
  test_progress?: {
    total_material?: number;
    user_progress?: number;
    progress_percentage?: number;
  };
  progress?: {
    total_material?: number;
    user_progress?: number;
    progress_percentage?: number;
  };
  unlocked?: boolean;
}
