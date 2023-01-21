### stores
- AppStatus
### template
- a blur-out full-screen div to cover all content under it
- a v-if that displays the correct modal depending on the store props
### methods
- evaluateModalResponse(target, payload) // applies changes as per what the modal returned, tunrs of the modal
### components
- [[StitchSelectModal]]
- [[ColorSelectModal]]
### emits
- modalEvaluated
