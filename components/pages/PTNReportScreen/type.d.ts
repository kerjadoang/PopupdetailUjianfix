interface PTNReportLiveClassSubject {
  id?: number;
  name?: string;
  total_live_class?: number;
  total_record?: number;
  total?: number;
}

interface ITooltipFormatter {
  componentType?: string;
  componentSubType?: string;
  componentIndex?: number;
  seriesType?: string;
  seriesIndex?: number;
  seriesId?: string;
  seriesName?: string;
  name?: string;
  dataIndex?: number;
  data?: Array<number | string>;
  value?: Array<number | string>;
  color?: string;
  dimensionNames?: string[];
  encode?: Encode;
  $vars?: string[];
  marker?: string;
}

interface Encode {
  x?: number[];
  y?: number[];
}
