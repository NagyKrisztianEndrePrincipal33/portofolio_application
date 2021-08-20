import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            authenticated: false,
        }
    },
    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        }
    }
});

export default store;