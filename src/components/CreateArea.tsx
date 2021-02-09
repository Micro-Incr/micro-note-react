import React, { useState, useRef, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import Note from '../entity/Note'

interface CreateAreaProps {

}

function CreateArea(props: any) {
  const [isExpanded, setExpanded] = useState<boolean>(false)

  const createNoteRef = useRef<HTMLFormElement>(null)

  const [note, setNote] = useState<Note>({
    title: '',
    content: ''
  })

  useEffect(() => {
    const onBodyClick = (event: MouseEvent) => {
      if (createNoteRef.current && createNoteRef.current.contains(event.target as Node)) {
        return
      }

      setExpanded(false)
    }
    document.body.addEventListener('click', onBodyClick)

    return function cleanup() {
      setExpanded(false)
      document.body.removeEventListener('click', onBodyClick)
    }
  }, [])

  function handleChange(event: any) {
    const { name, value } = event.target

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function submitNote(event: any) {
    props.onAdd(note)
    setNote({
      title: '',
      content: ''
    })
    event.preventDefault()
  }

  function expand() {
    setExpanded(true)
  }

  return (
    <div style={{ height: '100%' }}>
      <form className='create-note' ref={createNoteRef}>
        {isExpanded && (
          <input
            name='title'
            onChange={handleChange}
            value={note.title}
            placeholder='Title'
          />
        )}

        <textarea
          name='content'
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder='Take a note...'
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  )
}

export default CreateArea
