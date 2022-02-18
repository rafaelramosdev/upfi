import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imageUrl, setImageUrl] = useState('');

  const handleViewImage = useCallback(
    (url: string) => {
      onOpen();
      setImageUrl(url);
    },
    [onOpen]
  );

  return (
    <>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="40px">
        {cards.map(card => {
          return <Card data={card} viewImage={handleViewImage} />;
        })}
      </SimpleGrid>

      <ModalViewImage onClose={onClose} isOpen={isOpen} imgUrl={imageUrl} />
    </>
  );
}
