'use client'
import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import dynamic from 'next/dynamic'

function TextEditor ({
  value,
  createSection,
  embedSection,
  onGetEditorContent
}) {
  const editorRef = useRef(null)
  const cursorValidator = 'span[class="cursor"]'
  const cursorHTML = '<span class="cursor"></span>'

  return (
<Editor
tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
onInit={(_, editor) => editorRef.current = editor}
value={value}
onEditorChange = {(v) => onGetEditorContent(v)}
init={{
  height: 500,
  menubar: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
  ],
  toolbar: 'createSection | embedSection | undo redo | blocks | ' +
    '  bold italic forecolor | bullist numlist | ' +
    'removeformat',
  inline: true,
  selector: 'textarea',
  placeholder: 'Write your tutorial',
  extended_valid_elements: cursorValidator,
  setup: (editor) => {
    editor.ui.registry.addButton('createSection', {
      text: 'Create Section',
      onAction: (_) => {
        editor.dom.insertAfter(editor.dom.createFragment(cursorHTML), editor.selection.getNode())
        const content = editor.getContent()
        createSection(
          content.slice(0, content.indexOf(cursorHTML)),
          content.slice(content.indexOf(cursorHTML) + cursorHTML.length)
        )
      }
    })
    editor.ui.registry.addButton('embedSection', {
      text: 'Embed Section',
      onAction: (_) => {
        editor.windowManager.open({
          title: 'Embed a Section',
          body: {
            type: 'panel',
            items: [{
              type: 'input',
              name: 'toEmbed',
              label: 'Enter a tutorial id'
            }]
          },
          onSubmit: (api) => {
            const data = api.getData()
            editor.dom.insertAfter(editor.dom.createFragment(cursorHTML), editor.selection.getNode())
            const content = editor.getContent()
            embedSection(
              content.slice(0, content.indexOf(cursorHTML)),
              content.slice(content.indexOf(cursorHTML) + cursorHTML.length),
              data.toEmbed
            )
            api.close()
          }
        })
      }
    })
  }
}}
/>
  )
}

export default dynamic(() => Promise.resolve((params) => TextEditor(params)), { ssr: false })
