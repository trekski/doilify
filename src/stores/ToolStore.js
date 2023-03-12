import { defineStore } from 'pinia'
import { ref } from "vue";

export const useToolStore= defineStore('tool_state', () => {
  
  // what is it that you are doing in the app
  const mode = ref('crochet') // crochet, edit, view
  const selected_tool = ref('change_color') // applicable only to 'edit' mode

  // applicable only to 'crochet' mode
  const crochet_stitch = ref('ch')
  const crochet_color= ref('black')

  // applicable only to 'edit' mode
  const edit_stitch = ref('ch')
  const edit_color= ref('black')

  function change_setting(target, value) {
    switch(target) {
      case 'mode':
          mode.value = value
        break;
      case 'selected_tool':
        selected_tool.value = value
        break;
      case 'crochet_stitch':
        crochet_stitch.value = value
        break;
      case 'crochet_color':
        crochet_color.value = value
        break;
      case 'edit_stitch':
        edit_stitch.value = value
        break;
      case 'edit_color':
        edit_color.value = value
      break;
    }
  }

  return { mode, selected_tool, crochet_stitch, crochet_color, edit_stitch, edit_color, change_setting}

})