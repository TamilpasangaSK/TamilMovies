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
  master
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

// Extract unique genres from all movies
export const genres = Array.from(
  new Set(movies.flatMap(movie => movie.genre))
).sort();