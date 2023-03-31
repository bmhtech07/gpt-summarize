export default function useCopy(value: string | null) {
  const copied = ref(false);

  const copyToClipboard = () => {
    const hiddenField = document.createElement("input"); // create field that we can copy text from
    document.body.appendChild(hiddenField); // required in order to actually have the field selectable
    hiddenField.value = value; // field value
    hiddenField.select(); // select
    hiddenField.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy"); // Copy the text inside the text field
    hiddenField.remove();
    copied.value = true;
    setTimeout(() => {
      copied.value = false; // delay 5 seconds, then reset
    }, 2000);
  };

  return { copied, copyToClipboard };
}
