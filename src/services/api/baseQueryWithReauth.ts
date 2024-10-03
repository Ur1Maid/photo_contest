import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",
  credentials: "include",
});

// @ts-ignore
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Ждем, пока не завершится другой запрос обновления токена, если он есть
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // Пытаемся обновить токен
        const refreshResult = await baseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // Если обновление прошло успешно, повторяем исходный запрос
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Если не удалось обновить токен, можно сделать логаут или обработать ошибку
          // api.dispatch(logoutAction());
        }
      } finally {
        // Освобождаем mutex после завершения запроса на обновление токена
        release();
      }
    } else {
      // Ждем, пока другой процесс обновления токена завершится
      await mutex.waitForUnlock();
      // После этого повторяем исходный запрос
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
