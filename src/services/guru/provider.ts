import client from '@api/alternate';
import apiWithoutToken from '@api/withoutToken';
import {URL_PATH} from '@constants/url';

const provider = {
  sendRequestCall: (service_type: ServiceType, academy_class_session_id: any) =>
    client.get(
      URL_PATH.send_request_call(service_type, academy_class_session_id),
    ),
  checkRequestCall: (uuid: any) =>
    client.get(URL_PATH.check_request_call(uuid)),
  joinLiveClassSession: (
    service_type: ServiceType,
    academy_class_session_id: any,
  ) =>
    client.get(
      URL_PATH.join_live_class_session(service_type, academy_class_session_id),
    ),
  leaveLiveClassSession: (
    service_type: ServiceType,
    academy_class_session_id: any,
  ) =>
    client.get(
      URL_PATH.leave_live_class_session(service_type, academy_class_session_id),
    ),
  getRecordSession: (service_type: ServiceType) =>
    client.get(URL_PATH.get_record_session(service_type)),
  getReportLiveClassSummaryTotal: (
    {startRegistrasi, startTryout, module}: any,
    user: any,
  ) =>
    !user?.access_token
      ? client.get(
          URL_PATH.get_report_live_class_summary_total({
            startRegistrasi,
            startTryout,
            module,
          }),
        )
      : apiWithoutToken.get(
          URL_PATH.get_report_live_class_summary_total({
            startRegistrasi,
            startTryout,
            module,
          }),
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          },
        ),
  getReportLiveClassGraph: (
    {startRegistrasi, startTryout, module}: any,
    user: any,
  ) =>
    !user?.access_token
      ? client.get(
          URL_PATH.get_report_live_class_graph({
            startRegistrasi,
            startTryout,
            module,
          }),
        )
      : apiWithoutToken.get(
          URL_PATH.get_report_live_class_graph({
            startRegistrasi,
            startTryout,
            module,
          }),
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          },
        ),
};

export default provider;
