const Auth = {
    islogged: false,

    isLogIn () {
        this.islogged = true

    },
    isLogOut()  {
        this.islogged = false
    },
    
    getAuthenticated(){
    return this.islogged
}
}


export default Auth;