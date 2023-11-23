import _ from 'lodash'

const sectionTypes = {
  TUTORIAL: 'tutorial',
  TEXT: 'text'
}
export const { TUTORIAL, TEXT } = sectionTypes

export const newSectionTemplate = (type, custom = {}) => {
  if (custom.id && !(custom.isNew)) {
    custom.isNew = false
  }
  if (custom.sections) {
    for (let i = 0; i < custom.sections.length; i++) {
      if (custom.sections[i].type === TEXT) {
        custom.sections[i] = newSectionTemplate(TEXT, custom.sections[i])
      }
    }
  }
  switch (type) {
    case TUTORIAL:
      return _.defaults(custom, {
        id: Math.random(),
        isNew: true,
        heading: '',
        sections: [newSectionTemplate(TEXT)],
        status: 'succeeded'
      })
    case TEXT:
      return _.defaults(custom, {
        type: TEXT,
        id: Math.random(),
        value: ''
      })
  }
}
