import React from 'react';

const baseCls = 'banner'

const Banner = () => {
  return (
    <div
      className={baseCls}
    >
      <div className={`${baseCls}__content`}>
        <h3>
          fresh and
          {' '}
          <span>organic</span>
          {' '}
          products
        </h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
          vitae perspiciatis neque soluta.
        </p>
        <button type='button' className={`${baseCls}__btn`}>
          shop now
        </button>
      </div>
    </div>
  );
}

export default Banner
