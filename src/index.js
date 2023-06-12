$(function () {
	$.ajax({
		url: "https://www.themealdb.com/api/json/v1/1/categories.php",
		method: "GET",
		success: function (response) {
			let categories = response.categories;
			let categoryList = $("#category-list"); //ul

			// Menampilkan list kategori
			categories.forEach(function (category) {
				let categoryName = category.strCategory;
				let categoryImage = category.strCategoryThumb;

				let categoryItem = $("<li></li>");
				let categoryLink = $("<a></a>").attr("href", "javascript:void(0)");
				let categoryImageElement = $('<img class="category-image">').attr(
					"src",
					categoryImage
				);
				let categoryNameElement = $("<span></span>").text(categoryName);

				categoryLink.append(categoryImageElement);
				categoryLink.append(categoryNameElement);
				categoryItem.append(categoryLink);
				categoryList.append(categoryItem);

				// Menambahkan event click pada setiap kategori
				categoryLink.on("click", function () {
					$.get(
						"http://www.themealdb.com/api/json/v1/1/filter.php?c=" +
							categoryName,
						function (data) {
							// Menampilkan modal dengan hasil filter
							showModal(categoryName, data.meals);
						}
					);
				});
			});
		},
		error: function (error) {
			console.log("Error:", error);
		},
	});
});

function showModal(categoryName, meals) {
	// Membuat elemen modal
	let modalContainer = $("<div class='modal-container'></div>");
	let modalContent = $("<div class='modal-content'></div>");
	let modalTitle = $("<h2 class='modal-title'></h2>").text(categoryName);
	let mealList = $("<ul class='modal-meal-list'></ul>");

	// Menampilkan daftar makanan
	meals.forEach(function (meal) {
		let mealName = meal.strMeal;
		let mealImage = meal.strMealThumb;

		let mealItem = $("<li class='modal-meal-item'></li>");
		let mealImageElement = $("<img class='modal-meal-image'>").attr(
			"src",
			mealImage
		);
		let mealNameElement = $("<span class='modal-meal-name'></span>").text(
			mealName
		);

		mealItem.append(mealImageElement);
		mealItem.append(mealNameElement);
		mealList.append(mealItem);
	});

	// Menambahkan elemen modal ke dalam dokumen
	modalContent.append(modalTitle);
	modalContent.append(mealList);
	modalContainer.append(modalContent);
	$("body").append(modalContainer);

	// Menutup modal saat mengklik di luar area konten
	modalContainer.on("click", function (event) {
		if ($(event.target).hasClass("modal-container")) {
			modalContainer.remove();
		}
	});
}
