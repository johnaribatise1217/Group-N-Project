import 'bootstrap/dist/css/bootstrap.min.css'
import 'tailwindcss'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import { NewNote } from './Components/NewNote'
import { useLocalStorage } from './Components/useLocalStorage'
import { useEffect, useMemo, useState } from 'react' 
import {v4 as uuidV4} from "uuid"
import NoteList from './Components/NoteList'
import NotesLayout from './Components/NotesLayout'
import Note from './Components/Note'
import { EditNote } from './Components/EditNote'
import Login from './Components/auth/Login'
import SignUp from './Components/auth/SignUp'
import ForgotPassword from './Components/auth/ForgotPassword'
import {Toaster} from 'react-hot-toast'

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title : string,
  markdown : string,
  tags : Tag[]
}

export type Tag = {
  id: string,
  label : string
}

export type RawNoteData = {
  title : string,
  markdown : string,
  tagIds : string[]
}

export type RawNote = {
  id : string,
} & RawNoteData

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/auth/login");
  }

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags : tags.filter(tag =>
          note.tagIds.includes(tag.id)
        )}
    })
  }, [notes, tags])

  const onCreateNote = ({tags, ...data} : NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds : tags.map(tag => tag.id)}]
    })
  }

  const onUpdateNote = (id : string, {tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id){
          return {...note, ...data,tagIds : tags.map(tag => tag.id)}
        }else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id : string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag : Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id : string, label : string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id) {
          return {...tag, label}
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id : string) => {
     setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
     })
  }

  return (
    <Container className='my-4'>
      <Toaster/>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand href="/">GroupN-notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <>
              <Navbar.Text className="me-3">
                Welcome, {firstname} {lastname}
              </Navbar.Text>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Nav >
              <Button variant="outline-primary" className="me-2" onClick={() => navigate("/auth/signup")}>
                Sign Up
              </Button>
              <Button variant="primary" onClick={() => navigate("/auth/login")}>
                Sign In
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='/' element={<NoteList notes={noteWithTags} availableTags={tags} onUpdateTag={updateTag}
        onDeleteTag={deleteTag}/>}/>
        <Route path='/new' element={<NewNote onAddTag={addTag} availableTags={tags} onSubmit={onCreateNote}/>}/>
        <Route path='/:id' element={<NotesLayout notes={noteWithTags}/>}>
          <Route index element={<Note onDeleteNote={onDeleteNote}/>}/>
          <Route path="edit" element={<EditNote onAddTag={addTag} availableTags={tags} onSubmit={onUpdateNote}/>} />
        </Route>
        <Route path='*' element={<Navigate to='/' />}/>
        <Route path='/auth/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/auth/signup' element={<SignUp/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes> 
    </Container>
  )
}

export default App
