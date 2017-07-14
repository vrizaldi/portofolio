const OFFSET = 60;		// offset for header (in px)

$(document).ready(init);

function init() {
	// initialise the web site

	// get resources
	$.getJSON("/get_projects", function(projects) {
		projects.forEach(function(project) {
			// append it to where the projects should be
			var element = 
				'<div class="project">'
				+ '<img class="project-img" href="' + project.imageurl + '">'
				+ '<h3>' + project.title + '</h3>'
				+ '<p class="desc">' + project.desc + '</p>'
				+ '</div>';
			$("#projects-wrapper").append(element);
		});

		// use masonry
		$("#projects-wrapper").masonry({
			itemSelector: ".project",
			columnWidth: "#grid-sizer"
		});
	});

	// add event triggers
	$(".page-nav").on("click", handleScroll);
	$('[data-toggle="tooltip"]').tooltip();
	$(".nav-link").on("click", switchSection);
}

function handleScroll(e) {
	if(this.hash !== "") {
		// if there's hash link attached to the anchor
		// prevent the page from auto focusing on the hash
		e.preventDefault();

		// scroll smoothly
		$("html, body").animate({
			scrollTop: $(this.hash).offset().top - OFFSET		// move the scroll bar up (with offset)
		}, 400, "swing");

		// add the hash location to the browser's site field
		window.location.hash = this.hash;
	}
}

function switchSection(e) {
	$(".nav-link.active").removeClass("active");
	$(this).addClass("active");
}