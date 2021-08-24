import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            authenticated: false,
            user: {
                loggedIn: false,
                data: null,
            }
        }
    },

    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        },
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            commit('SET_LOGGED_IN', user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email,
                    uid: user.uid
                });
            } else {
                commit("SET_USER", null);
            }
        }
    }
});

export default store;