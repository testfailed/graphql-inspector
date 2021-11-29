import { useState, useCallback } from 'react';

const ENDPOINT_URL = 'https://guild-ms-slack-bot.vercel.app/api/graphql';

type State = {
  complete: boolean;
  loading: boolean;
  error: string | null;
  data: any;
};

type Mutate = (variables: Record<string, unknown>) => void;

const DEFAULT_STATE = {
  complete: false,
  loading: false,
  error: null,
  data: null,
};

export function useMutation(query: string): [State, Mutate] {
  const [state, setState] = useState<State>(DEFAULT_STATE);

  const mutate = useCallback(
    (variables) => {
      setState({
        ...DEFAULT_STATE,
        loading: true,
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
