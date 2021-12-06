import React from 'react'

const BlogComments = ({
        data
    }) => {
        return ( <p> { data.author } - { data.text } < /p>)
        }

        export default BlogComments