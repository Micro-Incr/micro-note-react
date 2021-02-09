import React, { useState, useRef, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import Note from '../entity/Note'

interface CreateAreaProps {
  onAdd: (note: Note) => void
}

function CreateArea(props: CreateAreaProps) {
  const [isExpanded, setExpanded] = useState<boolean>(false)

  const createNoteRef = useRef<HTMLFormElement>(null)

  const [note, setNote] = useState<Note>({
    title: '',
    content: ''
  })

  const style = {
    marginTop: isExpanded ? '1rem' : '0rem'
  }

  useEffect(() => {
    const onBodyClick = (event: MouseEvent) => {
      if (createNoteRef.current && createNoteRef.current.contains(event.target as Node)) {
        return
      }

      if (note.title || note.content) {
        props.onAdd(note)
        setNote({
          title: '',
          content: ''
        })
      }
      setExpanded(false)
    }
    document.body.addEventListener('click', onBodyClick)

    return function cleanup() {
      //setExpanded(false)
      document.body.removeEventListener('click', onBodyClick)
    }
  }, [props, note])

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
    setNote({
      title: '',
      content: ''
    })
    setExpanded(false)
    event.preventDefault()
  }

  function expand() {
    setExpanded(true)
  }

  return (
    <div>
      <form className='create-note' ref={createNoteRef}>
        {isExpanded && (
          <input
            style={style}
            name='title'
            onChange={handleChange}
            value={note.title}
            placeholder='Title'
          />
        )}

        <textarea
          style={style}
          name='content'
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder='Take a note...'
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <CloseIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  )
}

export default CreateArea
