export interface IPancasilaListStatusProyek {
  id: number;
  project_id: number;
  class_id: number;
  rombel_id: number;
  description?: string;
  time_start: string;
  time_finish: string;
  status: string;
  sent_by: number;
  project: Project;
  class: Class;
  sender: Sender;
  rombel?: Rombel;
}

export interface Project {
  id: number;
  title: string;
  is_recommended: boolean;
  media_id: string;
  theme_id: number;
  phase_id: number;
  theme: Theme;
  phase: Phase;
}

export interface Theme {
  id: number;
  name: string;
  project: any;
}

export interface Phase {
  id: number;
  name: string;
}

export interface Class {
  id: number;
  name: string;
}

export interface Sender {
  id: number;
  full_name: string;
  avatar: string;
  coin: number;
}

export interface Rombel {
  id: number;
  rombel_id: number;
  name: string;
}
