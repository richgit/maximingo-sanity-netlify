import {format} from 'date-fns'

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'Article URL',
      name: 'articleUrl',
      type: 'url',
      validation: Rule => Rule.error('You have to enter a URL.').required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule projects where you show them',
      type: 'datetime'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText'
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, media}) {
      const dateSegment = format(publishedAt, 'DD/MM/YYYY')
      return {
        title,
        media,
        subtitle: publishedAt ? dateSegment : 'Missing publishing date'
      }
    }
  }
}
