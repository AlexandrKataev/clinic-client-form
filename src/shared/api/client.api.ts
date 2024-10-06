import { notification } from "antd";
import { api } from "./base-api/base.api";

interface ClientGroup {
  id: string;
  type: string;
  title: string;
  description: string;
}

interface CreateClientDto {
  name: string;
  birthday: string;
  phone: string;
  sex: "male" | "female";
  groups: ClientGroup[];
  doctorId: string;
  disableSms: boolean;
}

// запросы для работы с клиентами
export const clientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation<CreateClientDto, CreateClientDto>({
      queryFn: async (createClientDto) => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("");
          }, 1500);
        });
        return createClientDto;
      },
      async onQueryStarted(createClientDto, { queryFulfilled }) {
        await queryFulfilled;
        console.log(createClientDto);
        notification.success({
          duration: 3,
          placement: "bottom",
          description: createClientDto.name,
          message: `Клиент успешно сохранён:`,
        });
      },
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
