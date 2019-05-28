export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5cec589f5ff1edbc2f194d2c',
                  title: 'Sanity Studio',
                  name: 'maximingo-sanity-netlify-studio',
                  apiId: 'c7dd7744-5586-49e3-a270-41349fd014b5'
                },
                {
                  buildHookId: '5cec589fd96d19bc1c5d66aa',
                  title: 'Portfolio Website',
                  name: 'maximingo-sanity-netlify',
                  apiId: 'd34e9da5-71d9-4902-b469-9c52ac01a20a'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo 123',
            value: 'https://github.com/richgit/maximingo-sanity-netlify',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://maximingo-sanity-netlify.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
