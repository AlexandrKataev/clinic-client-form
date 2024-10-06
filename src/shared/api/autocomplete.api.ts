import { api } from "./config/base.api";

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
        // преобразуем объекты в массиве к нужному типу
        const transformedResponse: NameAutocompleteOption[] =
          res.suggestions.map((suggestion: NameAutocompleteOption) => {
            return { value: suggestion.value };
          });
        // фильтруем повторяющиеся ответы (иногда приходит два одинаковых значения)
        return transformedResponse.filter((option, i) => {
          return (
            transformedResponse.findIndex(
              (transformedOption) => transformedOption.value === option.value
            ) === i
          );
        });
      },
    }),
  }),
});

export const { useGetNameSuggestionsQuery } = autocompleteApi;
