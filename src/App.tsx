import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NewNote } from './Components/NewNote'
import { useLocalStorage } from './Components/useLocalStorage'
import { useMemo } from 'react' 
import {v4 as uuidV4} from "uuid"
import NoteList from './Components/NoteList'
import NotesLayout from './Components/NotesLayout'
import Note from './Components/Note'
import { EditNote } from './Components/EditNote'

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
      <Routes>
        <Route path='/' element={<NoteList notes={noteWithTags} availableTags={tags} onUpdateTag={updateTag}
        onDeleteTag={deleteTag}/>}/>
        <Route path='/new' element={<NewNote onAddTag={addTag} availableTags={tags} onSubmit={onCreateNote}/>}/>
        <Route path='/:id' element={<NotesLayout notes={noteWithTags}/>}>
          <Route index element={<Note onDeleteNote={onDeleteNote}/>}/>
          <Route path="edit" element={<EditNote onAddTag={addTag} availableTags={tags} onSubmit={onUpdateNote}/>} />
        </Route>
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes> 
    </Container>
  )
}

export default App
