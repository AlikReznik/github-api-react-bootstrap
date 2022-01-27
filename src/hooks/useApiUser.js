import { useState, useEffect } from 'react';

const useApiUser = () => {
    const [user, setUser] = useState({
        name: '',
        img: '',
        url: '',
        repos: []
    })
    const [userHistory, setUserHistory] = useState([])
    const [userFav, setUserFav] = useState([])
    const [reload, setReload] = useState(false)
    //Main functions for export
    const fetchUser = nickname => {
        fetch(`https://api.github.com/users/${ nickname }/repos`, {
            method: 'GET',
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.message !== "Not Found"){
                saveHistory({ name: data[0].owner.login, img: data[0].owner.avatar_url, url: data[0].owner.html_url, repos: data })
                setReload(!reload)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    // Localhost funcions
    const saveHistory = data => {
        let users = JSON.parse(localStorage.getItem('History'))
        if(users){
            if(users.length <= 8){
                users.push(data)
                localStorage.setItem('History', JSON.stringify(users))
            }else{
                users.shift()
                users.push(data)
                localStorage.setItem('History', JSON.stringify(users))
            }
        }else{
            localStorage.setItem('History', JSON.stringify([data]))
        }
    }
    const getHistory = () => {
        if(localStorage.getItem('History'))
            setUserHistory(JSON.parse(localStorage.getItem('History')))
    }
    const getUser = () => {
        if(localStorage.getItem('History'))
            setUser(JSON.parse(localStorage.getItem('History'))[JSON.parse(localStorage.getItem('History')).length-1])
    }

    const saveFav = () => {
        let users = JSON.parse(localStorage.getItem('Fav'))
        if(users){
            let count = -1
            for(let i = 0; i<userFav.length; i++){
                console.log(i, users[i])
                if(users[i].name === user.name){
                    count = i
                }
            }
            if(count<0){
                users.push(user)
                localStorage.setItem('Fav', JSON.stringify(users))
            }else{
                users.splice(count, 1)
                localStorage.setItem('Fav', JSON.stringify(users))
            }
        }else{
            localStorage.setItem('Fav', JSON.stringify([user]))
        }

        getFav()
    }
    const getFav = () => {
        if(localStorage.getItem('Fav'))
            setUserFav(JSON.parse(localStorage.getItem('Fav')))
    }
    const savedCheck = () => {
        for(let i = 0; i<userFav.length; i++){
            if(userFav[i].username === user.username){
                return true
            }
        }
        return false
    }
    
    useEffect(() => {
        getHistory()
        getUser()
        getFav()
    }, [reload])
    return[user, userHistory, userFav, saveFav, savedCheck, fetchUser]
}

export default useApiUser