export const serverURL = process.env.REACT_APP_SERVER_URL || '/api';

export const routes = {
    register: "/auth/signup",
    login: "/auth/signin",
    fetchUser: "/auth/me"
}