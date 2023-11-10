import _ from 'lodash'

const sectionTypes = {
  TUTORIAL: 'tutorial',
  TEXT: 'text'
}
export const { TUTORIAL, TEXT } = sectionTypes

export const newSectionTemplate = (type, custom = {}) => {
  switch (type) {
    case TUTORIAL:
      return _.defaults(custom, {
        id: Math.random(),
        isNew: true,
        heading: '',
        sections: [newSectionTemplate(TEXT)]
      })
    case TEXT:
      return _.defaults(custom, {
        type: TEXT,
        id: Math.random(),
        value: ''
      })
  }
}
