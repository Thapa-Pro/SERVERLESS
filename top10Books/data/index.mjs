export const books = [
  {
    id: 1,
    title: "Pippi Långstrump",
    author: "Astrid Lindgren",
    year: 1945,
    genre: "Children",
  },
  {
    id: 2,
    title: "Mio, min Mio",
    author: "Astrid Lindgren",
    year: 1954,
    genre: "Fantasy",
  },
  {
    id: 3,
    title: "Gösta Berlings saga",
    author: "Selma Lagerlöf",
    year: 1891,
    genre: "Novel",
  },
  {
    id: 4,
    title: "Nils Holgerssons underbara resa genom Sverige",
    author: "Selma Lagerlöf",
    year: 1906,
    genre: "Children",
  },
  {
    id: 5,
    title: "Röda rummet",
    author: "August Strindberg",
    year: 1879,
    genre: "Novel",
  },
  {
    id: 6,
    title: "Doktor Glas",
    author: "Hjalmar Söderberg",
    year: 1905,
    genre: "Novel",
  },
  {
    id: 7,
    title: "Utvandrarna",
    author: "Vilhelm Moberg",
    year: 1949,
    genre: "Historical",
  },
  {
    id: 8,
    title: "Män som hatar kvinnor",
    author: "Stieg Larsson",
    year: 2005,
    genre: "Crime",
  },
  {
    id: 9,
    title: "Gentlemen",
    author: "Klas Östergren",
    year: 1980,
    genre: "Novel",
  },
  {
    id: 10,
    title: "Egenmäktigt förfarande",
    author: "Lena Andersson",
    year: 2013,
    genre: "Novel",
  },
  
];

export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ books }),
  };
  return response;
};
