import Layout from '@/layouts/Glayouts'
import NotFound from '@/components/NotFound'

const Error = () => {
    return(
        <>
        <Layout title='Error'>
            <NotFound statusCode='404' />
        </Layout>
        </>
    )
}

export default Error;