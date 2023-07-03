$(document).ready(function () {
	$('#searchBtn').click(function () {
		const searchQuery = $('#searchInput').val();

		// Clear previous search results
		$('#searchResults').empty();

		// Call the API and fetch data
		fetchData(searchQuery);
	});

	function fetchData(query) {
		// Perform AJAX request to fetch data based on the search query
		$.ajax({
			url: `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`,
			method: 'GET',
			dataType: 'json',
			success: function (data) {
				displayData(data);
			},
			error: function (error) {
				console.error(error);
			},
		});
	}

	const displayData = (data) => {
		const container = $('#book-container');
		container.empty();

		const bookData = data.items.map((book) => {
			return book.volumeInfo;
		});

		bookData.forEach((book) => {
			const card = $('<div>').addClass('card');
			const bookCard = $('<div>').addClass('book-card col-md-4 mb-3');
			const cardBody = $('<div>').addClass('card-body');
			const titleElement = $('<h3>').addClass('book-title').text(book.title);
			const authorElement = $('<p>')
				.addClass('book-author')
				.text(`Author: ${book.authors}`);
			const bookPages = $('<a>')
				.addClass('book-pages')
				.text(`More Info`)
				.attr('href', book.infoLink)
				.attr('target', '_blank');
			let bookImage;
			if (book.imageLinks === undefined) {
				bookImage = $('<img>').attr(
					'src',
					'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
				);
			} else {
				bookImage = $('<img>').attr('src', book.imageLinks.thumbnail);
			}

			cardBody.append(bookImage, titleElement, authorElement, bookPages);
			card.append(cardBody);
			bookCard.append(card);
			container.append(bookCard);
		});
	};
});
