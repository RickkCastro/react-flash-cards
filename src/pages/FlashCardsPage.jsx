import { useState } from 'react';
import Button from '../components/Button';
import FlashCard from '../components/FlashCard';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';
import { allFlashCards } from '../data/allFlashCards';
import { helperShuffleArray } from '../helpers/arrayHelpers';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [showTitle, setShowTitle] = useState(true);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);

    setAllCards(shuffledCards);
  }

  console.log(showTitle);

  function handleRadioShowTitleClick() {
    setShowTitle(true);
  }

  function handleRadioShowDescClick() {
    setShowTitle(false);
  }

  return (
    <div>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
        </div>

        <div className="flex flex-row items-center justify-center space-x-2">
          <RadioButton
            name="showInfo"
            buttonChecked={showTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar título
          </RadioButton>
          <RadioButton
            name="showInfo"
            buttonChecked={!showTitle}
            onButtonClick={handleRadioShowDescClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>

        <FlashCards>
          {allCards.map(({ id, title, description }) => {
            return (
              <FlashCard
                key={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
              />
            );
          })}
        </FlashCards>
      </Main>
    </div>
  );
}
