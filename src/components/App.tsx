import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Note from './note/Note'
import NoteEntity from '../entity/Note'
import CreateArea from './CreateArea'
import axios from '../api/server'

interface notePostData {
  data: number
}

function App() {
  const [notes, setNotes] = useState<NoteEntity[]>([])

  const addNote = async (newNote: NoteEntity) => {
    try {
      const res: notePostData = await axios.post('/api/v1/notes', newNote)
      newNote.id = res.data
      setNotes(prevNotes => {
        return [...prevNotes, newNote]
      })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteNote = async (id: number) => {
    try {
      await axios.post(`/api/v1/notes/${id}`)
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id
        })
      })
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    axios.get('/api/v1/notes').then((res) => {
      if (res.status === 200) {
        setNotes(res.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className={'notes-list'}>
        {notes.map((noteItem) => {
          return (
            <Note
              key={noteItem.id}
              id={noteItem.id!}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default App
