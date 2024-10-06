import { api } from "./base-api/base.api";

type NameAutocompleteOption = {
  value: string;
};

// запросы для работы с автозаполнением (dadata.ru)
export const autocompleteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNameSuggestions: builder.query<NameAutocompleteOption[], string>({
      query: (name) => ({
        url: `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio`,
        body: { query: name },
        method: "POST",
      }),
      transformResponse: (res) => {
        const transformedResponse = res.suggestions.map(
          (suggestion: NameAutocompleteOption) => {
            return { value: suggestion.value };
          }
        );
        return transformedResponse.filter((item, index) => {
          return (
            transformedResponse.findIndex((obj) => obj.value === item.value) ===
            index
          );
        });
      },
    }),
  }),
});

export const { useGetNameSuggestionsQuery } = autocompleteApi;
