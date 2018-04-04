import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} from 'graphql';
import axios from 'axios';

const NewMoviesType = new GraphQLObjectType({
    name: 'NewMovies',
    fields: {
        id: { type: GraphQLInt },
        poster_path: { type: GraphQLString },
        title: { type: GraphQLString }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        newMovies: {
            type: new GraphQLList(NewMoviesType),
            resolve() {
                return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API}&language=en-US&page=1`)
                    .then(res => {
                        const movies = res.data.results;
                        movies.map(movie => movie.poster_path = "https://image.tmdb.org/t/p/w500" + movie.poster_path)
                        return movies
                    })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})