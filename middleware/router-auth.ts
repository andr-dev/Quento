import type {Context, } from '@nuxt/types'
import type {Route} from 'vue-router'

export default function({store, redirect, route} : Context)
{
    // if(route.name == null) redirect ('/')
    console.log(route.name);
    if(route.name == "index") return;

    if(store.state.auth.user != null && (route.name == null || route?.name?.split('/').some(record => record == 'auth')))
    {
        redirect('/home')
    }
    if(store.state.auth.user == null && (route.name == null || isAdminRoute(route)) && route.name != "auth/Login" && route.name!="auth/SignUp") {

        redirect('/auth/login')
    };
}

function isAdminRoute(route : Route)
{
    if (route.matched.some(record => (record.path == "/Home" || record.path == "/Suggestions" || record.path=="/notes" || record.path=="/questions" || "/newsletters")))
    {
        return true
    }
    return false
}