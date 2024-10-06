import { notification } from "antd";
import { api } from "./config/base.api";

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
    // фейковый запрос на сохранение клиента
    createClient: builder.mutation<CreateClientDto, CreateClientDto>({
      queryFn: async (createClientDto) => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("");
          }, 1500);
        });
        return { data: createClientDto };
      },
      async onQueryStarted(createClientDto, { queryFulfilled }) {
        await queryFulfilled;
        console.log(createClientDto);
        notification.success({
          duration: 3,
          placement: "bottom",
          message: `Клиент успешно сохранён:`,
          description: createClientDto.name,
        });
      },
    }),

    // получить все клиентские группы
    getClientGroups: builder.query<ClientGroup[], void>({
      query: () => ({
        url: `https://632a05584c626ff832cfe7bb.mockapi.io/client_groups`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateClientMutation, useGetClientGroupsQuery } = clientApi;
