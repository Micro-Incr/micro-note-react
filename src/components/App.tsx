import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Note from './Note'
import NoteEntity from '../entity/Note'
import CreateArea from './CreateArea'

function App() {
  const [notes, setNotes] = useState<NoteEntity[]>([])

  function addNote(newNote: NoteEntity) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote]
    })
  }

  function deleteNote(id: number) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id
      })
    })
  }

  return (
    <div style={{ height: '100%' }}>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className={'notes-list'}>
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
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
