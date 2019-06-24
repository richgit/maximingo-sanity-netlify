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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
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
