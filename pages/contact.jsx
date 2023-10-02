import BLOG from '@/blog.config'
import Layout from '@/layouts/Glayouts';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Contact = () => {
  if (!BLOG.contact) {
    return (
      <p>404</p>
    )
  } else {
    const sentMessage = async (event) => {
      event.preventDefault()

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
      console.log('status:', status)
    }
    return (
      <>
        <Layout title='Contact' showAuthor={true}>
          <form
            autoComplete='off'
            className='max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto'
            onSubmit={sentMessage}
          >
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' name='name' type="text" placeholder="Name" />
            </div>
            <div>
              <Label htmlFor='mail'>Email</Label>
              <Input id='mail' name='email' type="email" placeholder="Email" />
            </div>

            <div className='sm:col-span-2'>
              <Label htmlFor='message'>Message</Label>
              <Textarea className='h-40' id='message' name='message' placeholder="Type your message here." />
            </div>

            <div className='sm:col-span-2 flex justify-between items-center'>

              <Button type='submit'>Send</Button>

            </div>
          </form>
        </Layout>

      </>
    )
  }

}

export default Contact;