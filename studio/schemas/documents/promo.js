import {format} from 'date-fns'

export default {
  name: 'promo',
  title: 'Promo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: Rule => Rule.error('You have to enter a URL.').required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name: 'description',
      title: 'Decription',
      type: 'text'
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'image'
    },
    prepare({title = 'No title', publishedAt, media}) {
      const dateSegment = format(publishedAt, 'DD/MM/YYYY')
      return {
        title,
        media,
        subtitle: publishedAt ? dateSegment : 'Missing publishing date'
      }
    }
  }
}
