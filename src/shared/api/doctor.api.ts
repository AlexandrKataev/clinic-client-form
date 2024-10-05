import { api } from "./base-api/base.api";

interface Doctor {
  id: string;
  name: string;
}

// запросы для работы с автозаполнением (dadata.ru)
export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query<Doctor[], void>({
      query: () => ({
        url: `https://632a05584c626ff832cfe7bb.mockapi.io/doctors`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDoctorsQuery } = doctorApi;
