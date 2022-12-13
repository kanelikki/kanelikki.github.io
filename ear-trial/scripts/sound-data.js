const Drum = {
    Pata:0,
    Pon:1,
    Chaka:2,
    Don:3,
};
Object.freeze(Drum);
const Song = {
    Patapata:0,
    Ponpon:1,
    Chakachaka:2,
    Ponpata:3,
    Ponchaka:4,
    Dondon:5,
    Donchaka:6
};
Object.freeze(Song);
const SongDrumMap = {
    [Song.Patapata]: [Drum.Pata, Drum.Pata, Drum.Pata, Drum.Pon],
    [Song.Ponpon]: [Drum.Pon, Drum.Pon, Drum.Pata, Drum.Pon],
    [Song.Chakachaka]: [Drum.Chaka, Drum.Chaka, Drum.Pata, Drum.Pon],
    [Song.Ponpata]: [Drum.Pon, Drum.Pata, Drum.Pon, Drum.Pata],
    [Song.Ponchaka]: [Drum.Pon, Drum.Pon, Drum.Chaka, Drum.Chaka],
    [Song.Dondon]: [Drum.Don, Drum.Don, Drum.Chaka, Drum.Chaka],
    [Song.Donchaka]: [Drum.Pata, Drum.Pon, Drum.Don, Drum.Chaka],
};
Object.freeze(SongDrumMap);
const SongSoundMap = {
    [Song.Patapata]: "march",
    [Song.Ponpon]: "attack",
    [Song.Chakachaka]: "defend",
    [Song.Ponpata]: "retreat",
    [Song.Ponchaka]: "charge",
    [Song.Dondon]:  "jump",
    [Song.Donchaka]: "party"
};
Object.freeze(SongSoundMap);
const NonCommonSongs = [Song.Patapata, Song.Ponpon, Song.Chakachaka];
Object.freeze(NonCommonSongs);
const CommonSongs = [Song.Ponpata, Song.Ponchaka, Song.Dondon, Song.Donchaka];
Object.freeze(CommonSongs);
//defines how the song goes.
//starts from 6s.
//follows patapon2 music soundtrack (wuffunfa) pattern.
const SongSequence = [
    [Song.Patapata, Song.Ponpon],
    [Song.Patapata, Song.Ponpon, Song.Chakachaka, Song.Patapata, Song.Ponpata, Song.Ponpon, Song.Ponchaka, Song.Donchaka, Song.Dondon],
    [Song.Patapata, Song.Patapata, Song.Ponpon, Song.Ponpon,
        Song.Chakachaka, Song.Chakachaka, Song.Patapata, Song.Patapata,
        Song.Ponpata, Song.Ponpon, Song.Ponpon, Song.Ponchaka,
        Song.Chakachaka, Song.Chakachaka, Song.Donchaka, Song.Patapata, Song.Dondon]
];
Object.freeze(SongSequence);
const ThemeNames = [
    "01gyorocchi",
    "02hothothot",
    "03yahoho",
    "04rinrin",
    "05oleoleole",
    "06freakout",
    "07bikkurakotta",
    "08gyorogyoro",
    "09awon",
    "10ushishishi",
    "11kachinkoron",
    "12oofoonfa",
    "13zunzunzun",
    "14pokkurimakka",
    "15downandout",
    "16ponbekedatta",
    "17tiktaktok",
    "18heywhazzat",
    "19hoihoiyahha",
    "20donjalalin",
    "21oohdatcool",
    "22bonvoyage",
    "23guppypuppy",
    "24wawawhat",
    "25palabiyappa",
    "26patakolassa",
    "27tumtatum",
    "32whoagyorocchi"
];
Object.freeze(ThemeNames);