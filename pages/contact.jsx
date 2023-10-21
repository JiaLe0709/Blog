import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Layout from "@/layouts/Glayouts"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  const [submitting, setSubmitting] = useState(false)
  const sentMessage = async (event) => {
      event.preventDefault()
      setSubmitting(true)
      const tgUrl = '/api/sendtotg'
      const res = await fetch(tgUrl, {
        body: JSON.stringify({
          name: event.target.name.value,
          mail: event.target.mail.value,
          message: event.target.message.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      // await res.json()
      const result = await res.json()
      const status = result.status
      if (status) {
        setSubmitting(false)
      }
      console.log('status:', status)
    }
  
  return (
    <>
      <Layout title={'Contact'}>
        <form
          autoComplete='off'
          className='max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto'
          onSubmit={sentMessage}
          req="true"
        >
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input required id='name' name='name' type="text" placeholder="Name" />
          </div>
          <div>
            <Label htmlFor='mail'>Email</Label>
            <Input id='mail' required name='email' type="email" placeholder="Email" />
          </div>

          <div className='sm:col-span-2'>
            <Label htmlFor='message'>Message</Label>
            <Textarea required className='h-40' id='message' name='message' placeholder="Type your message here." />
          </div>

          {submitting ? (
            <>
              <div className='sm:col-span-2 flex justify-between items-center'>
                <Button disabled type='submit'>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </Button>
              </div>
            </>
          ) : (
            <div className='sm:col-span-2 flex justify-between items-center'>
              <Button type='submit'>Send</Button>
            </div>
          )}
        </form>
      </Layout>
    </>


  )
}

export default Contact;
