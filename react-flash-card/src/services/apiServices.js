import { read, exclude, create, edit } from './httpSevices';
import { getNewId } from './idService';

export async function apiGetAllFlashCards() {
  const allFlashCards = await read('/flashcards');

  return allFlashCards;
}

export async function apiDeleteFlahsCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = {
    id: getNewId(),
    title,
    description,
  };

  await create(`/flashcards`, newFlashCard);

  return newFlashCard;
}

export async function apiEditFlashCard(cardId, title, description) {
  const updatedFlashCard = {
    title,
    description,
  };

  await edit(`/flashcards/${cardId}`, updatedFlashCard);

  return updatedFlashCard;
}
