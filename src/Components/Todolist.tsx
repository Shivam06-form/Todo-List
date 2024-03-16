import React, { useEffect, useState } from 'react'
import './Todolist.css'


interface gameInterface {
    title: string | undefined,
    image: string | undefined,
    release_date: string | undefined
}

const Todolist = ({ setList, List, setLoading, Loading }: { setList: any, List: any, setLoading: Function, Loading: boolean }) => {
    const [addGame, setAddGame] = useState<gameInterface>()


    const url: any = process.env.REACT_APP_URL_PROD
    // const url: string = 'http://localhost:4000/api/todos'


    const postOnServer = async (GAMES: any) => {
        await fetch(url + '/post', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title: addGame?.title,
                release_date: addGame?.release_date,
                image: addGame?.image
            })
        })
        window.location.reload()
    }



    useEffect(() => {
        fetch(url).then(async (res: Response) => {
            setLoading(true)
            const response = await (res.json())
            setList(response.Todos.reverse())
            setLoading(false)
        })
    }, [setList, setLoading, url]);



    return (
        <form className='todo'>
            <input name="name" type='text' placeholder='Game Title'
                onChange={(e) => {
                    setAddGame({ release_date: addGame?.release_date, title: e.currentTarget.value, image: addGame?.image })
                }}
            />
            <input name="date" type='date' placeholder='Game Release date'
                onChange={(e) => {
                    setAddGame({ release_date: e.currentTarget.value, title: addGame?.title, image: addGame?.image })
                }}
            />
            <input name="url" type='text' placeholder='Game Image'
                onChange={(e) => {
                    setAddGame({ release_date: addGame?.release_date, image: e.currentTarget.value, title: addGame?.title })
                }}
            />
            <button
                disabled={addGame?.release_date === undefined || addGame.image === undefined || addGame.title === undefined}
                type='submit'
                onClick={(e) => {
                    e.preventDefault();
                    postOnServer(addGame)
                    setAddGame({ title: undefined, image: undefined, release_date: undefined })
                }}
            >SUBMIT</button>
        </form >
    )
}

export default Todolist