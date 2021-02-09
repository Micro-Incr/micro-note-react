import React from 'react'
import NoteAddIcon from '@material-ui/icons/NoteAdd'

function Header() {
  return (
    <header>
      <div className="header-wrapper">
        <h1>
          <NoteAddIcon style={{ fontSize: '48px' }}/>
          <span style={{ marginLeft: '1rem' }}>Note</span>
        </h1>
      </div>
    </header>
  )
}

export default Header
