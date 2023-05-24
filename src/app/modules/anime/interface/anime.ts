export interface IAnime {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  race: string;
  archetype: string;
  card_sets: ICardSet[];
  card_images: ICardImage[];
  card_prices: ICardPrice[];
}

export interface ICardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

export interface ICardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

export interface ICardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}
