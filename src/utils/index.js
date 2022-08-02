
export const login = () => {
    localStorage.setItem('id_token');
}

export const logout = () => {
    
    localStorage.removeItem('id_token');
    localStorage.removeItem('id');

    
}

export const isLogin = () => {
    if (localStorage.getItem("id_token")) {
        return true;
    }

    return false;
}