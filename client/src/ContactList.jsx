import React from "react"
import { useState, useEffect } from "react"

import ContactForm from "./ContactForm"

import "./ContactList.css"

const ContactList = ({ contacts }) => {
  const [editing, setEditing] = useState(false)
  const [editedContactId, seteditedContactId] = useState(-1)
  const handleEdit = async (contactId) => {
    setEditing(true)
    seteditedContactId(contactId)
  }
  const handleDelete = async (contactId) => {
    const response = await fetch(
      "http://127.0.0.1:5000/delete_contact/" + contactId,
      {
        method: "DELETE",
      }
    )
    if (response.status != 200) {
      const message = await response.json()
      alert(message.message)
    } else {
      window.location.reload()
    }
  }
  return (
    <>
      <div className="contact-list-container">
        <div className="contact-list-container__row contact-list-container__column-heads">
          <span className="contact-list-container__column-heads__title">
            First Name
          </span>
          <span className="contact-list-container__column-heads__title">
            Last Name
          </span>
          <span className="contact-list-container__column-heads__title">
            Email
          </span>
          <span className="contact-list-container__column-heads__title">
            Actions
          </span>
        </div>
        {contacts.map((contact) =>
          editing && contact.id == editedContactId ? (
            <ContactForm
              contactToUpdate={contact}
              updateCallback={() => setEditing(false)}
            />
          ) : (
            <div className="contact-list-container__row">
              <div>{contact.firstName}</div>
              <div>{contact.lastName}</div>
              <div>{contact.email}</div>
              {!editing && (
                <div>
                  <button onClick={() => handleEdit(contact.id)}>Edit</button>
                  <button onClick={() => handleDelete(contact.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  )
}

export default ContactList
