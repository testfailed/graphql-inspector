import { useState, useCallback } from 'react';

const ENDPOINT_URL = 'https://guild-ms-slack-bot.vercel.app/api/graphql';

export function useMutation(query: string) {
  const [state, setState] = useState({
    complete: false,
    loading: false,
    error: null,
    data: null,
  });

  const mutate = useCallback(
    (variables: Record<string, any>) => {
      setState({
        complete: false,
        loading: true,
        data: null,
        error: null,
      });

      fetch(ENDPOINT_URL, {
        mode: 'no-cors',
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.errors) {
            throw new Error('Try Again');
          }

          setState({
            complete: true,
            loading: false,
            error: null,
            data,
          });
        })
        .catch((error) => {
          setState({
            complete: true,
            loading: false,
            data: null,
            error: error.toString ? error.toString() : error,
          });
        });
    },
    [query],
  );

  return [state, mutate];
}
