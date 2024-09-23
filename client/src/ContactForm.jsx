import React from "react"
import { useState } from "react"

import "./ContactForm.css"

const ContactForm = ({ contactToUpdate = {}, updateCallback }) => {
  console.log(contactToUpdate)
  const [firstName, setFirstName] = useState(contactToUpdate.firstName || "")
  const [lastName, setLastName] = useState(contactToUpdate.lastName || "")
  const [email, setEmail] = useState(contactToUpdate.email || "")
  const updating = contactToUpdate.id ? true : false
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      firstName,
      lastName,
      email,
    }
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? "update_contact/" + contactToUpdate.id : "create_contact")
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    if (response.status != 200 && response.status != 201) {
      const message = await response.json()
      alert(message.message)
    } else {
      window.location.reload()
      if (updating) updateCallback()
    }
  }
  return (
    <form
      className={updating ? "contact-list-container__row" : "new-contact__form"}
      onSubmit={handleSubmit}
    >
      <div className={!updating && "form-div"}>
        {!updating && <label htmlFor="firstName">First Name: </label>}
        <input
          className={`form-input ${!updating && "column-input"}`}
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={!updating && "form-div"}>
        {!updating && <label htmlFor="firstName">Last Name: </label>}
        <input
          className={`form-input ${!updating && "column-input"}`}
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={!updating && "form-div"}>
        {!updating && <label htmlFor="firstName">Email: </label>}
        <input
          className={`form-input ${!updating && "column-input"}`}
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="form-submit" type="submit">
        {updating ? "Update" : "Create"}
      </button>
    </form>
  )
}

export default ContactForm
