import store from 'store'
const USER_KEY = 'user_key';
const FLAG_KEY = '0';
export default {
    saveUser(user){
        //localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY,user);
    },
    getUser(){
       //return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
       return store.get(USER_KEY);
    },
    removeUser(){
        //localStorage.removeItem(USER_KEY)
        return store.remove(USER_KEY);
    },
    saveRemember(flag){
        store.set(FLAG_KEY,flag);
    },
    getRemember(){
        return store.get(FLAG_KEY);
    }
}