import { api } from "./base-api/base.api";

interface NameAutocompleteOption {
  value: string;
  unrestricted_value: string;
  data: {
    surname: null | string;
    name: null | string;
    patronymic: null | string;
    gender: null | "MALE" | "FEMALE";
  };
}

// запросы для работы с автозаполнением (dadata.ru)
export const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query<NameAutocompleteOption[], string>({
      query: (name) => ({
        url: `https://632a05584c626ff832cfe7bb.mockapi.io/options`,
        body: { query: name },
        method: "POST",
      }),
      transformResponse: (res) => res.suggestions,
    }),
  }),
});

export const { useGetAllDoctorsQuery } = doctorApi;
