const setGenreIcons = (genres) => {
    let genreIcons = []
        genres.forEach(genre => {
          switch (genre.name) {
            case 'Acción':
              genreIcons = [{...genre, icon: 'fa-fighter-jet'}, ...genreIcons]
              break;

            case 'Aventura':
              genreIcons = [{...genre, icon: 'fa-compass'}, ...genreIcons]
              break;

            case 'Animación':
              genreIcons = [{...genre, icon: 'fa-film'}, ...genreIcons]
              break;

            case 'Comedia':
              genreIcons = [{...genre, icon: 'fa-grin-squint'}, ...genreIcons]
              break;

            case 'Crimen':
              genreIcons = [{...genre, icon: 'fa-user-secret'}, ...genreIcons]
              break;

            case 'Documental':
              genreIcons = [{...genre, icon: 'fa-file-alt'}, ...genreIcons]
              break;

            case 'Drama':
              genreIcons = [{...genre, icon: 'fa-theater-masks'}, ...genreIcons]
              break;

            case 'Familia':
              genreIcons = [{...genre, icon: 'fa-home'}, ...genreIcons]
              break;

            case 'Fantasía':
              genreIcons = [{...genre, icon: 'fa-magic'}, ...genreIcons]
              break;

            case 'Historia':
              genreIcons = [{...genre, icon: 'fa-landmark'}, ...genreIcons]
              break;

            case 'Terror':
              genreIcons = [{...genre, icon: 'fa-skull'}, ...genreIcons]
              break;

            case 'Música':
              genreIcons = [{...genre, icon: 'fa-music'}, ...genreIcons]
              break;

            case 'Misterio':
              genreIcons = [{...genre, icon: 'fa-question-circle'}, ...genreIcons]
              break;

            case 'Romance':
              genreIcons = [{...genre, icon: 'fa-heart'}, ...genreIcons]
              break;

            case 'Ciencia ficción':
              genreIcons = [{...genre, icon: 'fa-robot'}, ...genreIcons]
              break;

            case 'Película de TV':
              genreIcons = [{...genre, icon: 'fa-tv'}, ...genreIcons]
              break;

            case 'Suspense':
              genreIcons = [{...genre, icon: 'fa-exclamation-jet'}, ...genreIcons]
              break;

            case 'Bélica':
              genreIcons = [{...genre, icon: 'fa-crosshairs'}, ...genreIcons]
              break;

            case 'Western':
              genreIcons = [{...genre, icon: 'fa-hat-cowboy'}, ...genreIcons]
              break;

            default:
              break;
          }
        });
        return genreIcons
}

export default setGenreIcons