import React from "react"
import { useEffect, useState } from "react"

import "./App.css"

import ContactList from "./ContactList.jsx"
import ContactForm from "./ContactForm.jsx"

function App() {
  const [contacts, setContacts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  }
  useEffect(() => {
    fetchContacts()
  }, [])
  const swtichModal = () => setModalOpen(!modalOpen)
  return (
    <>
      <ContactList contacts={contacts} />
      <button className="left-side-button" onClick={swtichModal}>Add Contact</button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setModalOpen(false)} className="close">
              &times;
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  )
}

export default App
