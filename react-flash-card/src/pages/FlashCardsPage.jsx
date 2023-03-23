import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Button from '../components/Button';
import Error from '../components/Error';
import FlahsCardItem from '../components/FlahsCardItem';
import FlashCard from '../components/FlashCard';
import FlashCardForm from '../components/FlashCardForm';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import {
  apiCreateFlashCard,
  apiDeleteFlahsCard,
  apiEditFlashCard,
  apiGetAllFlashCards,
} from '../services/apiServices';

export default function FlashCardsPage() {
  //Backend
  const [allCards, setAllCards] = useState([]);

  //Exclusivo para estudos
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [creteMode, setCreateMode] = useState(true);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    //Promisses
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });

    //IIFE
    // (async function getAllCards() {
    //   const backEndAllCards = await apiGetAllFlashCards();
    //   setAllCards(backEndAllCards);
    // })()

    //Async - await
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllCards();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);

    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: true,
    }));

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescClick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(false);
  }

  function hanfleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];

    const cardIndex = updatedCards.findIndex(card => card.id === cardId);

    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }

  async function handleDeleteFlashCard(cardId) {
    try {
      //backend
      await apiDeleteFlahsCard(cardId);

      //Frontend
      setAllCards(allCards.filter(c => c.id !== cardId));
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    setSelectedFlashCard(card);
    setCreateMode(false);
    setSelectedTab(1);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  async function handlePersist(title, description) {
    if (creteMode) {
      try {
        //backend
        const newFlashCard = await apiCreateFlashCard(title, description);

        //frontend
        setAllCards([...allCards, newFlashCard]);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        //backend
        await apiEditFlashCard(selectedFlashCard.id, title, description);

        //frontend
        setAllCards(
          allCards.map(card => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }

            return card;
          })
        );

        setSelectedFlashCard(null);
        setCreateMode(true);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex items-center justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlahsCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlahsCardItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo flash card
              </Button>
            </div>
            <FlashCardForm createMode={creteMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>

          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
            </div>

            <div className="flex flex-row items-center justify-center space-x-2">
              <RadioButton
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Mostrar título
              </RadioButton>
              <RadioButton
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescClick}
              >
                Mostrar descrição
              </RadioButton>
            </div>

            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={hanfleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <div>
      <Header>react-flash-cards-v4</Header>

      <Main>{mainJsx}</Main>
    </div>
  );
}
