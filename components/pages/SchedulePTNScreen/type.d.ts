interface ISchedule {
  id?: number;
  id_relation?: number;
  register_id?: number;
  type?: string;
  title?: string;
  sub_title?: string;
  time_start?: Date;
  time_finish?: Date;
  status?: string;
  note_group?: NoteGroup[];
  date_time?: Date;
  creator?: Creator;
  is_creator?: boolean;
  filter_category?: string;
  media_id?: string;
}

interface Creator {
  id?: number;
  full_name?: string;
  deleted_at?: null;
  coin?: number;
  referral_code?: string;
}

interface NoteGroup {
  icon?: string;
  description?: string;
}
