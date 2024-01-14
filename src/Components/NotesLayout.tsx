import { Note } from '../App'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

type NotesLayoutProps = {
  notes : Note[]
}

const NotesLayout = ({notes}: NotesLayoutProps) => {
  const {id} = useParams()
  const note = notes.find(n => n.id === id)

  if(note == null) return <Navigate to="/" replace/>

  return (
    <Outlet context={note}/>
  )
}

export const useNote = () => {
  return useOutletContext<Note>()
}

export default NotesLayout
