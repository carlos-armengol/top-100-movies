
import filmsApi from '@/api/FilmsApi'
import tmdbApi from '@/api/tmdbApi'
import setGenreIcons from './setGenreIcons'
import top100 from './top100template'

const fillMoviesTemplate = async (uid) => {
    const listPromisesFilms = []
    top100.map(m => {
        listPromisesFilms.push( tmdbApi.get('/search/movie',{params: {query: m.title, year: m.year}}) )
    })

    const listPromisesCredits = []
    const listPromisesDetails = []
    const resultFilms = await Promise.allSettled(listPromisesFilms).then(
        responses => {
            responses.forEach((resp, index) => {
                const {value: {data}  } = resp
                try {
                    const {id:idTmdb, title: titleEs, overview, poster_path} = data.results[0]
                    top100[index] = {...top100[index], idTmdb, titleEs, overview, poster_path}
                    listPromisesCredits.push(tmdbApi.get(`/movie/${idTmdb}/credits`) )
                    listPromisesDetails.push(tmdbApi.get(`/movie/${idTmdb}`))
                } catch (error) {
                    console.error({data, i: index, error});
                }
            })
            return responses
        }
    )

    const resultCredits = await Promise.allSettled(listPromisesCredits)
    const resultDetails =  await Promise.allSettled(listPromisesDetails)

    const listPromisesUser = []
    for (let i = 0; i < 100; i++) {
        const {value: {data:film}  } = resultFilms[i];
        const {value: {data:credit}  } = resultCredits[i];
        const {value: {data:detail}  } = resultDetails[i];

        const {id:idTmdb, title: titleEs, overview, poster_path} = film.results[0]
        const director = credit.crew.find(({job}) => job === 'Director').name
        const {genres, production_countries} = detail

        top100[i] = {
            ...top100[i], 
            idTmdb,
            titleEs, 
            overview,
            poster_path, 
            director,
            genres: setGenreIcons(genres),
            production_countries: production_countries.map(pc => {
                const {iso_3166_1:code, name} = pc
                return {
                    code,
                    name,
                }
            })
        }
        listPromisesUser.push(filmsApi.post(`/users/${uid}/films.json`,top100[i]))
    }
    await Promise.allSettled(listPromisesUser)
}

export default fillMoviesTemplate