import apollo from '../apollo'
import gql from 'graphql-tag'
import store from '../store'

const meQuery = gql`query {
  me {
    id
    name
    email
    created
    roles {
      id
      value
      displayName
    }
  }
}`

const logoutMutation = gql`mutation {
  logout
}`

export default {
  name: 'auth',

  current () {
    return apollo.defaultClient.query({
      query: meQuery,
      fetchPolicy: 'network-only'
    }).then(resp => {
      return (resp.data && resp.data.me) || Promise.reject(new Error('not logged in'))
    })
  },

  logout () {
    return apollo.defaultClient.mutate({
      mutation: logoutMutation
    }).then(resp => resp.data.logout)
  },

  loggedIn () {
    return store.state.user
  }

}
