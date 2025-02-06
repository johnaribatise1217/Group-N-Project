import { useMemo, useState } from 'react'
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
//import {reactSelect as ReactSelect} from 'react-select'
import { Note, Tag } from '../App'
import styles from './NoteList.module.css'

type NoteListProps = {
  availableTags : Tag[]
  notes : Note[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label : string) => void
}

type SimplifiedNote = {
  id: string;
  title : string
  tags : Tag[] 
}

type EditTagsModalProps = {
  show : boolean,
  availableTags : Tag[],
  handleClose : () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label : string) => void  
}

const NoteList = ({availableTags, notes, onDeleteTag, onUpdateTag}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [tagsModalIsOpen, setTagsModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
        note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || 
          selectedTags.every(tag => 
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className='align-items-center mb-3'>
        <Col><h4>Notes</h4></Col>
        <Col xs="auto">
          <Stack direction='horizontal' gap={2}>
            <Link to="new">
              <Button variant='primary'>Create</Button>
            </Link>
            <Button onClick={() => setTagsModalIsOpen(true)} variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <p className="text-[10px]">Search for note below</p>
      <Form className='mb-4'>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
              value={title}
              onChange={(e => setTitle(e.target.value))}
              type='text'/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tag</Form.Label>
              <ReactSelect
              value={selectedTags.map(tag => {
                return {label : tag.label, value : tag.id}
              })} 
              options={availableTags.map(tag => {
                return {label : tag.label, value : tag.id}
              })}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                  return {label : tag.label, id : tag.value}
                }))
              }}
              isMulti
            />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {filteredNotes.length > 0 ? (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
          {filteredNotes.map(note => (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags}/>
            </Col>
          ))}
        </Row>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4}><p>Click create to write your first note</p></Row>
      )}
      <EditTagsModal availableTags={availableTags} show={tagsModalIsOpen } handleClose={() => setTagsModalIsOpen(false)}
      onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag}
      /> 
    </>
  )
}

const NoteCard = ({id, title, tags} : SimplifiedNote) => {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className='align-items-center justify-content-center h-100'>
          <span className="fs-5">{title}</span>
          {
            tags.length > 0 && (
              <Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap'>
                {tags.map(tag => (
                  <Badge key={tag.id} className='text-truncate'>
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )
          }
        </Stack>
      </Card.Body>
    </Card>
  )
}

const EditTagsModal = ({availableTags, handleClose, show, onDeleteTag, onUpdateTag } : EditTagsModalProps ) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit tags </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}> 
                <Col>
                  <Form.Control type='text' value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button onClick={() => onDeleteTag(tag.id)} variant='outline-danger '>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
  
}

export default NoteList
