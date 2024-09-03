interface IDaftarProyekPancasila {
  id?: number;
  name?: string;
  project?: IProyekPancasila[];
}

interface IProyekPancasila {
  id?: number;
  title?: string;
  is_recommended?: boolean;
  media_id?: string;
  theme_id?: number;
  phase_id?: number;
}

interface IPancasilaPhase {
  id?: number;
  name?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  project?: null;
}

interface IPancasilaDetailProyek {
  id?: number;
  title?: string;
  description?: string;
  is_recommended?: boolean;
  source?: string;
  media_id?: string;
  theme_phase_id?: number;
  theme_id?: number;
  phase_id?: number;
  time_recommendation?: Date;
  updated_by?: number;
  created_by?: number;
  created_at?: Date;
  updated_at?: Date;
  theme?: IPancasilaPhase;
  phase?: IPancasilaPhase;
}
