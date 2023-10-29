const addCommentFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();
    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
       const data = await response.json()
       if (response.ok) {
           document.location.reload();
       } else {
           alert(data.message);
       }
    }
}
