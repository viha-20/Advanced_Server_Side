$(document).ready(() => {
    // Populate dropdown on page load
    $.get('/celebrities', (data) => {
      data.forEach(name => {
        $('#celebrityDropdown').append(`<option value="${name}">${name}</option>`);
      });
    });
  
    // Update input field when dropdown changes
    $('#celebrityDropdown').change(() => {
      const selectedName = $('#celebrityDropdown').val();
      $('#celebrityName').val(selectedName);
    });
  
    // Handle form submission
    $('#searchForm').submit((event) => {
      event.preventDefault();
      const name = $('#celebrityName').val();
      searchCelebrity(name);
    });
  });
  
  function searchCelebrity(name) {
    $.get(`/search?name=${name}`, (data) => {
      if (data.error) {
        $('#results').html(`<p>${data.error}</p>`);
      } else {
        const html = `
          <h2>${data.name}</h2>
          <p>Age: ${data.age}</p>
          <img src="/images/${data.image}" alt="${data.name}" width="200">
          <h3>Top Films:</h3>
          <ul>
            ${data.films.map(film => `<li>${film}</li>`).join('')}
          </ul>
        `;
        $('#results').html(html);
      }
    }).fail(() => {
      $('#results').html('<p>Error fetching celebrity data.</p>');
    });
  }