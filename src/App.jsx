import React, { useState, useEffect, useRef } from "react";
import { Trophy, Clock, Star, Zap, Target, Brain, BookOpen, ArrowLeft, Volume2, Check, X, Flame, Award, Sparkles } from "lucide-react";

// ============ MÜFREDAT VERİSİ (MEB 4. ve 8. sınıf - ilk 8 ünite) ============

const CURRICULUM = {
  grade4: {
    name: "4. Sınıf",
    color: "#FF6B9D",
    accent: "#FFE5EF",
    units: [
      {
        id: 1,
        title: "Classroom Rules",
        emoji: "📚",
        vocab: [
          { en: "listen", tr: "dinlemek" },
          { en: "raise hand", tr: "el kaldırmak" },
          { en: "stand up", tr: "ayağa kalkmak" },
          { en: "sit down", tr: "oturmak" },
          { en: "open book", tr: "kitabı açmak" },
          { en: "close book", tr: "kitabı kapatmak" },
          { en: "quiet", tr: "sessiz" },
          { en: "teacher", tr: "öğretmen" },
          { en: "permission", tr: "izin" },
          { en: "homework", tr: "ödev" },
          { en: "classroom", tr: "sınıf" },
          { en: "share", tr: "paylaşmak" },
          { en: "respect", tr: "saygı" },
          { en: "eraser", tr: "silgi" },
          { en: "pencil", tr: "kalem" },
          { en: "ruler", tr: "cetvel" },
        ],
        sentences: [
          { q: "___ your book, please.", options: ["Open", "Eat", "Drink", "Run"], a: "Open" },
          { q: "Please be ___ in class.", options: ["loud", "quiet", "fast", "hungry"], a: "quiet" },
          { q: "___ up when the teacher comes.", options: ["Stand", "Sleep", "Run", "Eat"], a: "Stand" },
          { q: "Please ___ to your teacher.", options: ["listen", "shout", "jump", "sing"], a: "listen" },
          { q: "You need ___ to go outside.", options: ["permission", "pencil", "eraser", "ruler"], a: "permission" },
          { q: "___ your hand before you speak.", options: ["Raise", "Close", "Open", "Sit"], a: "Raise" },
          { q: "Don't forget to do your ___.", options: ["homework", "breakfast", "lunch", "dinner"], a: "homework" },
          { q: "We must ___ our things with friends.", options: ["share", "hide", "throw", "eat"], a: "share" },
        ],
      },
      {
        id: 2,
        title: "Nationality",
        emoji: "🌍",
        vocab: [
          { en: "Turkish", tr: "Türk" },
          { en: "English", tr: "İngiliz" },
          { en: "American", tr: "Amerikalı" },
          { en: "German", tr: "Alman" },
          { en: "French", tr: "Fransız" },
          { en: "Italian", tr: "İtalyan" },
          { en: "Spanish", tr: "İspanyol" },
          { en: "Japanese", tr: "Japon" },
          { en: "Brazilian", tr: "Brezilyalı" },
          { en: "Russian", tr: "Rus" },
          { en: "Korean", tr: "Koreli" },
          { en: "Chinese", tr: "Çinli" },
          { en: "country", tr: "ülke" },
          { en: "language", tr: "dil" },
          { en: "flag", tr: "bayrak" },
          { en: "capital", tr: "başkent" },
        ],
        sentences: [
          { q: "I am from Turkey. I am ___.", options: ["Turkish", "German", "French", "Korean"], a: "Turkish" },
          { q: "She is from Japan. She is ___.", options: ["Italian", "Japanese", "Spanish", "Russian"], a: "Japanese" },
          { q: "He is from America. He is ___.", options: ["American", "English", "Turkish", "Chinese"], a: "American" },
          { q: "They are from France. They are ___.", options: ["German", "French", "Spanish", "Brazilian"], a: "French" },
          { q: "Samba is a ___ dance.", options: ["Brazilian", "Korean", "German", "Turkish"], a: "Brazilian" },
          { q: "Every ___ has a flag.", options: ["country", "pencil", "book", "chair"], a: "country" },
          { q: "Ankara is the ___ of Turkey.", options: ["capital", "country", "flag", "language"], a: "capital" },
          { q: "She speaks three ___.", options: ["languages", "countries", "capitals", "flags"], a: "languages" },
        ],
      },
      {
        id: 3,
        title: "Cartoon Characters",
        emoji: "🎭",
        vocab: [
          { en: "brave", tr: "cesur" },
          { en: "funny", tr: "komik" },
          { en: "clever", tr: "akıllı" },
          { en: "kind", tr: "nazik" },
          { en: "strong", tr: "güçlü" },
          { en: "fast", tr: "hızlı" },
          { en: "slow", tr: "yavaş" },
          { en: "tall", tr: "uzun" },
          { en: "short", tr: "kısa" },
          { en: "lazy", tr: "tembel" },
          { en: "scary", tr: "korkutucu" },
          { en: "friendly", tr: "cana yakın" },
          { en: "naughty", tr: "yaramaz" },
          { en: "cute", tr: "sevimli" },
          { en: "angry", tr: "kızgın" },
          { en: "helpful", tr: "yardımsever" },
        ],
        sentences: [
          { q: "Superman is very ___.", options: ["strong", "slow", "sad", "lazy"], a: "strong" },
          { q: "A tortoise is ___.", options: ["fast", "slow", "tall", "angry"], a: "slow" },
          { q: "Mickey Mouse is ___.", options: ["funny", "angry", "sad", "scary"], a: "funny" },
          { q: "A lion is ___.", options: ["kind", "brave", "slow", "lazy"], a: "brave" },
          { q: "A rabbit is ___. It runs a lot.", options: ["slow", "fast", "lazy", "tall"], a: "fast" },
          { q: "The dragon looks ___.", options: ["cute", "scary", "short", "lazy"], a: "scary" },
          { q: "Tom is always ___ in the cartoon.", options: ["angry", "slow", "tall", "short"], a: "angry" },
          { q: "She is very ___. She helps everyone.", options: ["lazy", "naughty", "helpful", "scary"], a: "helpful" },
        ],
      },
      {
        id: 4,
        title: "Free Time",
        emoji: "⚽",
        vocab: [
          { en: "play football", tr: "futbol oynamak" },
          { en: "ride a bike", tr: "bisiklet sürmek" },
          { en: "watch TV", tr: "TV izlemek" },
          { en: "read a book", tr: "kitap okumak" },
          { en: "play games", tr: "oyun oynamak" },
          { en: "listen to music", tr: "müzik dinlemek" },
          { en: "dance", tr: "dans etmek" },
          { en: "sing", tr: "şarkı söylemek" },
          { en: "draw pictures", tr: "resim çizmek" },
          { en: "swim", tr: "yüzmek" },
          { en: "climb trees", tr: "ağaca tırmanmak" },
          { en: "skip rope", tr: "ip atlamak" },
          { en: "fly a kite", tr: "uçurtma uçurmak" },
          { en: "play chess", tr: "satranç oynamak" },
          { en: "collect stamps", tr: "pul biriktirmek" },
          { en: "go fishing", tr: "balığa gitmek" },
        ],
        sentences: [
          { q: "I ___ football with my friends.", options: ["play", "eat", "read", "sleep"], a: "play" },
          { q: "She ___ to music every day.", options: ["listens", "dances", "sings", "draws"], a: "listens" },
          { q: "We ___ TV in the evening.", options: ["watch", "ride", "read", "swim"], a: "watch" },
          { q: "They ___ a bike in the park.", options: ["play", "ride", "sing", "fly"], a: "ride" },
          { q: "I like to ___ pictures.", options: ["draw", "sing", "swim", "eat"], a: "draw" },
          { q: "On windy days, we ___ a kite.", options: ["fly", "ride", "swim", "skip"], a: "fly" },
          { q: "He can ___ very well in the pool.", options: ["swim", "fly", "climb", "skip"], a: "swim" },
          { q: "My grandfather likes to ___ chess.", options: ["play", "ride", "draw", "skip"], a: "play" },
        ],
      },
      {
        id: 5,
        title: "My Day",
        emoji: "🌞",
        vocab: [
          { en: "wake up", tr: "uyanmak" },
          { en: "have breakfast", tr: "kahvaltı yapmak" },
          { en: "go to school", tr: "okula gitmek" },
          { en: "have lunch", tr: "öğle yemeği yemek" },
          { en: "do homework", tr: "ödev yapmak" },
          { en: "have dinner", tr: "akşam yemeği yemek" },
          { en: "go to bed", tr: "yatmak" },
          { en: "brush teeth", tr: "diş fırçalamak" },
          { en: "get dressed", tr: "giyinmek" },
          { en: "take a shower", tr: "duş almak" },
          { en: "catch the bus", tr: "otobüse yetişmek" },
          { en: "pack bag", tr: "çantayı hazırlamak" },
          { en: "arrive", tr: "varmak" },
          { en: "always", tr: "her zaman" },
          { en: "sometimes", tr: "bazen" },
          { en: "never", tr: "asla" },
        ],
        sentences: [
          { q: "I ___ up at 7 o'clock.", options: ["wake", "go", "have", "take"], a: "wake" },
          { q: "We ___ breakfast at 8.", options: ["go", "have", "wake", "pack"], a: "have" },
          { q: "She ___ her homework after school.", options: ["does", "goes", "eats", "takes"], a: "does" },
          { q: "I ___ my teeth before bed.", options: ["wash", "brush", "eat", "pack"], a: "brush" },
          { q: "First, I ___ dressed.", options: ["get", "go", "have", "catch"], a: "get" },
          { q: "I ___ a shower every morning.", options: ["take", "make", "do", "catch"], a: "take" },
          { q: "I ___ never late for school.", options: ["am", "is", "are", "do"], a: "am" },
          { q: "She ___ arrives on time.", options: ["always", "never", "sometimes", "arrive"], a: "always" },
        ],
      },
      {
        id: 6,
        title: "Fun with Science",
        emoji: "🔬",
        vocab: [
          { en: "experiment", tr: "deney" },
          { en: "magnet", tr: "mıknatıs" },
          { en: "water", tr: "su" },
          { en: "float", tr: "yüzmek (suda)" },
          { en: "sink", tr: "batmak" },
          { en: "light", tr: "hafif / ışık" },
          { en: "heavy", tr: "ağır" },
          { en: "mix", tr: "karıştırmak" },
          { en: "temperature", tr: "sıcaklık" },
          { en: "measure", tr: "ölçmek" },
          { en: "observe", tr: "gözlemlemek" },
          { en: "result", tr: "sonuç" },
          { en: "liquid", tr: "sıvı" },
          { en: "solid", tr: "katı" },
          { en: "freeze", tr: "donmak" },
          { en: "melt", tr: "erimek" },
        ],
        sentences: [
          { q: "A stone is ___. It sinks.", options: ["light", "heavy", "small", "liquid"], a: "heavy" },
          { q: "A leaf can ___ on water.", options: ["sink", "float", "eat", "melt"], a: "float" },
          { q: "A ___ can pull metal.", options: ["magnet", "book", "pencil", "liquid"], a: "magnet" },
          { q: "We do an ___ in science class.", options: ["experiment", "apple", "exam", "result"], a: "experiment" },
          { q: "Ice cream will ___ in the sun.", options: ["melt", "freeze", "float", "sink"], a: "melt" },
          { q: "Water can ___ and become ice.", options: ["freeze", "melt", "float", "mix"], a: "freeze" },
          { q: "We ___ the temperature with a thermometer.", options: ["measure", "mix", "melt", "observe"], a: "measure" },
          { q: "The ___ of the experiment was surprising.", options: ["result", "magnet", "liquid", "water"], a: "result" },
        ],
      },
      {
        id: 7,
        title: "Jobs",
        emoji: "👩‍⚕️",
        vocab: [
          { en: "doctor", tr: "doktor" },
          { en: "teacher", tr: "öğretmen" },
          { en: "nurse", tr: "hemşire" },
          { en: "police officer", tr: "polis" },
          { en: "firefighter", tr: "itfaiyeci" },
          { en: "farmer", tr: "çiftçi" },
          { en: "cook", tr: "aşçı" },
          { en: "driver", tr: "şoför" },
          { en: "dentist", tr: "diş doktoru" },
          { en: "pilot", tr: "pilot" },
          { en: "mechanic", tr: "tamirci" },
          { en: "vet", tr: "veteriner" },
          { en: "engineer", tr: "mühendis" },
          { en: "architect", tr: "mimar" },
          { en: "barber", tr: "berber" },
          { en: "tailor", tr: "terzi" },
        ],
        sentences: [
          { q: "A ___ helps sick people.", options: ["doctor", "farmer", "driver", "tailor"], a: "doctor" },
          { q: "A ___ teaches students.", options: ["cook", "teacher", "nurse", "pilot"], a: "teacher" },
          { q: "A ___ puts out fires.", options: ["firefighter", "driver", "doctor", "barber"], a: "firefighter" },
          { q: "A ___ drives a bus or taxi.", options: ["farmer", "cook", "driver", "vet"], a: "driver" },
          { q: "A ___ takes care of sick animals.", options: ["vet", "dentist", "pilot", "barber"], a: "vet" },
          { q: "A ___ flies airplanes.", options: ["mechanic", "pilot", "engineer", "cook"], a: "pilot" },
          { q: "A ___ fixes cars.", options: ["mechanic", "architect", "tailor", "farmer"], a: "mechanic" },
          { q: "A ___ designs buildings.", options: ["architect", "barber", "dentist", "nurse"], a: "architect" },
        ],
      },
      {
        id: 8,
        title: "My Clothes",
        emoji: "👕",
        vocab: [
          { en: "t-shirt", tr: "tişört" },
          { en: "trousers", tr: "pantolon" },
          { en: "skirt", tr: "etek" },
          { en: "dress", tr: "elbise" },
          { en: "shoes", tr: "ayakkabı" },
          { en: "hat", tr: "şapka" },
          { en: "coat", tr: "palto" },
          { en: "socks", tr: "çorap" },
          { en: "boots", tr: "bot / çizme" },
          { en: "scarf", tr: "atkı" },
          { en: "gloves", tr: "eldiven" },
          { en: "jacket", tr: "ceket" },
          { en: "uniform", tr: "üniforma" },
          { en: "pyjamas", tr: "pijama" },
          { en: "sweater", tr: "kazak" },
          { en: "shorts", tr: "şort" },
        ],
        sentences: [
          { q: "It's cold! Wear your ___.", options: ["t-shirt", "coat", "shorts", "dress"], a: "coat" },
          { q: "I wear ___ on my feet.", options: ["shoes", "hat", "dress", "gloves"], a: "shoes" },
          { q: "She wears a pink ___ to the party.", options: ["socks", "dress", "shoes", "scarf"], a: "dress" },
          { q: "Put a ___ on your head in the sun.", options: ["hat", "shoe", "sock", "glove"], a: "hat" },
          { q: "In winter, I wear ___ on my hands.", options: ["gloves", "boots", "shorts", "hat"], a: "gloves" },
          { q: "It's snowing! Put on your ___.", options: ["boots", "shorts", "t-shirt", "dress"], a: "boots" },
          { q: "We wear a ___ at school.", options: ["uniform", "pyjamas", "scarf", "boots"], a: "uniform" },
          { q: "I wear ___ when I go to sleep.", options: ["pyjamas", "uniform", "jacket", "boots"], a: "pyjamas" },
        ],
      },
    ],
  },
  grade8: {
    name: "8. Sınıf",
    color: "#4ECDC4",
    accent: "#E0F7F5",
    units: [
      {
        id: 1,
        title: "Friendship",
        emoji: "🤝",
        vocab: [
          { en: "honest", tr: "dürüst" },
          { en: "loyal", tr: "sadık" },
          { en: "trust", tr: "güven(mek)" },
          { en: "share", tr: "paylaşmak" },
          { en: "support", tr: "desteklemek" },
          { en: "argue", tr: "tartışmak" },
          { en: "apologize", tr: "özür dilemek" },
          { en: "forgive", tr: "affetmek" },
        ],
        sentences: [
          { q: "A good friend is ___ and never lies.", options: ["honest", "rude", "lazy"], a: "honest" },
          { q: "I ___ my secrets with my best friend.", options: ["argue", "share", "forgive"], a: "share" },
          { q: "You should ___ when you make a mistake.", options: ["apologize", "support", "trust"], a: "apologize" },
          { q: "Friends ___ each other in hard times.", options: ["argue", "support", "forget"], a: "support" },
        ],
      },
      {
        id: 2,
        title: "Teen Life",
        emoji: "📱",
        vocab: [
          { en: "hang out", tr: "takılmak" },
          { en: "chat online", tr: "çevrimiçi sohbet etmek" },
          { en: "play video games", tr: "video oyunu oynamak" },
          { en: "do sports", tr: "spor yapmak" },
          { en: "go shopping", tr: "alışverişe gitmek" },
          { en: "text messages", tr: "mesajlaşmak" },
          { en: "social media", tr: "sosyal medya" },
          { en: "responsibility", tr: "sorumluluk" },
        ],
        sentences: [
          { q: "Teenagers often ___ with friends at the mall.", options: ["hang out", "sleep", "cook"], a: "hang out" },
          { q: "Using ___ too much can be bad for sleep.", options: ["social media", "books", "water"], a: "social media" },
          { q: "I ___ messages to my friends every day.", options: ["text", "cook", "drive"], a: "text" },
          { q: "Helping at home is a big ___.", options: ["game", "responsibility", "holiday"], a: "responsibility" },
        ],
      },
      {
        id: 3,
        title: "In the Kitchen",
        emoji: "🍳",
        vocab: [
          { en: "recipe", tr: "tarif" },
          { en: "ingredients", tr: "malzemeler" },
          { en: "boil", tr: "kaynatmak" },
          { en: "fry", tr: "kızartmak" },
          { en: "bake", tr: "fırında pişirmek" },
          { en: "chop", tr: "doğramak" },
          { en: "mix", tr: "karıştırmak" },
          { en: "pour", tr: "dökmek" },
        ],
        sentences: [
          { q: "First, read the ___ carefully.", options: ["recipe", "oven", "plate"], a: "recipe" },
          { q: "___ the onions into small pieces.", options: ["Boil", "Chop", "Pour"], a: "Chop" },
          { q: "You can ___ a cake in the oven.", options: ["bake", "fry", "boil"], a: "bake" },
          { q: "___ the water into the pot.", options: ["Chop", "Pour", "Mix"], a: "Pour" },
        ],
      },
      {
        id: 4,
        title: "On the Phone",
        emoji: "☎️",
        vocab: [
          { en: "call", tr: "aramak" },
          { en: "hang up", tr: "telefonu kapatmak" },
          { en: "leave a message", tr: "mesaj bırakmak" },
          { en: "hold on", tr: "beklemek (telefonda)" },
          { en: "busy", tr: "meşgul" },
          { en: "appointment", tr: "randevu" },
          { en: "reservation", tr: "rezervasyon" },
          { en: "speak louder", tr: "daha yüksek sesle konuşmak" },
        ],
        sentences: [
          { q: "Can you ___ on for a moment, please?", options: ["hold", "hang", "call"], a: "hold" },
          { q: "I'd like to make a ___ at the restaurant.", options: ["reservation", "phone", "recipe"], a: "reservation" },
          { q: "She's ___ now. Please call later.", options: ["busy", "funny", "tall"], a: "busy" },
          { q: "Can you ___ louder? I can't hear you.", options: ["speak", "hang", "leave"], a: "speak" },
        ],
      },
      {
        id: 5,
        title: "The Internet",
        emoji: "💻",
        vocab: [
          { en: "download", tr: "indirmek" },
          { en: "upload", tr: "yüklemek" },
          { en: "browse", tr: "gezinmek" },
          { en: "password", tr: "şifre" },
          { en: "website", tr: "web sitesi" },
          { en: "search engine", tr: "arama motoru" },
          { en: "username", tr: "kullanıcı adı" },
          { en: "virus", tr: "virüs" },
        ],
        sentences: [
          { q: "Never share your ___ with anyone.", options: ["password", "name", "hat"], a: "password" },
          { q: "Google is a popular ___.", options: ["virus", "search engine", "password"], a: "search engine" },
          { q: "I want to ___ this song to my phone.", options: ["download", "browse", "chop"], a: "download" },
          { q: "Be careful! That file may have a ___.", options: ["virus", "recipe", "friend"], a: "virus" },
        ],
      },
      {
        id: 6,
        title: "Adventures",
        emoji: "🧗",
        vocab: [
          { en: "brave", tr: "cesur" },
          { en: "explore", tr: "keşfetmek" },
          { en: "climb", tr: "tırmanmak" },
          { en: "dangerous", tr: "tehlikeli" },
          { en: "exciting", tr: "heyecan verici" },
          { en: "journey", tr: "yolculuk" },
          { en: "discover", tr: "keşfetmek" },
          { en: "survive", tr: "hayatta kalmak" },
        ],
        sentences: [
          { q: "They ___ the mountain last summer.", options: ["climbed", "ate", "cooked"], a: "climbed" },
          { q: "A long ___ across the ocean is tiring.", options: ["journey", "password", "recipe"], a: "journey" },
          { q: "Skydiving is ___ but fun.", options: ["dangerous", "boring", "tiny"], a: "dangerous" },
          { q: "Columbus ___ America in 1492.", options: ["discovered", "cooked", "called"], a: "discovered" },
        ],
      },
      {
        id: 7,
        title: "Tourism",
        emoji: "✈️",
        vocab: [
          { en: "tourist", tr: "turist" },
          { en: "landmark", tr: "tarihi/önemli yer" },
          { en: "souvenir", tr: "hediyelik eşya" },
          { en: "passport", tr: "pasaport" },
          { en: "luggage", tr: "bavul" },
          { en: "sightseeing", tr: "gezip görme" },
          { en: "accommodation", tr: "konaklama" },
          { en: "destination", tr: "varış noktası" },
        ],
        sentences: [
          { q: "You need a ___ to travel abroad.", options: ["passport", "recipe", "virus"], a: "passport" },
          { q: "We bought a ___ to remember our trip.", options: ["souvenir", "luggage", "journey"], a: "souvenir" },
          { q: "Paris is a popular ___ for tourists.", options: ["destination", "password", "teacher"], a: "destination" },
          { q: "The Eiffel Tower is a famous ___.", options: ["landmark", "ingredient", "virus"], a: "landmark" },
        ],
      },
      {
        id: 8,
        title: "Chores",
        emoji: "🧹",
        vocab: [
          { en: "do the dishes", tr: "bulaşık yıkamak" },
          { en: "take out the trash", tr: "çöpü çıkarmak" },
          { en: "vacuum", tr: "elektrik süpürgesiyle süpürmek" },
          { en: "make the bed", tr: "yatağı yapmak" },
          { en: "do the laundry", tr: "çamaşır yıkamak" },
          { en: "iron", tr: "ütülemek" },
          { en: "sweep the floor", tr: "yeri süpürmek" },
          { en: "water the plants", tr: "bitkileri sulamak" },
        ],
        sentences: [
          { q: "I ___ the bed every morning.", options: ["make", "eat", "call"], a: "make" },
          { q: "Please ___ out the trash tonight.", options: ["take", "download", "climb"], a: "take" },
          { q: "Mom ___ the laundry on Sundays.", options: ["does", "eats", "calls"], a: "does" },
          { q: "He ___ the plants twice a week.", options: ["waters", "fries", "climbs"], a: "waters" },
        ],
      },
    ],
  },
};

