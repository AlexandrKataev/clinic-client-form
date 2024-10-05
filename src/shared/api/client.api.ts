import { api } from "./base-api/base.api";

interface ClientGroup {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface Client {
  name: string;
  birthday: Date;
  phone: string;
  sex: "male" | "female" | null;
  groups: ClientGroup[];
}

// запросы для работы с клиентами
export const clientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation<Client[], string>({
      query: (name) => ({
        url: `/`,
        body: { query: name },
        method: "POST",
      }),
      transformResponse: (res) => res.suggestions,
    }),
    getClientGroups: builder.query<ClientGroup[], void>({
      query: () => ({
        url: `https://632a05584c626ff832cfe7bb.mockapi.io/client_groups`,
        method: "GET",
      }),
      //   transformResponse: (res) => res.suggestions,
    }),
  }),
});

export const { useCreateClientMutation, useGetClientGroupsQuery } = clientApi;
