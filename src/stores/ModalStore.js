import { defineStore } from 'pinia'
import { ref } from "vue";

export const useModalStore =   defineStore('modal_state', () => {

  const modal_type = ref()
  const modal_target = ref()
  const modal_initial_value = ref()

  function openModal(type, target, init) {
    modal_type.value = type
    modal_target.value = target
    modal_initial_value.value = init
  }

  function closeModal() {
    modal_type.value = undefined
    modal_target.value = undefined
    modal_initial_value.value= undefined
  }

  return { modal_type, modal_target, modal_initial_value, openModal, closeModal }

})