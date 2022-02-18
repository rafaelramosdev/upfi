import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: { after: pageParam },
      });
      return response.data;
    },
    {
      getNextPageParam: lastPage => lastPage.after || null,
    }
  );

  // useMemo uses an already known technique called memoization, which consists of saving the return value of a function from the input values
  // example: if a sum function receives parameters 2 and 3 and returns 5, these values are stored, and when that function is called with the same parameters, it does not need to redo the calculation to get the return value, since it is stored.
  const formattedData = useMemo(() => {
    // we will generally use this method when an object has more information than we need, and the contents of that object is an array within another array ('[[]') and we want to remove an array level, that is, ('[]') -> see example at the end of the file
    // maps each element using a mapping function and then flattens the result into a new array.
    return data?.pages.flatMap(page => {
      return page.data;
    });
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}

// EXAMPLE

// THEREOF
// {
//   "pages": [
//     {
//       "data": [
//         {
//             "title": "",
//             "description": "",
//             "url": "",
//             "ts": ,
//             "id": ""
//         },
//       ],
//       "after": ""
//     }
//   ],
//   "pageParams": [
//       null
//   ]
// }

// TO DO THIS
// [
//   {
//       "title": "",
//       "description": "",
//       "url": "",
//       "ts": ,
//       "id": ""
//   },
// ]
