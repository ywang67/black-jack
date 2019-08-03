import React from 'react';
import axios from 'axios';

import './App.css';

const baseCls = 'home';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      deck_id: '',
      customer: {},
      dealer: {},
      result: '',
      resNumber: [],
    };

    this.hitCard = this.hitCard.bind(this);
    this.getCard = this.getCard.bind(this);
  }

  componentDidMount() {
    this.drwaUnique(4);
    axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(res => {
        this.setState({
          deck_id: res.data.deck_id,
        }, () => {
          this.getCard(false)
            .then((res) => {
              this.getCard(true)
                .then(() => {
                  this.getCard(false)
                    .then(() => {
                      this.getCard(true);
                    });
                });
            });
        });
      });
  }

  getCard(val) {
    const original = val ? this.state.customer : this.state.dealer;
    const promise = new Promise((success) => {
      axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
        .then(res => {
          const temp = { ...original };
          temp[Object.keys(temp).length] = res.data.cards[0];

          if (val) {
            this.setState({
              customer: temp,
            }, () => {
              success();
            });
          } else {
            this.setState({
              dealer: temp,
            }, () => {
              success();
            });
          }
        })
    });
    return promise;
  }

  async drwaUnique(n) {
    const table = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    const res = [];
    while (res.length < n) {
      const card = await axios.get(`https://deckofcardsapi.com/api/deck/${table.data.deck_id}/draw/?count=1`);
      let isExisting = false;
      res.forEach(e => {
        if (e.data.cards[0].value === card.data.cards[0].value) {
          isExisting = true;
        }
      });
      if (!isExisting) {
        await res.push(card);
      }
    }
    console.log(res);
    return res;
  }

  hitCard() {
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
      .then(res => {
        const temp = { ...this.state.customer };
        temp[Object.keys(temp).length] = res.data.cards[0];
        this.setState({
          customer: temp,
        }, () => {
          // console.log(this.state.customer);
          // let dealerSum = 0;
          // Object.keys(this.state.dealer).forEach(key => {
          //   if (key) {
          //     dealerSum += this.state.dealer[key];
          //   }
          // });
          // const limit = dealerSum + 10;
          // dealerSum = dealerSum + this.state.dealer[0];
          // if (dealerSum < limit) {
          //   axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
          //     .then(dealRes => {
          //       const tempDealer = { ...this.state.dealer };
          //       tempDealer[Object.keys(tempDealer).length] = tempDealer.data;
          //       this.setState({
          //         dealer: tempDealer,
          //       });
          //     })
          // }
        })
      })
  }

  render() {
    const {
      customer,
      dealer,
    } = this.state;
    let customerSum = 0;
    const aceArray = Object.values(this.state.customer).filter(card => card.value === 'ACE');
    const nonAceArr = Object.values(this.state.customer).filter(card => card.value !== 'ACE');
    nonAceArr.forEach(card => {
      if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
        customerSum += 10;
      } else {
        customerSum += Number(card.value);
      }
    });
    aceArray.forEach(card => {
      const tempOne = customerSum + 1;
      const tempEleven = customerSum + 11;
      const tempOneDiffer = 21 - tempOne;
      const tempElevenDiffer = 21 - tempEleven;
      if (Math.abs(tempOneDiffer) < Math.abs(tempElevenDiffer) || tempElevenDiffer < 0) {
        customerSum = tempOne;
      } else {
        customerSum = tempEleven;
      }
    })
    return (
      <div className={`${baseCls}`}>
        <div className={`${baseCls}__header`}>Hello, customer, black jack here!</div>
        <div className={`${baseCls}__dealer`}>
          <div className={`${baseCls}__table-title`}>Dealer Table</div>
          <div className={`${baseCls}__render-cards`}>
            {
              Object.values(dealer).map((card, i) => {
                if (i) {
                  return (
                    <div
                      key={`${card.key}-${card.suit}`}
                      className={`${baseCls}__card`}
                    >
                      <img
                        className={`${baseCls}_card-img`}
                        src={`${card.image}`}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`${card.code}-${card.suit}`}
                      className={`${baseCls}__card`}
                    >
                      <img
                        className={`${baseCls}__card-img-hide-dealer`}
                        src={`${card.image}`}
                      />
                      {
                        customerSum > 21
                          ? (
                            <div className={`${baseCls}__result`}>You Lose, please refresh to play again.</div>
                          )
                          : null
                      }
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
        <div className={`${baseCls}__customer`}>
          <div className={`${baseCls}__table-title`}>Customer Table</div>
          <div className={`${baseCls}__render-cards`}>
            {
              Object.values(customer).map((card, i) => {
                if (i) {
                  return (
                    <div
                      key={`${card.code}-${card.suit}`}
                      className={`${baseCls}__card`}
                    >
                      <img
                        className={`${baseCls}_card-img`}
                        src={`${card.image}`}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`${card.key}-${card.suit}`}
                      className={`${baseCls}__card`}
                    >
                      <img
                        className={`${baseCls}__card-img-hide`}
                        src={`${card.image}`}
                      />
                    </div>
                  )
                }
              })
            }
          </div>
          <div className={`${baseCls}__customer-options`}>
            <div
              className={`${baseCls}__hit`}
              onClick={() => {
                this.hitCard();
              }}
            >
              Hit
            </div>
            <div className={`${baseCls}__stand`}>Stand</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
