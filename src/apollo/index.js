import Vue from 'vue'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import is from 'is_js'

let baseUrl = is.safari() && (is.ios() || is.mac()) ? 'https://www.enjoyreading.net' : process.env.API_BASE_URL
// let baseUrl = is.safari() && (is.ios() || is.mac()) ? 'https://www.enjoyreading.net' : 'https://www.enjoyreading.net'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: baseUrl + '/tasks/graphql',
    opts: {
      credentials: 'include'
    }
  }),
  addTypename: false
})

const apolloClientClass = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: baseUrl + '/users/graphql',
    opts: {
      credentials: 'include'
    }
  }),
  addTypename: false
})

const apolloClientNewTestEr = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://www.enjoyreading.net/tasks/graphql',
    opts: {
      credentials: 'include'
    }
  }),
  addTypename: false
})

Vue.use(VueApollo)

export default new VueApollo({
  clients: {
    a: apolloClient,
    b: apolloClientClass,
    c: apolloClientNewTestEr
  },
  defaultClient: apolloClient
})
