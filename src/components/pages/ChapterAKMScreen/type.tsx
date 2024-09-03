export interface _IDataChapter {
  chapter: {
    id: any;
    name: string;
    order: number;
  };
  progress: {
    total_material: number;
    user_progress: number;
    progress_percentage: number;
  };
  unlocked: boolean;
}
