import {format} from 'date-fns'

export default {
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      validation: Rule => Rule.error('You have to enter a Source').required(),
    }
    ],
  preview: {
    select: {
      description: 'description',
      source: 'source'
    },
    prepare(selection) {
      const {source, description} = selection
      return {
        title: source ,
        subtitle: description.substring(0, 25) + '...'
      }
    }
  }
}
