import { api } from "./config/base.api";

export interface Doctor {
  id: string;
  name: string;
  avatar: string;
}

// запросы для работы с автозаполнением (dadata.ru)
export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => ({
        url: `https://632a05584c626ff832cfe7bb.mockapi.io/doctors`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
