import { Button, Form, FormField, Message, Segment } from 'semantic-ui-react'

export function Contact() {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const sendMessage = (e: any, data: any) => {
    console.log(data)
  }

  return (
    <Segment>
      {/* <Form loading></Form> */}
      <Form onSubmit={sendMessage}>
        <FormField>
          <label>Full name</label>
          <input placeholder="name" />
        </FormField>
        <FormField>
          <label>Email address</label>
          <input placeholder="email" />
        </FormField>
        <FormField>
          <label>Message</label>
          <textarea placeholder="Text..." />
        </FormField>
        <Button type="submit">Send</Button>
      </Form>
      <Message
        success
        header="Email Sent"
        content="I will try to respond as soon as possible, thank you!"
      />
    </Segment>
  )
}
