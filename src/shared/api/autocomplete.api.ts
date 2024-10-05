import { api } from "./base-api/base.api";

type NameAutocompleteOption = {
  value: string;
  unrestricted_value: string;
  data: {
    surname: null | string;
    name: null | string;
    patronymic: null | string;
    gender: null | "MALE" | "FEMALE";
  };
};

// запросы для работы с автозаполнением (dadata.ru)
export const autocompleteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNameSuggestions: builder.query<NameAutocompleteOption[], string>({
      query: (name) => ({
        url: `http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio`,
        body: { query: name },
        method: "POST",
      }),
      transformResponse: (res) => res.suggestions,
    }),
  }),
});

export const { useGetNameSuggestionsQuery } = autocompleteApi;
