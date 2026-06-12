/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'fr' | 'yo' | 'ha' | 'ig' | 'ar' | 'es' | 'zh';

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' }
];

// Comprehensive high-quality translations dictionary for luxury African cuisine
export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Brand
    brand_name: "SMALL CHOPS BY AQEELAH",
    brand_slogan: "Modern African Luxury",
    royal_concierge: "ROYAL CONCIERGE",
    interactive_concierge: "SMALL CHOPS BOUTIQUE",
    exclusive_channels: "EXCLUSIVE CHANNELS",
    live_chat: "Live Chat",
    zainab_suite: "Zainab Suite",
    maitama_salon: "Abuja Salon",
    boutique_pages: "BOUTIQUE & CUISINE PAGES",

    // Navigation
    nav_home: "Home",
    nav_menu: "Cuisine",
    nav_tray_builder: "Bespoke Trays",
    nav_catering: "Event Catering",
    nav_diaspora: "Diaspora Desk",
    nav_consultation: "Talk with Aqeelah",
    nav_meet_aqeelah: "Meet Aqeelah",
    nav_location: "Our Location",
    nav_party_planner: "Event Planner",
    nav_reminders: "Anniversary Reminders",
    nav_corporate: "Corporate Office",
    nav_loyalty: "Royal Loyalty",
    nav_admin: "Maitama Admin",

    // Chatbot / Zainab
    chat_with_chef: "Chat with Chef Zainab Bello Sule",
    ai_concierge: "AI Concierge",
    chef_zainab: "Chef Zainab Bello Sule",
    chef_role: "Executive Culinary Director & Founder",
    welcome_msg: "Welcome, your Royal Highness. I am Chef Zainab. Let me curate an exquisite dining experience for you today.",
    how_to_help: "How may I assist your exquisite palate today?",

    // Hero Section
    hero_title_gold: "The Gilded Standard of",
    hero_title_chops: "African Gastronomy",
    hero_desc: "Indulge in hand-tailored, multi-sensory small chops that transcend ordinary dining. Crafted by Chef Zainab with organic ingredients, shipped instantly, and served in pure sovereign elegance.",
    hero_cta_menu: "Explore Cuisine",
    hero_cta_tray: "Design Custom Tray",
    hero_trusted: "TRUSTED BY SOVEREIGN ROYALTY & BOARDROOMS GLOBALLY",

    // General Actions & Intermediaries
    sign_in: "Sign In",
    sign_out: "Sign Out",
    cart_title: "Royal Cart",
    add_to_cart: "Add to Tray",
    added_to_cart: "Added to Tray!",
    search_placeholder: "Search signature recipes...",
    quantity: "Quantity",
    total: "Total",
    checkout: "Proceed to Checkout",
    instantly_available: "Instantly Available",
    notice_24h: "24h Notice",
    notice_48h: "48h Notice",
    currency: "₦",
    best_seller: "ROYAL FAVOURITE",
    seasonal: "SEASONAL LUXURY",
    not_logged_in_msg: "Please sign in to place orders.",

    // Section Titles
    section_menu_title: "The Royal Cuisine",
    section_menu_subtitle: "An exquisite collection of hand-rolled samosas, gilded dodo cups, fire-smoked meats, and fine desserts.",
    section_tray_title: "The Royal Tray Builder",
    section_tray_subtitle: "Drag, position, and customize your own gourmet platter with 3D physical coordinate feedback.",
    section_catering_title: "Sovereign Event Catering",
    section_catering_subtitle: "State dinners, high-society weddings, and luxury galas orchestrated in perfect visual harmony.",
    section_diaspora_title: "Diaspora Desk",
    section_diaspora_subtitle: "Surprise loved ones in Nigeria with fresh luxury catering from anywhere in the world.",
    section_consult_title: "Talk with Aqeelah",
    section_consult_subtitle: "Schedule private menu curation, visual event planners, or elite culinary consultations."
  },
  fr: {
    brand_name: "SMALL CHOPS PAR AQEELAH",
    brand_slogan: "Luxe Africain Moderne",
    royal_concierge: "CONCIERGE ROYAL",
    interactive_concierge: "BOUTIQUE DE SMALL CHOPS",
    exclusive_channels: "CANAUX EXCLUSIFS",
    live_chat: "Discussion en Direct",
    zainab_suite: "Suite de Zainab",
    maitama_salon: "Salon d'Abuja",
    boutique_pages: "PAGES BOUTIQUE & CUISINE",

    nav_home: "Accueil",
    nav_menu: "Cuisine",
    nav_tray_builder: "Plateaux sur Mesure",
    nav_catering: "Service Traiteur",
    nav_diaspora: "Bureau de la Diaspora",
    nav_consultation: "Parler avec Aqeelah",
    nav_meet_aqeelah: "Rencontrer Aqeelah",
    nav_location: "Notre Emplacement",
    nav_party_planner: "Planificateur d’Événement",
    nav_reminders: "Rappels d’Anniversaire",
    nav_corporate: "Bureau d’Affaires",
    nav_loyalty: "Fidélité Royale",
    nav_admin: "Admin Maitama",

    chat_with_chef: "Discuter avec le Chef Zainab Bello Sule",
    ai_concierge: "Concierge IA",
    chef_zainab: "Chef Zainab Bello Sule",
    chef_role: "Directrice Culinaire Exécutive & Fondatrice",
    welcome_msg: "Bienvenue, Votre Altesse Royale. Je suis le Chef Zainab. Laissez-moi organiser une expérience culinaire exquise pour vous aujourd'hui.",
    how_to_help: "Comment puis-je satisfaire votre palais exquis aujourd'hui ?",

    hero_title_gold: "Le Standard Doré de la",
    hero_title_chops: "Gastronomie Africaine",
    hero_desc: "Laissez-vous tenter par des amuses-bouches faits à la main et multisensoriels qui transcendent les repas ordinaires. Élaborés par le Chef Zainab avec des ingrédients biologiques, expédiés instantanément et servis dans une élégance souveraine pure.",
    hero_cta_menu: "Explorer la Cuisine",
    hero_cta_tray: "Concevoir un Plateau Personnalisé",
    hero_trusted: "APPROUVÉ PAR LA ROYAUTÉ ET LES SÉMINAIRES À L'ÉCHELLE GLOBALE",

    sign_in: "Se Connecter",
    sign_out: "Se Déconnecter",
    cart_title: "Panier Royal",
    add_to_cart: "Ajouter au Plateau",
    added_to_cart: "Ajouté !",
    search_placeholder: "Rechercher des recettes signatures...",
    quantity: "Quantité",
    total: "Total",
    checkout: "Passer à la Caisse",
    instantly_available: "Disponible Immédiatement",
    notice_24h: "Préavis de 24h",
    notice_48h: "Préavis de 48h",
    currency: "₦",
    best_seller: "FAVORI ROYAL",
    seasonal: "LUXE SAISONNIER",
    not_logged_in_msg: "Veuillez vous connecter pour passer des commandes.",

    section_menu_title: "La Cuisine Royale",
    section_menu_subtitle: "Une collection exquise de samoussas faits main, de tasses dodo dorées, de viandes fumées au feu et de desserts raffinés.",
    section_tray_title: "Le Constructeur de Plateaux",
    section_tray_subtitle: "Faites glisser, positionnez et personnalisez votre propre plateau gastronomique avec retour de coordonnées physiques 3D.",
    section_catering_title: "Service Traiteur Souverain",
    section_catering_subtitle: "Dîners d'État, mariages de la haute société et galas de luxe orchestrés dans une parfaite harmonie visuelle.",
    section_diaspora_title: "Bureau de la Diaspora",
    section_diaspora_subtitle: "Surprenez vos proches au Nigeria avec un service traiteur de luxe frais depuis n'importe où dans le monde.",
    section_consult_title: "Parler avec Aqeelah",
    section_consult_subtitle: "Organisez des menus privés, planifiez vos événements ou réservez des consultations culinaires d'élite."
  },
  yo: {
    brand_name: "SMALL CHOPS LATIỌWỌ AQEELAH",
    brand_slogan: "Ẹwà ati Ọla Ilẹ̀ Afíríkà",
    royal_concierge: "ALÁBÒJÚTÓ ỌLỌ́RẸ̀GẸ̀",
    interactive_concierge: "ILÉ-OŃJẸ CHOPS KÉKERÉ",
    exclusive_channels: "ÀWỌN ÒNÀ ÀKÀNHIṢE",
    live_chat: "Ìjíròrò Taara",
    zainab_suite: "Yàrá Zainab",
    maitama_salon: "Gbọ̀ngàn Abuja",
    boutique_pages: "ÀWỌN OJÚ-EWÉ ARA ỌLỌ́RẸ̀GẸ̀",

    nav_home: "Gbọ̀ngàn",
    nav_menu: "Ońjẹ Aládùn",
    nav_tray_builder: "Àwo Àkànṣe",
    nav_catering: "Oúnjẹ Àpèjẹ",
    nav_diaspora: "Ojú-iṣẹ́ Ilẹ̀ Òkèèrè",
    nav_consultation: "Bá Aqeelah Sọ̀rọ̀",
    nav_meet_aqeelah: "Pàdé Aqeelah",
    nav_location: "Ibùdó Wa",
    nav_party_planner: "Olùṣètò Àpèjẹ",
    nav_reminders: "Olùránnilétí Ọdún",
    nav_corporate: "Ilé-iṣẹ́ Nlá",
    nav_loyalty: "Ẹ̀bùn Ọba",
    nav_admin: "Olùdarí Maitama",

    chat_with_chef: "Bá Aláṣè Zainab Bello Sule Sọ̀rọ̀",
    ai_concierge: "Alábòjútó Ọlọgbọ́n",
    chef_zainab: "Olùṣètò Ọba Zainab Bello Sule",
    chef_role: "Olùdarí Atọ́nisọ́nà Oúnjẹ & Olùdásílẹ̀",
    welcome_msg: "Ẹ kú àbọ̀, Kabiyesi / Ọba. Emi ni Aláṣè Zainab. Ẹ jẹ́ kí n tọ́jú yín pẹ̀lú oúnjẹ aládùn lónìí.",
    how_to_help: "Báwo ni mo ṣe lè tẹ́ ẹnu yín lọ́rùn lónìí?",

    hero_title_gold: "Àwòṣe Wúrà Fun",
    hero_title_chops: "Oúnjẹ Adùn Afíríkà",
    hero_desc: "Gbadun oúnjẹ chops kékeré aládùn lati ọwọ́ Aláṣè Zainab tí a fi àwọn èròjà àdánidá ṣe pẹ̀lú ọlá ati ẹwà tí ó ga jùlọ.",
    hero_cta_menu: "Wo Oúnjẹ Wa",
    hero_cta_tray: "Ṣe Àwo Àwọn Chops Rẹ",
    hero_trusted: "FÚN ÀWỌN ỌBA ATI AJỌṢEPỌ̀ ŃLÁ RE KÁRÍ AYÉ",

    sign_in: "Wole",
    sign_out: "Jade",
    cart_title: "Àwo Ọba Rẹ",
    add_to_cart: "Kó Sínú Àwo",
    added_to_cart: "A ti Kó Sínú Àwo!",
    search_placeholder: "Wá oúnjẹ pataki lọ́rìn kankan...",
    quantity: "Mélòó",
    total: "Àpapọ̀",
    checkout: "Ṣe Sisanwó nísinsìnyí",
    instantly_available: "Wà lẹ́sẹ̀kẹsẹ̀",
    notice_24h: "Wákàtí mọ́kàndínlógún àbọ̀",
    notice_48h: "Wákàtí mẹ́jìlélógójì àbọ̀",
    currency: "₦",
    best_seller: "EGBE ỌBA FẸ́RÀN",
    seasonal: "ADÙN ASA",
    not_logged_in_msg: "Jọ̀wọ́ wọle láti ra oúnjẹ.",

    section_menu_title: "Àpèjẹ Oúnjẹ Ọba",
    section_menu_subtitle: "Àkójọpọ̀ àkànṣe ti samosa ti a fi ọwọ́ yí, àwo dodo wúrà, ẹran ríru lórí èédú, ati àwọn oúnjẹ adùn pẹ̀lú mi.",
    section_tray_title: "Olùṣe Àwo Ọba",
    section_tray_subtitle: "Wọ́, gbé, kí o sì ṣe àwo adùn tirẹ pẹ̀lú ìṣirò ibùdó kọ̀ọ̀dínèèti 3D.",
    section_catering_title: "Oúnjẹ Àpèjẹ Ọba",
    section_catering_subtitle: "Àpèjẹ orílẹ̀-èdè, ìgbéyàwó ọlọ́lá, ati àpèjẹ dídán tí a ṣètò rẹ̀ lẹ́sẹẹsẹ.",
    section_diaspora_title: "Ojú-iṣẹ́ Ilẹ̀ Òkèèrè",
    section_diaspora_subtitle: "Ṣe iyalẹnu fún àwọn olólùfẹ́ rẹ ní ilẹ̀ Nàìjíríà pẹ̀lú oúnjẹ ọlọ́lá tútù láti ibikíbi ní ayé.",
    section_consult_title: "Bá Aqeelah Sọ̀rọ̀",
    section_consult_subtitle: "Ṣètò àpèjẹ àkànṣe tàbí fídíò láti rí ìranlọ́wọ́ culinari tí ó ga jùlọ."
  },
  ha: {
    brand_name: "SANWAR TABA-KADI DAGA AQEELAH",
    brand_slogan: "Al'adun Afirka Na Zamani",
    royal_concierge: "JAGORAN SARAUTA",
    interactive_concierge: "GURIN ABINCI NA SARKIN",
    exclusive_channels: "TASHOSHIN KWARARRE",
    live_chat: "Hira Ta Kai Tsaye",
    zainab_suite: "Dakin Zainab Bello",
    maitama_salon: "Salon na Abuja",
    boutique_pages: "SHAFIN ABINCI DA SARAUTA",

    nav_home: "Gida",
    nav_menu: "Abinci",
    nav_tray_builder: "Babban Tiren Abinci",
    nav_catering: "Abincin Biki",
    nav_diaspora: "Ofishin Kasashen Waje",
    nav_consultation: "Yi Magana da Aqeelah",
    nav_meet_aqeelah: "Sadu da Aqeelah",
    nav_location: "Wajenmu",
    nav_party_planner: "Mai Tsara Biki",
    nav_reminders: "Tunatarwa na Musamman",
    nav_corporate: "Ofishin Kasuwanci",
    nav_loyalty: "Biyayya na Sarauta",
    nav_admin: "Gudanarwa na Maitama",

    chat_with_chef: "Gaisa da Chef Zainab Bello Sule",
    ai_concierge: "Mai Gudanarwa na AI",
    chef_zainab: "Shugabar Abinci Chef Zainab Sule",
    chef_role: "Babban Darakta na Abinci & Wanda ta Gilgila",
    welcome_msg: "Barka da zuwa, Shugaba Mai Daraja. Ni ce Shugabar Abinci Zainab. Bari in tsara muku abinci mafi dadi a yau.",
    how_to_help: "Yaya zan iya taimaka muku a yau?",

    hero_title_gold: "Zinariyar Sabon Tsari Na",
    hero_title_chops: "Abincin Kasar Afirka",
    hero_desc: "Ku ji dadin abincin 'small chops' na alfarma wanda Chef Zainab ta hada da kanta ta amfani da ingantattun kayan lambu na alfarma domin dandanun manyan baki.",
    hero_cta_menu: "Duba Abincinmu",
    hero_cta_tray: "Tsara Tiren Abincinka",
    hero_trusted: "AMINTACCEN MANYANSARA DA SAMAJA NA DUNIYAR GABA DAYA",

    sign_in: "Shiga Ciki",
    sign_out: "Fita Ciki",
    cart_title: "Kayan Sarki",
    add_to_cart: "Saka A Tiren Abinci",
    added_to_cart: "An Saka shi!",
    search_placeholder: "Nemi girkunanmu na musamman...",
    quantity: "Yawa",
    total: "Jimilla",
    checkout: "Ci gaba da Siyan Abinci",
    instantly_available: "Akwai Yanzu-Yanzu",
    notice_24h: "Sanarwar Sa'o'i 24",
    notice_48h: "Sanarwar Sa'o'i 48",
    currency: "₦",
    best_seller: "ABINCIN SARKIN",
    seasonal: "ALFARMAN LOKACI",
    not_logged_in_msg: "Da fatan za a shiga don yin oda.",

    section_menu_title: "Abincin Sarauta",
    section_menu_subtitle: "Tarihin sanannun samosa, kofunan gizdodo da aka kawata da zinare, gasasshen naman rago, da kayan zaki na alfarma.",
    section_tray_title: "Mai Tsara Tiren Sarauta",
    section_tray_subtitle: "Jawo, daidaita, sannan ka tsara babban tiren abincinka tare da lissafin firikwensin 3D na ainihi.",
    section_catering_title: "Abincin Biki Na Sarauta",
    section_catering_subtitle: "Abincin manyan tarurrukan gwamnati, bikin aure na masu kudi, da bukukuwan nishadi na musamman.",
    section_diaspora_title: "Ofishin Kasashen Waje",
    section_diaspora_subtitle: "Ba wa masoyanka dake Najeriya kyautar abinci na gaske kai tsaye daga kowane sassa na duniya.",
    section_consult_title: "Yi Magana da Aqeelah",
    section_consult_subtitle: "Tsara hirarku ko bidiyo don taimakon abinci mafi kwarewa daga bakin kwararru."
  },
  ig: {
    brand_name: "SMALL CHOPS SI N'AKA AQEELAH",
    brand_slogan: "Nka na Okomoko Afrịka",
    royal_concierge: "ONYE NCHE EZE",
    interactive_concierge: "ỤLỌ NAKANAKA ỤMỤ NTA EZE",
    exclusive_channels: "ỤZỌ NKANAHỤ PỤTARA IHE",
    live_chat: "Mkparịta Ụka Ahụ",
    zainab_suite: "Ime Ụlọ Zainab",
    maitama_salon: "Salon Abuja",
    boutique_pages: "IBE NKANAKA NA NALANDỌ",

    nav_home: "Ụlọ",
    nav_menu: "Nri Eze",
    nav_tray_builder: "Ite Chops Sị Ịhọrọ",
    nav_catering: "Nri Nnukwu Oriri",
    nav_diaspora: "Oche Ndị Bi na Ofesi",
    nav_consultation: "Soro Aqeelah Kparịta",
    nav_meet_aqeelah: "Zute Aqeelah",
    nav_location: "Ebe Anyị Dị",
    nav_party_planner: "Onye Nhazi Oriri",
    nav_reminders: "Ncheta Afọ Oriri",
    nav_corporate: "Ụlọ Ọrụ Nnukwu",
    nav_loyalty: "Onye Na-eguzosi Ike n'Eze",
    nav_admin: "Nchịkwa Maitama",

    chat_with_chef: "Gwa Onye Na-esi Nri Zainab Bello Sule",
    ai_concierge: "Onye Nche Amamihe AI",
    chef_zainab: "Chef Zainab Bello Sule",
    chef_role: "Onye Nchịkwa Nri Eze na Onye Choputara Ụzọ",
    welcome_msg: "Nnọọ nne, Eze na Onye Ukwu. Abụ m Chef Zainab. Ka m kwado nri magburu onwe ya nye gị taa.",
    how_to_help: "Kedu ka m ga-esi mee ka ọnụ gị gbanwee taa?",

    hero_title_gold: "Ụkpụrụ Olaedo Maka",
    hero_title_chops: "Nri Nakanaka Afrịka",
    hero_desc: "Nwee ọñụ na nri chops ụmụ nta pụrụ iche nke a na-eji aka rụọ site na aka Chef Zainab na-eji ngwa nri sitere n'okike, nke a na-eziga ngwa ngwa n'ụzọ okomoko kachasị elu.",
    hero_cta_menu: "Hụ Nri Anyị",
    hero_cta_tray: "Mepụta Ite Chops Gị",
    hero_trusted: "NDỊ EZE NA NDỊ MMADỤ NKE NWERE OKWUKWE N'ỤWA NILE",

    sign_in: "Banye",
    sign_out: "Pụọ",
    cart_title: "Ite Eze Gị",
    add_to_cart: "Tinye n'Ite Chops",
    added_to_cart: "Agbakwunyere ya!",
    search_placeholder: "Chọọ nhọrọ kacha mma...",
    quantity: "Ole",
    total: "Ngụkọta",
    checkout: "Gaba n'Ịkwụ Ụgwọ",
    instantly_available: "Ọ Dị Nso",
    notice_24h: "Oge Awa 24 tupu oge",
    notice_48h: "Oge Awa 48 tupu oge",
    currency: "₦",
    best_seller: "NGA NDỊ EZE FẸRỤN",
    seasonal: "OKOMOKO OGE ASA",
    not_logged_in_msg: "Biko banye ka ị nwee ike nye iwu nri.",

    section_menu_title: "Nri Eze Magburu Onwe Ya",
    section_menu_subtitle: "Nchịkọta pụrụ iche nke samosa e ji aka wepụta, iko dodo olaedo, anụ a kpara ọkụ, na nri zaki pụrụ iche.",
    section_tray_title: "Onye Mepụtara Ite Eze",
    section_tray_subtitle: "Dọpụta, dozie ma mepụta ite nakanaka nke gị site na iji nyocha coordinates na dimension 3D n'ezie.",
    section_catering_title: "Oriri Nri Eze",
    section_catering_subtitle: "Oriri mba, agbamakwụkwọ ndị ọlọla, na oriri doro anya nke a haziri n'usoro mara mma.",
    section_diaspora_title: "Oche Ndị Ofesi",
    section_diaspora_subtitle: "Mee ndị ị hụrụ n'anya nọ na Naịjirịa obi ụtọ site n'enye ha nri eze ọhụrụ site n'ebe ọ bụla n'ụwa.",
    section_consult_title: "Gwa Aqeelah Okwu",
    section_consult_subtitle: "Hazie mkparịta ụka vidiyo gị maka enyemaka nri kacha mma site n'aka ndị ọkachamara."
  },
  ar: {
    brand_name: "مأكولات سمول شوبس من عقيلة",
    brand_slogan: "الفخامة الأفريقية المعاصرة",
    royal_concierge: "الكونسيرج الملكي",
    interactive_concierge: "بوتيك الأطباق الفاخرة",
    exclusive_channels: "القنوات الحصرية",
    live_chat: "الدردشة الحية",
    zainab_suite: "جناح الشيف زينب",
    maitama_salon: "صالون أبوجا",
    boutique_pages: "صفحات البوتيك والطهي متميزة",

    nav_home: "الرئيسية",
    nav_menu: "المطبخ الفاخر",
    nav_tray_builder: "الأطباق المخصصة",
    nav_catering: "تموين الحفلات",
    nav_diaspora: "مكتب المغتربين",
    nav_consultation: "تحدث مع عقيلة",
    nav_meet_aqeelah: "قابل عقيلة",
    nav_location: "موقعنا",
    nav_party_planner: "مخطط الولائم",
    nav_reminders: "تنبيهات المناسبات",
    nav_corporate: "مكتب الشركات",
    nav_loyalty: "الولاء الملكي",
    nav_admin: "إدارة ميتاما",

    chat_with_chef: "تحدث مع الشيف زينب بيلو سلي",
    ai_concierge: "الكونسيرج الذكي",
    chef_zainab: "الشيف زينب بيلو سلي",
    chef_role: "المديرة التنفيذية للطهي والمؤسسة",
    welcome_msg: "مرحباً بجلالتكم الملكية. أنا الشيف زينب. اسمحوا لي بأن أعد لكم تجربة طعام استثنائية ونادرة اليوم.",
    how_to_help: "كيف يمكنني تلبية ذوقكم الرفيع اليوم؟",

    hero_title_gold: "المعيار الذهبي لـ",
    hero_title_chops: "المأكولات الأفريقية الفاخرة",
    hero_desc: "انغمس في أطباق السمول شوبس المحضرة يدوياً بأسلوب حسي يفوق المألوف. صنعت بفخر بواسطة الشيف زينب باستخدام مكونات عضوية طازجة، تشحن فوراً وتقدم بدقة ملكية سيادية.",
    hero_cta_menu: "استكشف المأكولات",
    hero_cta_tray: "صمم طبقك المخصص",
    hero_trusted: "موثوق من قبل العائلات المالكة ومجالس الإدارة عالمياً",

    sign_in: "تسجيل الدخول",
    sign_out: "تسجيل الخروج",
    cart_title: "السلة الملكية",
    add_to_cart: "إضافة إلى الطبق",
    added_to_cart: "تمت الإضافة بنجاح!",
    search_placeholder: "ابحث عن وصفتك المميزة...",
    quantity: "الكمية",
    total: "الإجمالي",
    checkout: "الدفع الآمن",
    instantly_available: "متوفر فوراً",
    notice_24h: "مطلوب إشعار قبل ٢٤ ساعة",
    notice_48h: "مطلوب إشعار قبل ٤٨ ساعة",
    currency: "₦",
    best_seller: "خيار الملوك الفضل",
    seasonal: "فخامة موسمية",
    not_logged_in_msg: "يرجى تسجيل الدخول لتقديم طلباتكم الفاخرة.",

    section_menu_title: "المعرض الملكي للطعام",
    section_menu_subtitle: "مجموعة مذهلة ونادرة من السمبوسة المحشوة يدوياً، وأكواب جيزدودو الذهبية اللذيذة، واللحوم المدخنة بالفحم الفاخر، والحلويات الراقية.",
    section_tray_title: "صانع الأطباق الملكية",
    section_tray_subtitle: "اسحب الأطمعة، نسق أماكنها، وصمم طبقك الفاخر المخصص مفعم بمؤشرات الإحداثيات الابعادية الثلاثية ثلاثية الأبعاد.",
    section_catering_title: "تموين الحفلات السيادي",
    section_catering_subtitle: "عشاء رسمي، حفلات زفاف مجتمعية رفيعة المستوى، ومهرجانات ملكية ساحرة منسقة بتناغم لافت للنظر.",
    section_diaspora_title: "مكتب المغتربين والمهجر",
    section_diaspora_subtitle: "فاجئ أحباءك وعائلتك المقيمة في نيجيريا بأطباق فاخرة شهية طازجة ومعدة بنفاذ صبر من أي مكان في العالم.",
    section_consult_title: "جلسة خاصة مع عقيلة",
    section_consult_subtitle: "احجز مشاورات طهي حصرية مباشرة، أو خطط لقائمة طعام مخصصة واستثنائية بمكالمات مرئية."
  },
  es: {
    brand_name: "SMALL CHOPS DE AQEELAH",
    brand_slogan: "Lujo Africano Moderno",
    royal_concierge: "CONCIERGE ROYAL",
    interactive_concierge: "BOUTIQUE DE PEQUEÑOS APERITIVOS",
    exclusive_channels: "CANALES EXCLUSIVOS",
    live_chat: "Chat en Vivo",
    zainab_suite: "Suite de Zainab",
    maitama_salon: "Salón de Abuya",
    boutique_pages: "PÁGINAS DE BOUTIQUE Y GASTRONOMÍA",

    nav_home: "Inicio",
    nav_menu: "Gastronomía",
    nav_tray_builder: "Bandejas Personalizadas",
    nav_catering: "Catering de Eventos",
    nav_diaspora: "Oficina de Diáspora",
    nav_consultation: "Hablar con Aqeelah",
    nav_meet_aqeelah: "Conocer a Aqeelah",
    nav_location: "Nuestra Ubicación",
    nav_party_planner: "Planificador de Eventos",
    nav_reminders: "Recordatorios de Aniversario",
    nav_corporate: "Oficina Corporativa",
    nav_loyalty: "Lealtad Real",
    nav_admin: "Admin Maitama",

    chat_with_chef: "Chatear con Chef Zainab Bello Sule",
    ai_concierge: "Conserje de IA",
    chef_zainab: "Chef Zainab Bello Sule",
    chef_role: "Directora Culinaria Ejecutiva y Fundadora",
    welcome_msg: "Bienvenido, Su Alteza Real. Soy la Chef Zainab. Permítame diseñar una experiencia culinaria exquisita hoy.",
    how_to_help: "¿Cómo puedo deleitar su paladar hoy?",

    hero_title_gold: "El Estándar Dorado de la",
    hero_title_chops: "Gastronomía Africana",
    hero_desc: "Deléitese con pequeños bocadillos artesanales y multisensoriales que trascienden las comidas ordinarias. Creados por la Chef Zainab con ingredientes orgánicos, entregados al instante y servidos con pura elegancia soberana.",
    hero_cta_menu: "Explorar Gastronomía",
    hero_cta_tray: "Diseñar Bandeja a Medida",
    hero_trusted: "CONFIADO POR LA REALEZA Y LAS COMITIVAS MÁS PRESTIGIOSAS GLOBALMENTE",

    sign_in: "Iniciar Sesión",
    sign_out: "Cerrar Sesión",
    cart_title: "Carrito de Realeza",
    add_to_cart: "Agregar a la Bandeja",
    added_to_cart: "¡Agregado con éxito!",
    search_placeholder: "Buscar recetas exclusivas...",
    quantity: "Cantidad",
    total: "Total",
    checkout: "Proceder al Pago Seguro",
    instantly_available: "Disponible al Instante",
    notice_24h: "Requiere 24h de anticipación",
    notice_48h: "Requiere 48h de anticipación",
    currency: "₦",
    best_seller: "FAVORITO REAL",
    seasonal: "LUJO DE TEMPORADA",
    not_logged_in_msg: "Por favor, inicie sesión para realizar pedidos.",

    section_menu_title: "La Cocina Real",
    section_menu_subtitle: "Una exquisita colección de samosas dobladas a mano, copas gourmet doradas, carnes ahumadas a la leña y postres finos.",
    section_tray_title: "El Creador de Bandejas",
    section_tray_subtitle: "Arrastre, organice y personalice su propia bandeja culinaria con retroalimentación en coordenadas 3D.",
    section_catering_title: "Catering de Eventos Soberanos",
    section_catering_subtitle: "Cenas de Estado, bodas de alta sociedad y galas lujosas orquestadas en una armonía estética soberbia.",
    section_diaspora_title: "Oficina de Diáspora",
    section_diaspora_subtitle: "Sorprenda a sus seres queridos en Nigeria con catering fresco y lujoso enviado desde cualquier parte del mundo.",
    section_consult_title: "Videollamada con Aqeelah",
    section_consult_subtitle: "Programe diseño de menú privado, coordinadores de banquetes visuales o consultorías culinarias de élite."
  },
  zh: {
    brand_name: "阿奇拉优雅精美点心",
    brand_slogan: "现代非凡奢华非洲美食",
    royal_concierge: "皇家尊贵礼宾",
    interactive_concierge: "阿奇拉点心精品店",
    exclusive_channels: "专属贵宾通道",
    live_chat: "即时在线聊天",
    zainab_suite: "泽娜柏主厨套房",
    maitama_salon: "阿布贾沙龙厅",
    boutique_pages: "精品店及经典烹饪导航",

    nav_home: "首页面",
    nav_menu: "皇家臻品美食",
    nav_tray_builder: "定制专属餐盘",
    nav_catering: "高端庆典宴会",
    nav_diaspora: "全球侨属专柜",
    nav_consultation: "与阿奇拉视频",
    nav_meet_aqeelah: "阿奇拉的故事",
    nav_location: "品牌精品店",
    nav_party_planner: "宴会智能估算",
    nav_reminders: "周年庆自动提醒",
    nav_corporate: "商务行政会议",
    nav_loyalty: "皇家贵宾会籍",
    nav_admin: "麦塔马管理后台",

    chat_with_chef: "与泽娜柏主厨即时对话",
    ai_concierge: "智能艺术礼宾",
    chef_zainab: "泽娜柏·贝洛·苏莱主厨",
    chef_role: "行政烹饪总监兼品牌创始人",
    welcome_msg: "恭迎亲王殿下/公主殿下。我是主厨泽娜柏。非常荣幸今天能为您定制独一无二的皇室宴会体验。",
    how_to_help: "请问今日我能如何愉悦您挑剔的味蕾？",

    hero_title_gold: "树立高级手作",
    hero_title_chops: "非洲美食黄金标准",
    hero_desc: "尊享泽娜柏主厨手工调制的感官精美点心，超越凡俗的餐饮境界。严格精选有机天然原料，即时新鲜配送，展现至高无上的皇家威仪。",
    hero_cta_menu: "鉴赏经典珍馐",
    hero_cta_tray: "定制专属奢华拼盘",
    hero_trusted: "全球皇室名流与董事会尊崇挚爱之选",

    sign_in: "会员登录",
    sign_out: "退出登录",
    cart_title: "皇家臻享餐车",
    add_to_cart: "加入尊享拼盘",
    added_to_cart: "已成功加入拼盘！",
    search_placeholder: "搜寻主厨经典配方...",
    quantity: "数量",
    total: "合计金额",
    checkout: "进行皇家安全结账",
    instantly_available: "现点现送",
    notice_24h: "需提前24小时预订",
    notice_48h: "需提前48小时预订",
    currency: "₦",
    best_seller: "皇家经典挚爱",
    seasonal: "非凡时令尊享",
    not_logged_in_msg: "请先登录以开始您的订餐流程。",

    section_menu_title: "皇家烹饪臻品",
    section_menu_subtitle: "手工折叠咖喱角、覆有金箔的美味吉多多盏、炭火慢熏美味山羊肉与高尚甜点的倾心汇聚。",
    section_tray_title: "皇家精选拼盘构建器",
    section_tray_subtitle: "拖拽、摆放并设计自创美食拼盘，搭载三维空间视觉反馈。",
    section_catering_title: "皇家至尊宴会承办",
    section_catering_subtitle: "高端国宴、上流社会婚礼及名流慈善晚宴。匠心呈现色香味俱佳的完美视觉盛宴。",
    section_diaspora_title: "全球侨属暖心关怀",
    section_diaspora_subtitle: "一键传情，为身在国内的挚爱亲朋配送新鲜奢华的家乡点心。",
    section_consult_title: "阿奇拉私享预约",
    section_consult_subtitle: "预约私人定制菜单品鉴、智能活动策划或精英餐饮全方位视频咨询。"
  }
};

const LanguageContext = createContext<{
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
  isRtl: boolean;
} | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const local = localStorage.getItem('aqeelah_language');
    return (local as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('aqeelah_language', lang);
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    // Dynamically adjust HTML document attributes for accessibility and correct direction layout
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [language, isRtl]);

  const t = (key: string, defaultText?: string): string => {
    const translationSet = TRANSLATIONS[language];
    if (translationSet && translationSet[key]) {
      return translationSet[key];
    }
    // Fallback to English
    const englishSet = TRANSLATIONS['en'];
    if (englishSet && englishSet[key]) {
      return englishSet[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      <div style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
