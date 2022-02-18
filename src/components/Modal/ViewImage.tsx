import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        w="auto"
        h="auto"
        maxW="900px"
        overflow="hidden"
        bg="pGray.800"
      >
        <ModalBody p="0">
          <Image src={imgUrl} alt={imgUrl} w="100%" maxW="900px" maxH="600px" />
        </ModalBody>
        <ModalFooter
          h="32px"
          justifyContent="flex-start"
          px="10px"
          py="8px"
          bg="pGray.800"
        >
          <Link href={imgUrl} isExternal fontSize="14px">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
