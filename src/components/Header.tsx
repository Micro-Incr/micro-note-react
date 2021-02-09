import React from 'react'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

function Header() {
  return (
    <header>
      <h1>
        <NoteAddIcon style={{ fontSize: '48px' }}/>
        <span style={{ marginLeft: '1rem' }}>Note</span>
      </h1>
    </header>
  )
}

export default Header
