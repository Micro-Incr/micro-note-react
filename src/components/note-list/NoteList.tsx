import React, { useState } from 'react'
import Note from '../note/Note'
import NoteEntity from '../../entity/Note'

function NoteList() {
  const [notes, setNotes] = useState<NoteEntity[]>([])

  function deleteNote(id: number) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id
      })
    })
  }

  return (
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
  )
}

export default NoteList