// ============ SES (Telaffuz) ============
const speak = (text) => {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) { /* sessizce geç */ }
};

// ============ STORAGE HELPERS ============
const getScore = async (studentId) => {
  try {
    const res = await window.storage.get(`scores:${studentId}`);
    return res ? JSON.parse(res.value) : { total: 0, best: {}, streak: 0 };
  } catch {
    return { total: 0, best: {}, streak: 0 };
  }
};

const saveScore = async (studentId, data) => {
  try {
    await window.storage.set(`scores:${studentId}`, JSON.stringify(data));
  } catch (e) { console.error(e); }
};

// ============ ANA UYGULAMA ============
export default function App() {
  const [screen, setScreen] = useState("home"); // home, units, games, play, result
  const [student, setStudent] = useState(null); // grade4 | grade8
  const [unit, setUnit] = useState(null);
  const [game, setGame] = useState(null); // memory, quiz, fill
  const [lastResult, setLastResult] = useState(null);
  const [scores, setScores] = useState({ grade4: { total: 0, best: {}, streak: 0 }, grade8: { total: 0, best: {}, streak: 0 } });

  useEffect(() => {
    (async () => {
      const g4 = await getScore("grade4");
      const g8 = await getScore("grade8");
      setScores({ grade4: g4, grade8: g8 });
    })();
  }, []);

  const handleGameEnd = async (points, correct, total, wrongList = []) => {
    const key = `${unit.id}-${game}`;
    const current = scores[student];
    const newBest = { ...current.best, [key]: Math.max(current.best[key] || 0, points) };
    const newTotal = current.total + points;
    const updated = { total: newTotal, best: newBest, streak: correct === total ? current.streak + 1 : 0 };
    const newScores = { ...scores, [student]: updated };
    setScores(newScores);
    await saveScore(student, updated);
    setLastResult({ points, correct, total, wrongList });
    setScreen("result");
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #FFF8F0; }
        .display-font { font-family: 'Fredoka', sans-serif; font-weight: 700; letter-spacing: -0.02em; }
        @keyframes bounce-in { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes confetti { 0% { transform: translateY(-100vh) rotate(0); } 100% { transform: translateY(100vh) rotate(720deg); } }
        .bounce-in { animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
        .wiggle-hover:hover { animation: wiggle 0.4s ease-in-out; }
        .float-anim { animation: float 3s ease-in-out infinite; }
        .shake { animation: shake 0.4s; }
        .slide-up { animation: slide-up 0.4s ease-out; }
        .grid-bg {
          background-image: radial-gradient(circle, #00000010 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .confetti-piece { position: fixed; width: 10px; height: 10px; top: -10px; animation: confetti 3s linear forwards; pointer-events: none; z-index: 1000; }
      `}</style>

      {screen === "home" && <HomeScreen onPick={(s) => { setStudent(s); setScreen("units"); }} scores={scores} />}
      {screen === "units" && <UnitsScreen student={student} onBack={() => setScreen("home")} onPick={(u) => { setUnit(u); setScreen("games"); }} scores={scores[student]} />}
      {screen === "games" && <GamesScreen student={student} unit={unit} onBack={() => setScreen("units")} onPick={(g) => { setGame(g); setScreen("play"); }} />}
      {screen === "play" && <PlayScreen student={student} unit={unit} game={game} onEnd={handleGameEnd} onQuit={() => setScreen("games")} />}
      {screen === "result" && <ResultScreen result={lastResult} onAgain={() => setScreen("play")} onMenu={() => setScreen("games")} student={student} />}
    </div>
  );
}

// ============ ANA EKRAN ============
function HomeScreen({ onPick, scores }) {
  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl float-anim opacity-20">⭐</div>
      <div className="absolute bottom-20 right-10 text-7xl float-anim opacity-20" style={{ animationDelay: "0.5s" }}>🎮</div>
      <div className="absolute top-32 right-20 text-5xl float-anim opacity-20" style={{ animationDelay: "1s" }}>🏆</div>
      <div className="absolute bottom-40 left-20 text-6xl float-anim opacity-20" style={{ animationDelay: "1.5s" }}>✨</div>

      <div className="text-center mb-8 sm:mb-12 slide-up">
        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
          English Learning Arena
        </div>
        <h1 className="display-font text-5xl sm:text-7xl md:text-8xl mb-3" style={{ color: "#2D3047", lineHeight: 1 }}>
          Word<span style={{ color: "#FF6B9D" }}>Quest</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
          Hazır mısın? Kelimelerini test et, puanları topla, şampiyon ol! 🎯
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
        <StudentCard
          title="4. Sınıf"
          emoji="🌈"
          color="#FF6B9D"
          bgColor="#FFE5EF"
          score={scores.grade4.total}
          streak={scores.grade4.streak}
          onClick={() => onPick("grade4")}
        />
        <StudentCard
          title="8. Sınıf"
          emoji="🚀"
          color="#4ECDC4"
          bgColor="#E0F7F5"
          score={scores.grade8.total}
          streak={scores.grade8.streak}
          onClick={() => onPick("grade8")}
        />
      </div>

    </div>
  );
}

function StudentCard({ title, emoji, color, bgColor, score, streak, onClick }) {
  return (
    <button
      onClick={onClick}
      className="wiggle-hover bounce-in relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left transition-transform hover:scale-105 active:scale-95 shadow-lg"
      style={{ background: bgColor, border: `3px solid ${color}` }}
    >
      <div className="text-5xl sm:text-6xl mb-3">{emoji}</div>
      <h2 className="display-font text-2xl sm:text-3xl mb-1" style={{ color }}>{title}</h2>
      <p className="text-sm text-gray-600 mb-4">Başlamaya hazır mısın?</p>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1 font-bold" style={{ color }}>
          <Star size={16} fill={color} /> {score} puan
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 font-bold text-orange-500">
            <Flame size={16} fill="#F97316" /> {streak}
          </div>
        )}
      </div>
      <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full" style={{ background: color, color: "white" }}>
        PLAY →
      </div>
    </button>
  );
}

// ============ ÜNİTE EKRANI ============
function UnitsScreen({ student, onBack, onPick, scores }) {
  const data = CURRICULUM[student];
  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ background: data.accent }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 font-bold text-gray-700 hover:text-gray-900">
          <ArrowLeft size={20} /> Geri
        </button>
        <div className="mb-8 slide-up">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-3" style={{ background: data.color }}>
            {data.name}
          </div>
          <h1 className="display-font text-4xl sm:text-5xl mb-2" style={{ color: "#2D3047" }}>
            Bir ünite seç
          </h1>
          <p className="text-gray-600">Her ünitede 3 farklı oyun seni bekliyor 🎮</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {data.units.map((u, idx) => {
            const unitScore = Object.entries(scores.best).filter(([k]) => k.startsWith(`${u.id}-`)).reduce((a, [, v]) => a + v, 0);
            return (
              <button
                key={u.id}
                onClick={() => onPick(u)}
                className="wiggle-hover slide-up bg-white rounded-2xl p-4 sm:p-5 text-left shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-gray-200"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="text-4xl sm:text-5xl mb-2">{u.emoji}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ünite {u.id}</div>
                <div className="display-font text-base sm:text-lg leading-tight mb-2" style={{ color: "#2D3047" }}>{u.title}</div>
                {unitScore > 0 && (
                  <div className="flex items-center gap-1 text-xs font-bold" style={{ color: data.color }}>
                    <Star size={12} fill={data.color} /> {unitScore}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ OYUN SEÇME EKRANI ============
function GamesScreen({ student, unit, onBack, onPick }) {
  const data = CURRICULUM[student];
  const games = [
    { id: "memory", title: "Hafıza Eşleştirme", desc: "Kelime ve anlamını eşleştir", emoji: "🧠", color: "#A78BFA", time: "75 sn" },
    { id: "quiz", title: "Hızlı Quiz", desc: "İngilizce → Türkçe çevir", emoji: "⚡", color: "#FBBF24", time: "Süresiz" },
    { id: "fill", title: "Boşluk Doldur", desc: "Cümleyi tamamla", emoji: "✏️", color: "#F472B6", time: "Süresiz" },
    { id: "anagram", title: "Harf Dizme", desc: "Karışık harfleri düzelt", emoji: "🔤", color: "#60A5FA", time: "Süresiz" },
    { id: "hunt", title: "Kelime Avı", desc: "Türkçeden İngilizceyi yaz", emoji: "🎯", color: "#34D399", time: "Süresiz" },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8" style={{ background: data.accent }}>
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 font-bold text-gray-700 hover:text-gray-900">
          <ArrowLeft size={20} /> Üniteler
        </button>

        <div className="mb-8 slide-up">
          <div className="text-6xl mb-3">{unit.emoji}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Ünite {unit.id}</div>
          <h1 className="display-font text-4xl sm:text-5xl" style={{ color: "#2D3047" }}>{unit.title}</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {games.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => onPick(g.id)}
              className="wiggle-hover slide-up bg-white rounded-2xl p-6 text-left shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              style={{ borderTop: `6px solid ${g.color}`, animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-5xl mb-3">{g.emoji}</div>
              <h3 className="display-font text-xl mb-1" style={{ color: "#2D3047" }}>{g.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{g.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                <Clock size={12} /> {g.time}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ OYUN EKRANI ============
function PlayScreen({ student, unit, game, onEnd, onQuit }) {
  if (game === "memory") return <MemoryGame student={student} unit={unit} onEnd={onEnd} onQuit={onQuit} />;
  if (game === "quiz") return <QuizGame student={student} unit={unit} onEnd={onEnd} onQuit={onQuit} />;
  if (game === "fill") return <FillGame student={student} unit={unit} onEnd={onEnd} onQuit={onQuit} />;
  if (game === "anagram") return <AnagramGame student={student} unit={unit} onEnd={onEnd} onQuit={onQuit} />;
  if (game === "hunt") return <HuntGame student={student} unit={unit} onEnd={onEnd} onQuit={onQuit} />;
  return null;
}

// ============ HAFIZA OYUNU ============
function MemoryGame({ student, unit, onEnd, onQuit }) {
  const color = CURRICULUM[student].color;
  const pairs = unit.vocab.slice(0, 8);
  const [cards, setCards] = useState(() => {
    const deck = [];
    pairs.forEach((p, i) => {
      deck.push({ id: `${i}-en`, pair: i, text: p.en, type: "en" });
      deck.push({ id: `${i}-tr`, pair: i, text: p.tr, type: "tr" });
    });
    return deck.sort(() => Math.random() - 0.5);
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);
  const [timeLeft, setTimeLeft] = useState(75);
  const endedRef = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0 || endedRef.current) return;
    const t = setInterval(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && !endedRef.current) {
      endedRef.current = true;
      const correct = matched.length / 2;
      const points = correct * 10;
      setTimeout(() => onEnd(points, correct, pairs.length, []), 600);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (matched.length === cards.length && !endedRef.current) {
      endedRef.current = true;
      const timeBonus = timeLeft * 2;
      const points = pairs.length * 10 + timeBonus;
      setTimeout(() => onEnd(points, pairs.length, pairs.length, []), 800);
    }
  }, [matched]);

  useEffect(() => {
    if (flipped.length === 2) {
      setTries((t) => t + 1);
      const [a, b] = flipped;
      const ca = cards.find((c) => c.id === a);
      const cb = cards.find((c) => c.id === b);
      if (ca.pair === cb.pair) {
        const enCard = ca.type === "en" ? ca : cb;
        speak(enCard.text);
        setMatched((m) => [...m, a, b]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped]);

  const handleClick = (id) => {
    if (flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;
    setFlipped([...flipped, id]);
  };

  return (
    <div className="min-h-screen p-4" style={{ background: CURRICULUM[student].accent }}>
      <div className="max-w-2xl mx-auto">
        <GameHeader title={unit.title} subtitle="🧠 Hafıza Eşleştirme" timeLeft={timeLeft} onQuit={onQuit} color={color} maxTime={75} />

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((c) => {
            const isFlipped = flipped.includes(c.id) || matched.includes(c.id);
            const isMatched = matched.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleClick(c.id)}
                disabled={isMatched}
                className="aspect-[3/4] rounded-xl font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg"
                style={{
                  background: isMatched ? "#D1FAE5" : isFlipped ? "white" : color,
                  color: isMatched ? "#065F46" : isFlipped ? "#2D3047" : "transparent",
                  transform: isFlipped ? "scale(1)" : "scale(1)",
                  border: isMatched ? "3px solid #10B981" : "3px solid transparent",
                }}
              >
                {isFlipped ? c.text : "?"}
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Denemeler: <span className="font-bold">{tries}</span> · Eşleşen: <span className="font-bold">{matched.length / 2}/{pairs.length}</span>
        </div>
      </div>
    </div>
  );
}

// ============ QUIZ OYUNU ============
function QuizGame({ student, unit, onEnd, onQuit }) {
  const color = CURRICULUM[student].color;
  const questions = useRef(
    [...unit.vocab]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((v, i, arr) => {
        const wrong = arr.filter((_, j) => j !== i).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.tr);
        const options = [...wrong, v.tr].sort(() => Math.random() - 0.5);
        return { q: v.en, options, a: v.tr };
      })
  ).current;

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shake, setShake] = useState(false);
  const [wrongList, setWrongList] = useState([]);
  const endedRef = useRef(false);

  useEffect(() => {
    setSelected(null);
    // Yeni soru gelince İngilizce kelimeyi oku
    if (!endedRef.current) speak(questions[idx].q);
  }, [idx]);

  const handleAnswer = (opt) => {
    if (selected !== null || endedRef.current) return;
    const q = questions[idx];
    setSelected(opt);
    const isCorrect = opt === q.a;
    let newWrongList = wrongList;
    if (isCorrect) {
      const points = 10;
      setScore((s) => s + points);
      setCorrect((c) => c + 1);
    } else {
      newWrongList = [...wrongList, { en: q.q, tr: q.a }];
      setWrongList(newWrongList);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        endedRef.current = true;
        onEnd(score + (isCorrect ? 10 : 0), correct + (isCorrect ? 1 : 0), questions.length, newWrongList);
      } else {
        setIdx((i) => i + 1);
      }
    }, 1100);
  };

  const q = questions[idx];
  const progress = ((idx) / questions.length) * 100;

  return (
    <div className="min-h-screen p-4" style={{ background: CURRICULUM[student].accent }}>
      <div className="max-w-xl mx-auto">
        <GameHeader title={unit.title} subtitle={`⚡ Quiz · Soru ${idx + 1}/${questions.length}`} onQuit={onQuit} color={color} />

        <div className="h-2 bg-white rounded-full mb-6 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
        </div>

        <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-lg mb-4 ${shake ? "shake" : "slide-up"}`} key={idx}>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Türkçesi nedir?</div>
          <div className="display-font text-4xl sm:text-5xl text-center py-6 flex items-center justify-center gap-3" style={{ color: "#2D3047" }}>
            {q.q}
            <button
              onClick={() => speak(q.q)}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              aria-label="Dinle"
            >
              <Volume2 size={20} style={{ color }} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.options.map((opt) => {
            const isSel = selected === opt;
            const isRight = selected !== null && opt === q.a;
            const isWrong = isSel && opt !== q.a;
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                className="rounded-2xl p-4 font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed"
                style={{
                  background: isRight ? "#10B981" : isWrong ? "#EF4444" : "white",
                  color: isRight || isWrong ? "white" : "#2D3047",
                  border: `3px solid ${isRight ? "#10B981" : isWrong ? "#EF4444" : "transparent"}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {isRight && <Check size={20} />}
                  {isWrong && <X size={20} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Star size={16} className="text-amber-500" fill="#F59E0B" />
            <span className="font-bold">{score} puan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BOŞLUK DOLDURMA OYUNU ============
function FillGame({ student, unit, onEnd, onQuit }) {
  const color = CURRICULUM[student].color;
  const questions = useRef([...unit.sentences].sort(() => Math.random() - 0.5)).current;

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shake, setShake] = useState(false);
  const [wrongList, setWrongList] = useState([]);
  const endedRef = useRef(false);

  useEffect(() => {
    setSelected(null);
  }, [idx]);

  const handleAnswer = (opt) => {
    if (selected !== null || endedRef.current) return;
    const q = questions[idx];
    setSelected(opt);
    const isCorrect = opt === q.a;
    let newWrongList = wrongList;
    if (isCorrect) {
      const points = 15;
      setScore((s) => s + points);
      setCorrect((c) => c + 1);
      speak(q.q.replace("___", q.a));
    } else {
      newWrongList = [...wrongList, { en: q.a, tr: q.q.replace("___", `[${q.a}]`) }];
      setWrongList(newWrongList);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        endedRef.current = true;
        onEnd(score + (isCorrect ? 15 : 0), correct + (isCorrect ? 1 : 0), questions.length, newWrongList);
      } else {
        setIdx((i) => i + 1);
      }
    }, 1100);
  };

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;
  const parts = q.q.split("___");

  return (
    <div className="min-h-screen p-4" style={{ background: CURRICULUM[student].accent }}>
      <div className="max-w-xl mx-auto">
        <GameHeader title={unit.title} subtitle={`✏️ Boşluk Doldur · ${idx + 1}/${questions.length}`} onQuit={onQuit} color={color} />

        <div className="h-2 bg-white rounded-full mb-6 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
        </div>

        <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-lg mb-4 ${shake ? "shake" : "slide-up"}`} key={idx}>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Cümleyi tamamla</div>
          <div className="text-2xl sm:text-3xl text-center py-6 leading-relaxed" style={{ color: "#2D3047" }}>
            {parts[0]}
            <span className="inline-block px-4 py-1 mx-1 rounded-lg border-b-4 font-bold" style={{ background: CURRICULUM[student].accent, borderColor: color, color }}>
              {selected || "___"}
            </span>
            {parts[1]}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {q.options.map((opt) => {
            const isSel = selected === opt;
            const isRight = selected !== null && opt === q.a;
            const isWrong = isSel && opt !== q.a;
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                className="rounded-2xl p-4 font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed"
                style={{
                  background: isRight ? "#10B981" : isWrong ? "#EF4444" : "white",
                  color: isRight || isWrong ? "white" : "#2D3047",
                  border: `3px solid ${isRight ? "#10B981" : isWrong ? "#EF4444" : "transparent"}`,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Star size={16} className="text-amber-500" fill="#F59E0B" />
            <span className="font-bold">{score} puan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ANAGRAM (HARF DİZME) OYUNU ============
function AnagramGame({ student, unit, onEnd, onQuit }) {
  const color = CURRICULUM[student].color;
  const questions = useRef(
    [...unit.vocab]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((v) => {
      // Sadece tek kelimeli olanlar; çok kelimeli ise ilk kelimeyi al
      const word = v.en.split(" ")[0].replace(/[^a-zA-Z]/g, "");
      const shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
      // Eğer karışık hali orjinalle aynıysa tekrar karıştır
      const final = shuffled === word && word.length > 1
        ? word.split("").reverse().join("")
        : shuffled;
      return { word, shuffled: final, hint: v.tr };
    })
  ).current;

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState([]);
  const [available, setAvailable] = useState([]);
  const [result, setResult] = useState(null);
  const [wrongList, setWrongList] = useState([]);
  const endedRef = useRef(false);

  useEffect(() => {
    setPicked([]);
    setAvailable(questions[idx].shuffled.split("").map((l, i) => ({ l, i })));
    setResult(null);
  }, [idx]);

  const pickLetter = (letter) => {
    if (result !== null) return;
    const newPicked = [...picked, letter];
    setPicked(newPicked);
    setAvailable(available.filter((a) => a.i !== letter.i));

    // Kelime tamamlandıysa kontrol et
    if (newPicked.length === questions[idx].word.length) {
      const guess = newPicked.map((p) => p.l).join("").toLowerCase();
      if (guess === questions[idx].word.toLowerCase()) {
        finish(true);
      } else {
        finish(false);
      }
    }
  };

  const undo = () => {
    if (result !== null || picked.length === 0) return;
    const last = picked[picked.length - 1];
    setPicked(picked.slice(0, -1));
    setAvailable([...available, last]);
  };

  const finish = (isCorrect) => {
    if (endedRef.current) return;
    setResult(isCorrect ? "right" : "wrong");
    let newScore = score;
    let newCorrect = correct;
    let newWrongList = wrongList;
    if (isCorrect) {
      const points = 15;
      newScore = score + points;
      newCorrect = correct + 1;
      setScore(newScore);
      setCorrect(newCorrect);
      speak(questions[idx].word);
    } else {
      newWrongList = [...wrongList, { en: questions[idx].word, tr: questions[idx].hint }];
      setWrongList(newWrongList);
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        endedRef.current = true;
        onEnd(newScore, newCorrect, questions.length, newWrongList);
      } else {
        setIdx((i) => i + 1);
      }
    }, 1200);
  };

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;

  return (
    <div className="min-h-screen p-4" style={{ background: CURRICULUM[student].accent }}>
      <div className="max-w-xl mx-auto">
        <GameHeader title={unit.title} subtitle={`🔤 Harf Dizme · ${idx + 1}/${questions.length}`} onQuit={onQuit} color={color} />

        <div className="h-2 bg-white rounded-full mb-6 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
        </div>

        <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-lg mb-4 ${result === "wrong" ? "shake" : "slide-up"}`} key={idx}>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">İpucu</div>
          <div className="display-font text-2xl text-center mb-6" style={{ color: "#2D3047" }}>
            {q.hint}
          </div>

          {/* Picked letters slot */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap min-h-[60px]">
            {Array.from({ length: q.word.length }).map((_, i) => {
              const p = picked[i];
              const isRight = result === "right";
              const isWrong = result === "wrong";
              return (
                <div
                  key={i}
                  className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-b-4 flex items-center justify-center display-font text-2xl sm:text-3xl font-bold transition-all"
                  style={{
                    background: isRight ? "#10B981" : isWrong ? "#FEE2E2" : p ? "white" : "#F3F4F6",
                    color: isRight ? "white" : isWrong ? "#DC2626" : "#2D3047",
                    borderColor: isRight ? "#059669" : isWrong ? "#DC2626" : color,
                  }}
                >
                  {p ? p.l.toUpperCase() : ""}
                </div>
              );
            })}
          </div>

          {/* Available letters */}
          <div className="flex justify-center gap-2 flex-wrap">
            {available.map((a) => (
              <button
                key={a.i}
                onClick={() => pickLetter(a)}
                disabled={result !== null}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all display-font text-xl sm:text-2xl font-bold disabled:opacity-50"
                style={{ background: color, color: "white" }}
              >
                {a.l.toUpperCase()}
              </button>
            ))}
          </div>

          {picked.length > 0 && result === null && (
            <div className="text-center mt-4">
              <button onClick={undo} className="text-sm font-bold text-gray-500 hover:text-gray-700 underline">
                ← Geri al
              </button>
            </div>
          )}

          {result === "wrong" && (
            <div className="text-center mt-4 text-sm font-bold text-gray-600">
              Doğrusu: <span style={{ color }}>{q.word.toUpperCase()}</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Star size={16} className="text-amber-500" fill="#F59E0B" />
            <span className="font-bold">{score} puan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ KELİME AVI (YAZMA) OYUNU ============
function HuntGame({ student, unit, onEnd, onQuit }) {
  const color = CURRICULUM[student].color;
  const questions = useRef(
    unit.vocab.slice(0, 8).map((v) => ({ tr: v.tr, en: v.en }))
      .sort(() => Math.random() - 0.5)
  ).current;

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [wrongList, setWrongList] = useState([]);
  const endedRef = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setInput("");
    setResult(null);
    setHintUsed(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [idx]);

  const submit = () => {
    if (result !== null || endedRef.current) return;
    const q = questions[idx];
    const guess = input.trim().toLowerCase();
    const answer = q.en.toLowerCase();

    let outcome;
    if (guess === answer) outcome = "right";
    else if (guess.length > 0 && levenshtein(guess, answer) <= 1) outcome = "close";
    else outcome = "wrong";

    setResult(outcome);
    let newScore = score;
    let newCorrect = correct;
    let newWrongList = wrongList;
    if (outcome === "right") {
      const base = hintUsed ? 5 : 15;
      newScore = score + base;
      newCorrect = correct + 1;
      setScore(newScore);
      setCorrect(newCorrect);
      speak(q.en);
    } else if (outcome === "close") {
      const points = 3;
      newScore = score + points;
      newCorrect = correct + 1;
      setScore(newScore);
      setCorrect(newCorrect);
      newWrongList = [...wrongList, { en: q.en, tr: q.tr }];
      setWrongList(newWrongList);
      speak(q.en);
    } else {
      newWrongList = [...wrongList, { en: q.en, tr: q.tr }];
      setWrongList(newWrongList);
    }

    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        endedRef.current = true;
        onEnd(newScore, newCorrect, questions.length, newWrongList);
      } else {
        setIdx((i) => i + 1);
      }
    }, 1400);
  };

  const showHint = () => {
    if (hintUsed || result !== null) return;
    setHintUsed(true);
    setInput(questions[idx].en[0]);
    inputRef.current?.focus();
  };

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;

  return (
    <div className="min-h-screen p-4" style={{ background: CURRICULUM[student].accent }}>
      <div className="max-w-xl mx-auto">
        <GameHeader title={unit.title} subtitle={`🎯 Kelime Avı · ${idx + 1}/${questions.length}`} onQuit={onQuit} color={color} />

        <div className="h-2 bg-white rounded-full mb-6 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: color }} />
        </div>

        <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-lg mb-4 ${result === "wrong" ? "shake" : "slide-up"}`} key={idx}>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">İngilizcesini yaz</div>
          <div className="display-font text-3xl sm:text-4xl text-center py-4" style={{ color: "#2D3047" }}>
            {q.tr}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && input.trim() && result === null) submit(); }}
            disabled={result !== null}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Cevabın..."
            className="w-full text-center display-font text-2xl sm:text-3xl py-4 px-4 rounded-2xl border-b-4 outline-none transition-all"
            style={{
              background: result === "right" ? "#D1FAE5" : result === "close" ? "#FEF3C7" : result === "wrong" ? "#FEE2E2" : "#F9FAFB",
              borderColor: result === "right" ? "#10B981" : result === "close" ? "#F59E0B" : result === "wrong" ? "#DC2626" : color,
              color: "#2D3047",
            }}
          />

          {result === null && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={showHint}
                disabled={hintUsed}
                className="flex-1 rounded-xl py-2 text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                💡 İpucu (ilk harf)
              </button>
              <button
                onClick={() => submit()}
                disabled={!input.trim()}
                className="flex-1 rounded-xl py-2 font-bold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: color }}
              >
                Gönder →
              </button>
            </div>
          )}

          {result === "close" && (
            <div className="text-center mt-3 text-sm font-bold text-amber-600">
              Çok yakın! Doğrusu: <span style={{ color: "#2D3047" }}>{q.en}</span>
            </div>
          )}
          {result === "wrong" && (
            <div className="text-center mt-3 text-sm font-bold text-gray-600">
              Doğrusu: <span style={{ color }}>{q.en}</span>
            </div>
          )}
          {result === "right" && (
            <div className="text-center mt-3 text-sm font-bold text-green-600">
              ✓ Harika!
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <Star size={16} className="text-amber-500" fill="#F59E0B" />
            <span className="font-bold">{score} puan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Yazım toleransı için Levenshtein mesafesi
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const m = [];
  for (let i = 0; i <= b.length; i++) m[i] = [i];
  for (let j = 0; j <= a.length; j++) m[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) m[i][j] = m[i - 1][j - 1];
      else m[i][j] = Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
    }
  }
  return m[b.length][a.length];
}

// ============ OYUN BAŞLIĞI (Timer) ============
function GameHeader({ title, subtitle, timeLeft, onQuit, color, maxTime = 60 }) {
  const hasTimer = timeLeft !== undefined && timeLeft !== null;
  const pct = hasTimer ? Math.max(0, (timeLeft / maxTime) * 100) : 0;
  const isLow = hasTimer && timeLeft <= 5;
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onQuit} className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} /> Çık
        </button>
        <div className="text-right">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{subtitle}</div>
          <div className="display-font text-lg" style={{ color: "#2D3047" }}>{title}</div>
        </div>
      </div>
      {hasTimer && (
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${isLow ? "shake" : ""}`}
            style={{ background: isLow ? "#FEE2E2" : "white", color: isLow ? "#DC2626" : color }}>
            <Clock size={16} />
            {timeLeft}s
          </div>
          <div className="flex-1 h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: isLow ? "#DC2626" : color }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ============ SONUÇ EKRANI ============
function ResultScreen({ result, onAgain, onMenu, student }) {
  const color = CURRICULUM[student].color;
  const { points, correct, total, wrongList = [] } = result;
  const pct = (correct / total) * 100;
  const perfect = correct === total;

  const getMessage = () => {
    if (perfect) return { emoji: "🏆", title: "MÜKEMMEL!", sub: "Tüm cevaplar doğru, efsanesin!" };
    if (pct >= 75) return { emoji: "⭐", title: "Harika iş!", sub: "Neredeyse tam puan!" };
    if (pct >= 50) return { emoji: "👍", title: "Fena değil!", sub: "Biraz daha pratik yapalım." };
    return { emoji: "💪", title: "Tekrar dene!", sub: "Her deneme seni geliştirir." };
  };

  const msg = getMessage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: CURRICULUM[student].accent }}>
      {perfect && <Confetti />}
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center bounce-in">
        <div className="text-7xl mb-4">{msg.emoji}</div>
        <h1 className="display-font text-4xl mb-2" style={{ color: "#2D3047" }}>{msg.title}</h1>
        <p className="text-gray-600 mb-6">{msg.sub}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl p-4" style={{ background: CURRICULUM[student].accent }}>
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Doğru</div>
            <div className="display-font text-3xl" style={{ color }}>{correct}/{total}</div>
          </div>
          <div className="rounded-2xl p-4 bg-amber-50">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Puan</div>
            <div className="display-font text-3xl text-amber-600 flex items-center justify-center gap-1">
              <Star size={24} fill="#F59E0B" /> {points}
            </div>
          </div>
        </div>

        {wrongList.length > 0 && (
          <div className="mb-6 text-left rounded-2xl p-4 bg-red-50 border-2 border-red-100">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 text-center">📖 Bunları tekrar çalış</div>
            <div className="space-y-2">
              {wrongList.map((w, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 shadow-sm">
                  <div>
                    <span className="font-bold text-sm" style={{ color: "#2D3047" }}>{w.en}</span>
                    <span className="text-gray-400 mx-2">—</span>
                    <span className="text-sm text-gray-600">{w.tr}</span>
                  </div>
                  <button
                    onClick={() => speak(w.en)}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    aria-label="Dinle"
                  >
                    <Volume2 size={14} style={{ color }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onMenu} className="flex-1 rounded-2xl py-3 font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
            Menü
          </button>
          <button onClick={onAgain} className="flex-1 rounded-2xl py-3 font-bold text-white transition hover:opacity-90" style={{ background: color }}>
            Tekrar Oyna
          </button>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 });
  const colors = ["#FF6B9D", "#4ECDC4", "#FBBF24", "#A78BFA", "#F472B6", "#60A5FA"];
  return (
    <>
      {pieces.map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </>
  );
}