import { dunePartTwo } from './dune-part-two';
import { oppenheimer } from './oppenheimer';
import { spiderManAcrossTheSpiderVerse } from './spider-man-across-the-spider-verse';
import { guardiansOfTheGalaxyVol3 } from './guardians-of-the-galaxy-vol-3';
import { theBatman } from './the-batman';
import { topGunMaverick } from './top-gun-maverick';
import { avatarTheWayOfWater } from './avatar-the-way-of-water';
import { blackPantherWakandaForever } from './black-panther-wakanda-forever';
import { johnWickChapter4 } from './john-wick-chapter-4';
import { fastX } from './fast-x';
import { screamVI } from './scream-vi';
import { cocaineBear } from './cocaine-bear';
import { antManAndTheWaspQuantumania } from './ant-man-and-the-wasp-quantumania';
import { creedIII } from './creed-iii';
import { theSuperMarioBrosMovie } from './the-super-mario-bros-movie';
import { transformersRiseOfTheBeasts } from './transformers-rise-of-the-beasts';
import { master } from './master';
import { Akkenam } from './akkenam';
import { Andhera_Season_1 } from './Andhera_Season_1';
import { Butterfly_Season_1 } from './Butterfly_Season_1';
import { Good_Day } from './Good_Day';
import { How_to_Train_Your_Dragon } from './How_to_Train_Your_Dragon';
import { J_S_K_Janaki_v_v_S_State_of_Kerala } from './J.S.K_Janaki_v.v_S_State_of_Kerala';
import { Mission_Impossible_The_Final_Reckoning } from './Mission_Impossible_The_Final_Reckoning';
import { Night_Always_Comes } from './Night_Always_Comes';
import { Sausage_Party_Foodtopia_Season_2 } from './Sausage_Party_Foodtopia - Season 2';
import { Yaadhum_Ariyaan_2025 } from './Yaadhum_Ariyaan_2025';

export const movies = [
  dunePartTwo,
  oppenheimer,
  spiderManAcrossTheSpiderVerse,
  guardiansOfTheGalaxyVol3,
  theBatman,
  topGunMaverick,
  avatarTheWayOfWater,
  blackPantherWakandaForever,
  johnWickChapter4,
  fastX,
  screamVI,
  cocaineBear,
  antManAndTheWaspQuantumania,
  creedIII,
  theSuperMarioBrosMovie,
  transformersRiseOfTheBeasts,
  master,
  akkenam,
  Andhera_Season_1,
  Butterfly_Season_1,
  Good_Day,
  How_to_Train_Your_Dragon,
  J_S_K_Janaki_v_v_S_State_of_Kerala,
  Mission_Impossible_The_Final_Reckoning,
  Night_Always_Comes,
  Sausage_Party_Foodtopia_Season_2,
  Yaadhum_Ariyaan_2025,
];

export * from './dune-part-two';
export * from './oppenheimer';
export * from './spider-man-across-the-spider-verse';
export * from './guardians-of-the-galaxy-vol-3';
export * from './the-batman';
export * from './top-gun-maverick';
export * from './avatar-the-way-of-water';
export * from './black-panther-wakanda-forever';
export * from './john-wick-chapter-4';
export * from './fast-x';
export * from './scream-vi';
export * from './cocaine-bear';
export * from './ant-man-and-the-wasp-quantumania';
export * from './creed-iii';
export * from './the-super-mario-bros-movie';
export * from './transformers-rise-of-the-beasts';
export * from './master';
export * from './akkenam';
export * from './Andhera_Season_1';
export * from './Butterfly_Season_1';
export * from './Good_Day';
export * from './How_to_Train_Your_Dragon';
export * from './J.S.K_Janaki_v.v_S_State_of_Kerala';
export * from './Mission_Impossible_The_Final_Reckoning';
export * from './Night_Always_Comes';
export * from './Sausage_Party_Foodtopia - Season 2';
export * from './Yaadhum_Ariyaan_2025';

// Extract unique genres from all movies
export const genres = Array.from(
  new Set(movies.flatMap(movie => movie.genre))
).sort();