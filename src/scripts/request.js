let thanksURL = document.querySelector('input[type=hidden]');
thanksURL.value = thanksURL.value.replace('url', window.location);

/* Thanks thingy */
if ((new URL(document.location)).searchParams.get('thanks') === 'true') {
    let message = ''
    message += `Thanks for submitting a sound! I'll look into it in the near future!`
    alert(message)
}