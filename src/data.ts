/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, BlogArticle, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Small Chops
  {
    id: 'sc-01',
    name: 'Royal Signature Samosa Box',
    category: 'small-chops',
    price: 12000,
    image: '/src/assets/images/royal_samosa_box_1780760039006.png',
    description: 'Crisp, golden-brown triangle pastry parcels filled with premium minced beef, fragrant scotch bonnets, fresh spring onions, and Zainab’s secret spice blend.',
    ingredients: ['Premium Minced Beef', 'Scotch Bonnet Peppers', 'Spring Onions', 'Zainab’s Handcrafted Spice Blend', 'Wheat Flour Wrap'],
    portionSizes: ['Box of 12', 'Box of 24 (+₦10,000)', 'Box of 50 (+₦32,000)'],
    availability: 'Instantly Available',
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 148
  },
  {
    id: 'sc-02',
    name: 'Gilded Peppered Gizdodo Cups',
    category: 'small-chops',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    description: 'Bite-sized cubes of crispy gizzard and sweet plantain tossed in a savory, aromatic bell pepper sauce, finished with microgreens and served in custom golden edible wafer cups.',
    ingredients: ['Tender Chicken Gizzard', 'Ripe Plantain (Dodo)', 'Tatase Pepper Sauce', 'Onions', 'Edible Wheat Cups'],
    portionSizes: ['Platter of 15', 'Platter of 30 (+₦16,000)'],
    availability: '24h Notice',
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 92
  },
  {
    id: 'sc-03',
    name: 'Glazed Cinnamon-Sugar Puff Puff',
    category: 'small-chops',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    description: 'Light, fluffy, airy yeast leavened golden dough spheres tossed in organic cinnamon sugar and drizzled with Zainab’s luxury butterscotch sauce.',
    ingredients: ['Local Yeast Flour', 'Organic Cane Sugar', 'Cinnamon Dusting', 'Aqeelah Premium Butterscotch Drizzle'],
    portionSizes: ['Warm Box of 20', 'Celebration Tray of 50 (+₦12,000)'],
    availability: 'Instantly Available',
    rating: 5.0,
    reviewsCount: 220
  },
  {
    id: 'sc-04',
    name: 'Artisanal Shrimp Spring Rolls',
    category: 'small-chops',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800',
    description: 'Delicate paper-thin crisp pastry hand-rolled with juicy jumbo prawns, shredded carrots, cabbage, and young green beans, infused with sweet sesame oil.',
    ingredients: ['Wild-Caught Jumbo Prawns', 'White Cabbage', 'Carrots', 'Garlic Spritz', 'Light Sesame Glaze'],
    portionSizes: ['Box of 12', 'Box of 24 (+₦13,500)'],
    availability: 'Instantly Available',
    rating: 4.7,
    reviewsCount: 78
  },
  {
    id: 'sc-05',
    name: 'Gourmet Peppered Goat Meat (Asun Skewers)',
    category: 'small-chops',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800',
    description: 'Fiery, smokey charcoal-grilled goat meat cuts marinated in a spicy habanero, bell pepper, and onion relish, beautifully aligned on golden bamboo skewers.',
    ingredients: ['Local Smoked Goat Meat', 'Rough-Crushed Habanero (Ata Rodo)', 'Red Onions', 'Smoked Hardwood Infusion'],
    portionSizes: ['10 Skewers', '25 Skewers (+₦30,000)'],
    availability: '24h Notice',
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 165
  },
  {
    id: 'sc-06',
    name: 'Party Crispy Samosas (10 Pack)',
    category: 'small-chops',
    price: 3000,
    image: '/src/assets/images/party_crispy_samosas_1781078686763.png',
    description: 'Freshly folded sheets of crisp, golden pastry envelopes, generously packed with aromatic minced beef or seasoned potato veggies, with hot local spices.',
    ingredients: ['Spiced Minced Beef Fillets', 'Diced Onions', 'Fragrant Carrots', 'Green Peas', 'Traditional Spiced Wrap'],
    portionSizes: ['Pack of 10 pieces'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 114
  },
  {
    id: 'sc-07',
    name: 'Gourmet Spring Rolls (10 Pack)',
    category: 'small-chops',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    description: 'Shatteringly crisp, delicate paper-thin wraps packed tightly with tender shredded cabbage, caramelized sweet carrots, and seasoned garden herbs.',
    ingredients: ['Shredded Summer Cabbage', 'Sweet Garden Carrots', 'Bell Peppers', 'Ginger Relish', 'Signature Pastry Roll'],
    portionSizes: ['Pack of 10 pieces'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 96
  },
  {
    id: 'sc-08',
    name: 'Sovereign Glazed Puff Puffs',
    category: 'small-chops',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=800',
    description: 'Incredibly airy and pillow-soft fried Nigerian yeast dough spheres, fully glazed with a light, shiny crystalline sweet sugar glaze for a premium sweet-and-savory bite.',
    ingredients: ['Supreme Yeast Flour', 'Cane Sugar', 'Warm Nutmeg Grate', 'Sweet Shiny Sugar Glaze'],
    portionSizes: ['Warm Box of 10'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 188
  },
  {
    id: 'sc-09',
    name: 'Imperial Baked Meat Pies',
    category: 'small-chops',
    price: 7000,
    image: '/src/assets/images/imperial_meat_pies_1780760359723.png',
    description: 'Unbelievably buttery, melt-in-the-mouth shortcrust golden pastry shells loaded with a succulent, seasoned filling of pure minced beef, soft-stewed Irish potatoes, and carrots.',
    ingredients: ['Pure Beef Fillet Mince', 'Irish Potato Stew', 'Grated Carrots', 'Sovereign Shortcrust Butter Pastry'],
    portionSizes: ['Pack of 10 Large Pies'],
    availability: '24h Notice',
    rating: 4.8,
    reviewsCount: 105
  },
  {
    id: 'sc-10',
    name: 'Imperial Hand-Cut Golden Chin Chin',
    category: 'small-chops',
    price: 3000,
    image: '/src/assets/images/golden_chin_chin_1781079106376.png',
    description: 'Crispy, premium bite-sized Nigerian biscuit-style sweet dough squares, golden-fried to utter crunch perfection and packaged in a luxury, airtight 1-Liter container.',
    ingredients: ['High Quality Pastry Flour', 'Churned Creamery Butter', 'Evaporated Milk Infusion', 'Nutmeg Essence'],
    portionSizes: ['1-Liter (1 LTR) Airtight Jar'],
    availability: 'Instantly Available',
    rating: 5.0,
    reviewsCount: 215
  },
  {
    id: 'sc-11',
    name: 'Royal Coconut Milk Chin Chin',
    category: 'small-chops',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=800',
    description: 'An elite culinary tropical twist. Traditional hand-sliced crunchy chin chin squares enhanced with freshly pressed rich, creamy organic coconut milk and shredded coconut flakes.',
    ingredients: ['Pressed Organic Coconut Cream', 'Shredded Dehydrated Coconut Shavings', 'Pastry Flour', 'Vanilla Bean Glaze'],
    portionSizes: ['1-Liter (1 LTR) Luxury Jar'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 142
  },

  // --- HAUSA / AREWA INDIGENOUS DELICACIES ---
  {
    id: 'sc-12',
    name: 'Arewa Empress Dan Wake Skewers',
    category: 'small-chops',
    price: 13500,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    description: 'Delicate bean-flour dumplings (Dan Wake) cooked to super-soft texture, tossed in pure gourmet groundnut oil, hot native kulikuli pepper, hardboiled quail egg halves, and fresh spring onions on premium golden skewers.',
    ingredients: ['Local Bean Flour (Dan Wake)', 'Organic Groundnut Oil', 'Spicy Kulikuli Spice (Yaji)', 'Fresh Cabbage Strips', 'Quail Eggs'],
    portionSizes: ['Platter of 12 Skewers', 'Platter of 24 Skewers (+₦10,000)'],
    availability: '24h Notice',
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: 'sc-13',
    name: 'Gilded Dambun Nama Savory Cups',
    category: 'small-chops',
    price: 19000,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    description: "Chef Zainab's legendary slow-shredded fluffy fried beef floss (Dambun Nama) seasoned with northern ginger-garlic aromatics, served inside crunchy golden shortcrust cups topped with pomegranate jewels.",
    ingredients: ['Slow-Shredded Beef (Nama)', 'Crushed Ginger & Garlic', 'Northern Yaji Spices', 'Fragrant Groundnut Oil', 'Edible Tartlet Crusts'],
    portionSizes: ['Box of 15 Cups', 'Box of 30 Cups (+₦16,500)'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 64
  },
  {
    id: 'sc-14',
    name: 'Sovereign Masa Blossom Canapés',
    category: 'small-chops',
    price: 15500,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
    description: 'Bite-sized, miniature version of the classic fermented puffed rice cakes (Masa), pan-grilled on elegant brass ladles, hollowed slightly and crowned with honey-glazed minced beef yaji sauce.',
    ingredients: ['Fermented Tuwo Rice', 'Hausa Native Yeast', 'Honey-Glazed Beef Mince', 'Yaji Spice Sauce', 'Spring Onion Circles'],
    portionSizes: ['Tray of 16 Canapés', 'Tray of 32 Canapés (+₦14,000)'],
    availability: '24h Notice',
    rating: 4.9,
    reviewsCount: 51
  },
  {
    id: 'sc-15',
    name: 'Royal Kishi Crispy Skewers',
    category: 'small-chops',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    description: 'Delicately beaten, thinly-sliced sun-dried beef strips fried to a shatteringly crispy golden finish, dusted with high-heritage local red chili powder and sweet cane sugar hints.',
    ingredients: ['Sun-Dried Prime Beef Cuts', 'Traditional Arewa Chili Mix (Yaji)', 'Cane Sugar', 'Peanut Extract Oil'],
    portionSizes: ['Platter of 15 Sticks', 'Platter of 30 Sticks (+₦15,000)'],
    availability: '24h Notice',
    rating: 4.8,
    reviewsCount: 38
  },
  {
    id: 'sc-16',
    name: 'Gourmet Crispy Wara Saffron Fritters',
    category: 'small-chops',
    price: 11000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    description: 'Hausa local soy milk curried cheese cubes (Wara) steeped in rich saffron-spiked milk, coated in tempura-style crunchy crumbs and golden-fried, served with sweet-hot chili-zobo reduction.',
    ingredients: ['Artisanal Soy Cheese (Wara)', 'Saffron Strands', 'Panko Herb Crumbs', 'Sweet Chili-Zobo Reduction', 'Lime Zest'],
    portionSizes: ['Box of 12 Fritters', 'Box of 24 Fritters (+₦9,000)'],
    availability: 'Instantly Available',
    rating: 4.7,
    reviewsCount: 57
  },
  {
    id: 'sc-17',
    name: 'Empress Beef Suya Croquettes',
    category: 'small-chops',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800',
    description: 'Piping hot, crispy potato croquettes packed with a molten center of spiced local beef suya strips, mozzarella cheese, and signature Kano charred onions.',
    ingredients: ['Aromatic Irish Potatoes', 'Smoked Beef Suya', 'Mozzarella Cheese Core', 'Yaji Dusting', 'Golden Egg-Wash Coating'],
    portionSizes: ['Box of 12 Croquettes', 'Box of 24 Croquettes (+₦14,000)'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 81
  },
  {
    id: 'sc-18',
    name: 'Golden Awara Honey-Glazed Rounds',
    category: 'small-chops',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    description: 'Delectable pan-fried fresh milk tofu triangles drizzled with authentic sweet Kano forest honey, sprinkled with toasted sesame seeds and warm ginger sparks.',
    ingredients: ['Handcrafted Milk Awara', 'Kano Wild Forest Honey', 'Toasted Sesame Seeds', 'Powdered Ginger Dust'],
    portionSizes: ['Box of 15 Pieces', 'Box of 30 Pieces (+₦8,000)'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: 'sc-19',
    name: 'Traditional Gurasa Bandabanzu Bites',
    category: 'small-chops',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    description: 'Miniature rounds of soft local tandoor-baked northern flatbread (Gurasa) soaked in deep, smoky peanut paste, roasted onions, crushed dry chili, and fresh native garden eggs.',
    ingredients: ['Tandoor-Baked Wheat Flour Flatbread', 'Northern Peanut Paste (Kullun Kada)', 'Red Bell Onion Relish', 'Garden Eggs (Gauta)'],
    portionSizes: ['Platter of 15 Bites', 'Platter of 30 Bites (+₦11,000)'],
    availability: '24h Notice',
    rating: 4.9,
    reviewsCount: 44
  },
  {
    id: 'sc-20',
    name: 'Royal Alkaki Sweet Wheaten Twists',
    category: 'small-chops',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&q=80&w=800',
    description: 'Delightful bite-sized Arewa festive wheaten pastry twirls (Alkaki), fried to a perfect rich copper tone and soaked deep in premium local sugar honey syrup.',
    ingredients: ['Whole Wheat Coarse Flour', 'Tamarind Infused Syrup', 'Golden Cane Sugar', 'True Local Butter Ghee'],
    portionSizes: ['Jar of 20 Alkaki', 'Grand Bucket of 50 Alkaki (+₦11,000)'],
    availability: 'Instantly Available',
    rating: 5.0,
    reviewsCount: 110
  },
  {
    id: 'sc-21',
    name: 'Crispy Shinkafa Spiced Rice Crackers',
    category: 'small-chops',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-thin, crispy baked rice-flour crackers infused with ground ginger, cardamom, and local thyme, served with a velvety, rich spicy peanut dipping sauce.',
    ingredients: ['Local Shinkafa Rice Flour', 'Ground Ginger Essence', 'Cardamom Flavourings', 'Spicy Peanut Butter Dip'],
    portionSizes: ['Airtight Gift Jar of 24 Crackers'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 71
  },

  // --- ENGLISH HIGH-TEA & ASSORTED CLASSICS ---
  {
    id: 'sc-22',
    name: 'Gilded Cumberland Sausage Rolls',
    category: 'small-chops',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional English minced herb chicken sausage filling wrapped in incredibly flaky French-style puff pastry, glaze-brushed and topped with gold sesame seeds.',
    ingredients: ['Premium Minced Chicken-Herb Sausage', 'Laminated Butter Puff Pastry', 'Gold Saffron Egg Glaze', 'Toasted White Sesame Seeds'],
    portionSizes: ['Box of 12 Sausage Rolls', 'Box of 24 Sausage Rolls (+₦12,500)'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 93
  },
  {
    id: 'sc-23',
    name: 'Imperial Scotch Quail Eggs (12 Pack)',
    category: 'small-chops',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800',
    description: 'Delicate soft-boiled quail eggs wrapped in herby premium minced beef, rolled in fine golden breadcrumbs, and flash-fried to create a marvel of texture.',
    ingredients: ['Quail Eggs', 'Herbed Beef Mince', 'Crispy Panko Breadcrumbs', 'Smoked Paprika Dust'],
    portionSizes: ['Box of 12 Scotch Eggs', 'Box of 24 Scotch Eggs (+₦14,000)'],
    availability: '24h Notice',
    rating: 4.8,
    reviewsCount: 52
  },
  {
    id: 'sc-24',
    name: 'High-Tea Cucumber Dill Bites',
    category: 'small-chops',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
    description: 'Delicate crustless English high-tea sandwiches filled with paper-thin crisp cucumbers, silky cream cheese, fresh baby-dill weed, and soft lemon zest on premium brioche bread.',
    ingredients: ['English Greenhouse Cucumbers', 'Silky Cream Cheese Spread', 'Fresh Baby Dill', 'Zested Lemon', 'Custard Bread Slices'],
    portionSizes: ['Tier of 16 Finger Pieces', 'Double Tier of 32 Pieces (+₦10,000)'],
    availability: '24h Notice',
    rating: 4.9,
    reviewsCount: 41
  },
  {
    id: 'sc-25',
    name: 'Yorkshire Roast Beef & Horseradish Crowns',
    category: 'small-chops',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    description: 'Miniature hollow baked Yorkshire puddings filled with a soft pink curl of slow-roasted prime beef tenderloin, topped with elegant horseradish cream and fresh chives.',
    ingredients: ['Baked Egg-Batter Puddings', 'Tender Roast Beef Strips', 'White Horseradish Whipped Cream', 'Fresh Garden Chives'],
    portionSizes: ['Tray of 12 Crowns', 'Tray of 24 Crowns (+₦19,000)'],
    availability: '24h Notice',
    rating: 4.9,
    reviewsCount: 33
  },
  {
    id: 'sc-26',
    name: 'Sovereign Smoked Salmon Canapés',
    category: 'small-chops',
    price: 26000,
    image: '/src/assets/images/salmon_canapes_1781018815874.png',
    description: 'Smoked Atlantic salmon rosettes resting on gold-toasted butter brioche circles with caper-infused lemon cream cheese and microgreens.',
    ingredients: ['Chilled Smoked Atlantic Salmon', 'Butter Brioche Toast Rounds', 'Caper Berries', 'Zesty Whipped Cream Cheese'],
    portionSizes: ['Box of 12 Canapés', 'Box of 24 Canapés (+₦22,000)'],
    availability: '24h Notice',
    rating: 5.0,
    reviewsCount: 61
  },
  {
    id: 'sc-27',
    name: 'High-Tea Coronation Vol-au-Vents',
    category: 'small-chops',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&q=80&w=800',
    description: 'Light-as-air hollow crispy puff pastry towers filled with herbed cold coronation chicken breast salad tossed in a mild herbal curry cream, dried apricot dice, and toasted almond slivers.',
    ingredients: ['Hollow Crisp Puff Towers', 'Shredded Chicken Breast', 'Herbal Curry Cream', 'Diced Golden Apricots', 'Slivered Dry Almonds'],
    portionSizes: ['Platter of 15 Vol-au-vents', 'Platter of 30 Vol-au-vents (+₦13,000)'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 55
  },
  {
    id: 'sc-28',
    name: 'Welsh Rarebit & Aged Cheddar Bites',
    category: 'small-chops',
    price: 13000,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    description: 'Artisanal crusty English sourdough slices grilled with a rich, molten, frothy mixture of aged Cheddar cheese, local non-alcoholic stout glaze, English mustard, and hot Worcestershire drizzle.',
    ingredients: ['Rustic Crusty Sourdough', 'Aged English Cheddar', 'Craft Non-Alcoholic Stout Brew', 'True English Mustard Dust'],
    portionSizes: ['Tray of 16 Toast Canapés', 'Tray of 32 Toast Canapés (+₦11,000)'],
    availability: 'Instantly Available',
    rating: 4.7,
    reviewsCount: 22
  },
  {
    id: 'sc-29',
    name: 'Royal Quiche Lorraine Tartlets',
    category: 'small-chops',
    price: 17500,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant, buttery shortcrust pastry shells holding a rich quiche custard of caramelized leeks, smoky beef bacon chunks, and molten Gruyere cheese, baked to golden bronze perfection.',
    ingredients: ['Shortcrust Tart Shells', 'Caramelized Leeks', 'Smoky Beef Bacon', 'Grated Gruyere Cheese', 'Velvety Egg Custard'],
    portionSizes: ['Tray of 12 Tartlets', 'Tray of 24 Tartlets (+₦15,000)'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 39
  },
  {
    id: 'sc-30',
    name: 'Royal English Scones with Clotted Cream',
    category: 'small-chops',
    price: 14000,
    image: '/src/assets/images/royal_scones_1781018833992.png',
    description: 'Lightly sweetened baked tea-scones embedded with organic sultanas, served hot alongside authentic imported thick Devonian clotted cream and hand-pressed strawberry jam.',
    ingredients: ['Traditional Tea Scones', 'Dehydrated Sultanas', 'Imported Devonian Clotted Cream', 'Sweet Strawberry Preserve'],
    portionSizes: ['Box of 8 Large Scones', 'Box of 16 Large Scones (+₦11,500)'],
    availability: '24h Notice',
    rating: 4.8,
    reviewsCount: 46
  },
  {
    id: 'sc-31',
    name: 'Mini Beef Wellington Parcels',
    category: 'small-chops',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    description: 'Delightful bites of prime beef tenderloin pan-seared to medium-pink, wrapped in luxurious wild mushroom duxelles, herbed crêpes, and flaky buttery puff pastry cases.',
    ingredients: ['Prime Beef Tenderloin', 'Wild Mushroom Duxelles Mix', 'Thin French Crêpes', 'Golden Butter Puff Pastry Wrap'],
    portionSizes: ['Box of 8 Wellington Bites', 'Box of 16 Wellington Bites (+₦25,000)'],
    availability: '48h Notice',
    rating: 4.9,
    reviewsCount: 88
  },

  // Desserts
  {
    id: 'ds-01',
    name: 'Velvet Gold Crimson Slices',
    category: 'desserts',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-moist signature red velvet cake layers sandwiching premium Madagascar vanilla bean cream cheese frosting, elegantly detailed with pure 24K edible gold flakes.',
    ingredients: ['Valrhona Cocoa Powder', 'Organic Vanilla Bean', 'Cream Cheese Frosting', '24K Edible Gold Dusting'],
    portionSizes: ['Slab of 6 Slices', 'Grand Celebration Cake (+₦28,000)'],
    availability: '24h Notice',
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 112
  },
  {
    id: 'ds-02',
    name: 'Salted Caramel Toffee Cups',
    category: 'desserts',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    description: 'Indulgent, warm sticky dates pudding sponges soaked in a rich buttery salted caramel sauce, topped with toasted cashew praline dust.',
    ingredients: ['Medjool Dates sponge', 'Himalayan Pink Salt', 'House-churned Salted Caramel', 'Roasted Cashew brittle'],
    portionSizes: ['Set of 8 Cups', 'Family Share Platter of 16 (+₦14,000)'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 56
  },
  {
    id: 'ds-03',
    name: 'Royal Velvet Cupcakes (10 Pack)',
    category: 'desserts',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    description: 'Irresistibly moist, velvety golden-yellow cake domes topped with a luscious piped swirl of silky-smooth, premium vanilla bean cream frosting.',
    ingredients: ['Organic Vanilla Extract', 'Unsalted Sweet Butter', 'Piped Cream Cheese Frosting', 'Gold Pearl Sprinkles'],
    portionSizes: ['Box of 10 Cupcakes'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 88
  },
  {
    id: 'ds-04',
    name: 'Double Chocolate Cupcakes (10 Pack)',
    category: 'desserts',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800',
    description: 'Deep, rich, Dutch-processed dark chocolate cake base crowned with a decadent, creamy Belgian chocolate fudge frosting and rich chocolate curls.',
    ingredients: ['Valrhona Dark Cocoa', 'Belgian Chocolate Curls', 'Whipped Fudge Cream frosting', 'Cane Sugar'],
    portionSizes: ['Box of 10 Double Chocolate Cupcakes'],
    availability: 'Instantly Available',
    rating: 4.9,
    reviewsCount: 153
  },
  {
    id: 'ds-05',
    name: 'Sovereign Tres Leches Milk Cake',
    category: 'desserts',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious custom-soaked milk sponge cake resting in a rich bath of three specialty milks (evaporated, sweetened condensed, and heavy cream), piped with whipped vanilla cloud topping.',
    ingredients: ['Piped Sweet Cream', 'Evaporated Rich Milk', 'Sweetened Condensed Liquid Milk', 'Vanilla Sponge Cake'],
    portionSizes: ['Individual Shared Tub'],
    availability: 'Instantly Available',
    rating: 5.0,
    reviewsCount: 172
  },
  {
    id: 'ds-06',
    name: 'Grand Fluffy Pancakes Platter',
    category: 'desserts',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800',
    description: 'Golden-brown, feather-light diner-style buttermilk pancake stack topped with sweet wild berries, pristine dustings of powdered sugar, and rich organic maple drizzle.',
    ingredients: ['True Buttermilk Batter', 'Fresh Egg Whites', 'Powdered Cane Sugar', 'Organic Pure Maple Drizzle', 'Wild Berries Selection'],
    portionSizes: ['Imperial Platter (Serves 2-3)'],
    availability: 'Instantly Available',
    rating: 4.7,
    reviewsCount: 79
  },
  {
    id: 'ds-07',
    name: 'Special Imperial Mixed Fruit Platter',
    category: 'desserts',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=800',
    description: 'An eye-catching, refreshing, and clean compilation of freshly diced exotic Nigerian tropical fruits, drizzled with a light lime-mint and honey glaze.',
    ingredients: ['Sweet Red Watermelon', 'Ripe Rich Papaya', 'Tangy Sweet Pineapple', 'Fresh Local Mint Leaves', 'Wild Honey Glaze'],
    portionSizes: ['Individual Luxe Bowl'],
    availability: 'Instantly Available',
    rating: 4.8,
    reviewsCount: 61
  },

  // Drinks
  {
    id: 'dr-01',
    name: 'Zainab’s Hibiscus Elderflower Zobo',
    category: 'drinks',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=800',
    description: 'A premium craft elevation of traditional Zobo. Hand-picked organic hibiscus flowers cold-brewed with fresh sweet pineapples, intense ginger root, elderflower syrup, and dried orange crowns.',
    ingredients: ['Organic Hibiscus (Zobo)', 'Local Sweet Pineapple juice', 'Pressed Ginger Root', 'French Elderflower essence', 'Dehydrated Orange Wheel'],
    portionSizes: ['500ml Premium Glass Bottle', '1 Liter Sharing Decanter (+₦4,000)', 'Event Dispenser 10L (+₦45,000)'],
    availability: 'Instantly Available',
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 310
  },
  {
    id: 'dr-02',
    name: 'Ginger Passionfruit Palmwine Elixir',
    category: 'drinks',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    description: 'A sparkling, non-alcoholic or lightly naturally spiked modern twist on sweet palmwine, blended with passionfruit pulp, sweet key limes, and hot pressed ginger juice.',
    ingredients: ['Sweet Fresh Palmwine', 'Tropical Passionfruit pulp', 'Key Lime extract', 'Pressed Ginger Juice'],
    portionSizes: ['500ml Elegance Bottle', 'Case of 6 Bottles (+₦30,000)'],
    availability: '24h Notice',
    rating: 4.7,
    reviewsCount: 65
  },

  // Party Trays
  {
    id: 'pt-01',
    name: 'Bello Golden Jubilee Platter',
    category: 'party-trays',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=800',
    description: 'A majestic 60-piece luxury shared platter of standard celebration small chops. Includes 15 Beef Samosas, 15 Shrimp Spring Rolls, 15 Glazed Cinnamon Puff Puff, 15 Gourmet Asun Skewers. Served on an elegant re-usable golden utility tray.',
    ingredients: ['Complete Small Chops Selection', 'Premium Signature Dips', 'Handcrafted Golden Platter casing'],
    portionSizes: ['Medium Platter (60 pieces)', 'Royal Mega Platter (120 pieces) (+₦40,000)'],
    availability: 'Instantly Available',
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 284
  },
  {
    id: 'pt-02',
    name: 'Aqeelah Royal Dessert Tray',
    category: 'party-trays',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
    description: 'Curated 30-piece dessert platter containing 10 Velvet Gold Slices, 10 Salted Caramel Cups, and 10 Mini Apple Caramel Tarts, designed beautifully with seasonal Nigerian fruits, mint leaves, and gold trim.',
    ingredients: ['Velvet Gold Cake Slices', 'Salted Caramel puddings', 'Apple Caramel tarts', 'Gold finish styling'],
    portionSizes: ['Imperial Platter (30 pieces)', 'Sovereign Platter (60 pieces) (+₦45,000)'],
    availability: '48h Notice',
    rating: 4.9,
    reviewsCount: 89
  },

  // Gift Boxes & Corporate
  {
    id: 'gb-01',
    name: 'Empress Celebration Gift Chest',
    category: 'gift-boxes',
    price: 35000,
    image: '/src/assets/images/empress_gift_chest_1781019048143.png',
    description: 'The ultimate culinary gift experience. A premium vegan-leather chest featuring Zainab Bello Sule’s finest samosas, premium skewers, a custom bottle of Hibiscus Elderflower Zobo, two salted caramel cups, and a handwritten hot-foil gold gift card.',
    ingredients: ['Selected Savory & Sweet Items', 'Zobo Bottle', 'Elegance Leather Box casing', 'Golden Calligraphy cards'],
    portionSizes: ['Classic Chest', 'Grand Imperial Chest (+₦25,000)'],
    availability: '24h Notice',
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 154
  },
  {
    id: 'cp-01',
    name: 'Executive Boardroom Catering Box',
    category: 'corporate',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    description: 'Designed exclusively for corporate governance, client pitches, and board meetings. This premium package holds 5 individual premium small chops boxes containing executive snacks, zobo, dessert, napkins, gold cutlery, and corporate custom brand cards.',
    ingredients: ['Pre-packaged Individual Boxes', 'Specialty Napkins & Gold Cutlery', 'Logo Brandings option'],
    portionSizes: ['Box Array for 5 Board members', 'Box Array for 10 (+₦65,000)', 'Box Array for 20 (+₦120,000)'],
    availability: '48h Notice',
    rating: 4.9,
    reviewsCount: 74
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rv-01',
    author: 'Hafsat',
    rating: 5,
    date: '2026-05-15',
    comment: 'Catered my graduation celebration near BUK Campus old gate. Every single guest was stunned by the light, fluffy Cinnamon Puff Puff and the crispy samosas. Zainab Bello represents authentic hospitality at its peak!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rv-02',
    author: 'Khadija',
    rating: 5,
    date: '2026-05-28',
    comment: 'We booked the Bello Golden Platter and custom elderflower Zobos for our wedding feast. The Arewa geometric gold presentation was absolutely breathtaking. Small Chops by Aqeelah is Kano State’s absolute finest, bar none.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rv-03',
    author: 'Ahmad',
    rating: 5,
    date: '2026-06-02',
    comment: 'Stellar corporate service for our Board assembly in Gwale LGA. Punctual delivery, hot custom skewers, and clean billing invoice tracking. The Executive boxes are outstanding.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rv-04',
    author: 'Almustapha',
    rating: 5,
    date: '2026-05-10',
    comment: 'My siblings in the UK ordered the Empress Gift Chest as a remote surprise for my return. Delivered straight to House 14 near the Janbulo First Gate. Excellent hot packaging, and the custom card was written in beautiful gold script.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'rv-05',
    author: 'Batool',
    rating: 5,
    date: '2026-04-22',
    comment: 'Best dessert platter I have ever tasted in Northern Nigeria! Moist red velvet cake slices paired perfectly with sweet salted caramel toffee cups. Five stars for Zainab!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'bl-01',
    title: 'The Art of Layering Flavors: Deep inside Zainab’s Kitchen',
    excerpt: 'Explore how traditional African luxury food is elevated through custom aromatics, slow smoking, and delicate gold presentation.',
    content: 'Long before Small Chops by Aqeelah grew into Nigeria’s premier luxury celebration brand, Zainab Bello Sule was mastering the complexity of local spices. This article goes behind the kitchen scenes, exploring how our premium scotch bonnet onions, hardwood smoking techniques, and golden wafers came together to form the legendary Gizdodo edible cups.',
    category: 'Recipes',
    readTime: '4 mins read',
    date: 'June 1, 2026',
    author: 'Zainab Bello Sule',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    tags: ['Kitchen Secrets', 'Aqeelah Story', 'Nigerian Herbs']
  },
  {
    id: 'bl-02',
    title: 'Premium Guest Curation: Essential Party Planning Guides for Kano Events',
    excerpt: 'Calculations, temperature limits, menu structures, and elegant gold plating themes for weddings of up to 500 guests.',
    content: 'A Kano wedding in Gwale is not just a ceremony; it is a grand assembly of honor. Providing consistent, hot, crisp luxury small chops to up to 500 people simultaneously requires military precision. In this comprehensive guide, we map out portion recommendations, server ratios, and table setting alignments for modern northern brides.',
    category: 'Party Planning',
    readTime: '6 mins read',
    date: 'May 28, 2026',
    author: 'Wedding Committee Co.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800',
    tags: ['Kano Weddings', 'Table Design', 'Portion Calculators']
  },
  {
    id: 'bl-03',
    title: 'Food Trends: Why Custom Wafer Cups are Replacing Traditional Bowls',
    excerpt: 'How ecological sustainability meets ultimate aesthetic luxury in modern African culinary parties.',
    content: 'Modern diners eat with their eyes first and their morals second. Traditional small chops generate heavy single-use plastic loads. Our initiative with crispy, fragrant, sweet-savory edible wafer cups eliminates plastic waste while creating a beautiful new crunch in the Gizdodo experience.',
    category: 'Food Trends',
    readTime: '3 mins read',
    date: 'May 10, 2026',
    author: 'Gourmet Digest',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    tags: ['Eco Catering', 'Dessert Design', 'Gourmet Plating']
  }
];

export const FAQS = [
  {
    question: 'How far in advance must I book Event Catering?',
    answer: 'For premium custom celebrations (Weddings, Corporate Gala dinners, Large Birthdays), we highly encourage 14 days in advance. However, standard Party Trays and smaller Event Boxes can be prepared with a 24-hour to 48-hour notice depending on current order book volumes.'
  },
  {
    question: 'Does Zainab Bello Sule offer custom non-spicy adjustments?',
    answer: 'Absolutely. We respect all culinary preferences. While our hallmark is modern Nigerian spice pairing, you can configure your spiciness tolerance directly inside EACH menu item before clicking "Add To Cart", or specify bespoke instructions in your catering booking form.'
  },
  {
    question: 'How do you guarantee the freshness of scheduled gifts?',
    answer: 'All scheduled deliveries use our custom-insulated climate-controlled courier vehicles. Your hot small chops stay crispy inside thermal food locks, while desserts and sparkling zobos remain exactly at 4°C right to the celebrant’s doorstep.'
  },
  {
    question: 'What states in Nigeria do you support for delivery?',
    answer: 'We currently run our state-of-the-art production headquarters in Kano (Janbulo, Gwale). For large-scale destination events, our executive custom cater teams travel anywhere across Northern Nigeria and beyond.'
  }
];
