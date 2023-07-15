import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cardCoverImage from './images/bicycle-card.jpeg';

import './App.css';

const baseCls = 'home';


const App = () => {
  const [dealer, setDealer] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [deckId, setDeckId] = useState('');
  const [winner, setWinner] = useState('')
  const [customPoint, setCustomPoint] = useState(0)
  const [dealerPoint, setDealerPoint] = useState(0)

  useEffect(() => {
    initTable()
  }, [])

  useEffect(() => {
    const initCards = async () => {
      await fetchCard(true, false)
      await fetchCard(false, false)
      await fetchCard(true, true)
      await fetchCard(false, true)
    }
    if (deckId) {
      initCards()
    } 
  }, [deckId])

  useEffect(() => {
    if (customer.length > 1) {
      const { res, valid }= calcuatePoints(customer)
      if (!valid) {
        setWinner('dealer')
      } else {
        setCustomPoint(res)
      }
    }
  }, [customer])

  useEffect(() => {
    if (dealer.length > 1) {
      const { res, valid }= calcuatePoints(dealer)
      if (!valid) {
        setWinner('customer')
      } else {
        setDealerPoint(res)
      }
    }
  }, [dealer])

  const initTable = async () => {
    try {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      setDeckId(response.data.deck_id)
      setDealer([])
      setCustomer([])
      setWinner('')
      setCustomPoint(0)
      setDealerPoint(0)
    } catch (e) {
      throw e;
    }
  }

  const fetchCard = async (isDealer, hidden) => {
    const tempUrl =`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    try {
      const resCard = await axios.get(tempUrl)
      if (isDealer) {
        setDealer(prevDealer => [
          ...prevDealer,
          {
            hidden,
            ...resCard.data.cards[0],
          }
        ])
      } else {
        setCustomer(prevCustomer => [
          ...prevCustomer,
          {
            hidden,
            ...resCard.data.cards[0]
          }
        ])
      }
    } catch(e) {
      throw e;
    }
  }

  const showCard = () => {
    if (customPoint === dealerPoint) {
      setWinner('draw')
    }
    else if (customPoint > dealerPoint) {
      setWinner('customer')
    } else {
      setWinner('dealer')
    }
  }

  const calcuatePoints = (cards) => {
    let restPoint = 0;
    let numOfAces = 0;

    cards.forEach(card => {
      if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
        restPoint += 10
      } else if (card.value === 'ACE') {
        numOfAces++
      } else {
        restPoint += Number(card.value)
      }
    })

    if (numOfAces > 0) {
      restPoint += (numOfAces - 1) * 1
      const tempRes = restPoint + 11
      if (tempRes <= 21) {
        restPoint = tempRes
      } else {
        restPoint += 1
      }
    }

    return {
      res: restPoint,
      valid: restPoint <= 21,
    }
  }

  const cardsTable = (cards, isDealer) => (
    <div className={`${baseCls}__cards_table`}>
      <div className={`${baseCls}__table-title`}>{isDealer ? 'Dealer Table': 'Customer Table'}</div>
      <div className={`${baseCls}__render-cards`}>
        {
          cards.map((card, cardIndex) => {
            return (
              <div
                key={cardIndex}
                className={`${baseCls}__card`}
              >
                <img
                  className={`${baseCls}__card-img`}
                  src={(card.hidden && !winner) ? cardCoverImage: card.image}
                />
              </div>
            );
          })
        }
      </div>
      <div className={`${baseCls}__button_group`}>
        <div
          className={`${baseCls}__button_hit`}
          onClick={() => {
            fetchCard(isDealer, false)
          }}
        >
          Hit
        </div>
        <div className={`${baseCls}__button_stand`}>Stand</div>
      </div>
    </div>
  )

  const winnerCheck = (val) => {
    if (val === 'draw') {
      return (
        <div className={`${baseCls}__winner`} onClick={() => {initTable()}}>
          <div>Draw, nice game</div>
          <div className={`${baseCls}__one_more`}>One more Game</div>
        </div>
      )
    } else if (val === 'customer') {
      return (
        <div className={`${baseCls}__winner`} onClick={() => {initTable()}}>
          <div>Customer win game, nice game</div>
          <div className={`${baseCls}__one_more`}>One more Game</div>
        </div>
      )
    } else if (val === 'dealer') {
      return (
        <div className={`${baseCls}__winner`} onClick={() => {initTable()}}>
          <div>Dealer win game, nice game</div>
          <div className={`${baseCls}__one_more`}>One more Game</div>
        </div>
      )
    }

    return null
  }

  return (
    <div className={`${baseCls}`}>
      {winnerCheck(winner)}
      <div className={`${baseCls}__header`}>Hello, customer, black jack here!</div>
      {cardsTable(dealer, true)}
      {cardsTable(customer,false)}

      <div
        className={`${baseCls}_show_card`}
        onClick={showCard}
      >
        Show Card
      </div>
    </div>
  )
}

export default App;
