export const sort = (games, sort) => {
    if (sort === "asc") {
      return games.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "desc") {
      return games.sort((a, b) => b.name.localeCompare(a.name));
    }

    return games
};

// export const setFilterBySearch = (games, input) => {
//   if(!input?.length) {
//     const gamesFilter = games.filter((game) =>
//       game.name.toLowerCase().includes(input?.toLowerCase())
//     );
//     return gamesFilter;
//   } else {
//     return games
//   }
// };

export const ratingFilter = (current, rating) => {
    let items = []
   
    switch (rating) {
      case "1":
        items = current.filter((e) => e.rating_api < 2);
        break;
      case "2":
        items = current.filter((e) => e.rating_api >= 2 && e.rating_api < 3);
        break;
      case "3":
        items = current.filter((e) => e.rating_api >= 3 && e.rating_api < 4);
        break;
      case "4":
        items = current.filter((e) => e.rating_api >= 4 && e.rating_api < 5);
        break;
      case "5":
        items = current.filter((e) => e.rating_api === 5);
        break;
      default:
        return current;
    }
      return items;
  };

  export const priceFilter = (current, price) => {
    let items = []
    switch (price) {
      case 0:
        items = current
        return items;
        
      case 25:
        items = current.filter(
          (e) =>   Number(e.price) >= 0 && Number(e.price) <= 25
        );
        break;
      case 50:
        items = current.filter((e) =>  Number(e.price) >= 25 && Number(e.price) <= 50
        );
        break;
      case 75:
        items = current.filter((e) =>  Number(e.price) >= 50 && Number(e.price) <= 75
        );
      break;
      case 100:
        items = current.filter((e) =>  Number(e.price) >= 75 && Number(e.price) <= 100
        );
        break;
      default:
        return current;
    }
  
    return items;
  };

  export const genreFilter = (current, genre) => {
    let items = []
    if(genre !== 'none') {
          items = current.filter(game => {
            return game.genres.some(obj => {
              return obj.name === genre
            })
          })
      } else {
          return current
      }
    return items;
  };