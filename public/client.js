const OFFSET = 60;		// offset for header (in px)

$(document).ready(init);

function init() {
	// initialise the web site

	// get resources
	$.getJSON("/get_projects", parseProjects);

	// add event triggers
	$(".page-nav").on("click", handleScroll);
	document.addEventListener("scroll", checkLocation);
	$(".contact-field").on("change", updateMailTo);

	// activate tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// check where in the document the user is looking at
	checkLocation();
}

function parseProjects(projects) {
	projects.forEach(function(project) {
		// append it to where the projects should be
		var element = 
			'<a class="project-wrapper" href="' + project.demourl + '" target="blank">'
				+ '<div class="card project">'
					+ '<img class="card-img-top project-img" src="' + project.imageurl + '">'
					+ '<div class="card-block project-info">'
						+ '<h3 class="card-title">' + project.title + '</h3>'
						+ '<p class="card-text desc">' + project.desc + '</p>'
					+ '</div>'
					+ '<div class="project-link">'
						+ '<a class="card-link" href="' + project.sourcecodeurl + '" target="blank">'
							+ '<i class="fa fa-code">'
						+ '</a>'
					+ '</div>'
				+ '</div>'
			+ '</a>';
		$("#projects-wrapper").append(element);
	});

	// use masonry
	$("#projects-wrapper").masonry({
		itemSelector: ".project",
		columnWidth: "#grid-sizer"
	});

	$(".project").imagesLoaded(function() {
		// re-layout every time a picture is loaded
		$("#projects-wrapper").masonry("layout");
	});
}

function handleScroll(e) {
	const hash = $(this).children(".nav-link").attr("href");
	if(hash !== "") {
		// if there's hash link attached to the anchor
		// prevent the page from auto focusing on the hash
		e.preventDefault();

		// scroll smoothly
		$("html, body").animate({
			scrollTop: $(hash + "-sec").offset().top - OFFSET		// move the scroll bar up (with offset)
		}, 400, "swing");

		// add the hash location to the browser's site field
		window.location.hash = this.hash;
	}
}

function checkLocation(e) {
	// cehck the current location
	var scrollTop = $(document).scrollTop();
	if(scrollTop >= $("#contact-sec").offset().top - 5 * OFFSET) {
		// is in contact
		if(!$("#contact-nav").hasClass("active")) {
			// add active if not active
			$(".page-nav.active").removeClass("active");
			$("#contact-nav").addClass("active");
			window.location.hash = "#contact";
		}

	} else if(scrollTop >= $("#portofolio-sec").offset().top - 5 * OFFSET) {
		// is in portofolio
		if(!$("#portofolio-nav").hasClass("active")) {
			// add active if not active
			$(".page-nav.active").removeClass("active");
			$("#portofolio-nav").addClass("active");
			window.location.hash = "#portofolio";
		}

	} else if(scrollTop >= $("#about-sec").offset().top - 5 * OFFSET) {
		// is in about
		if(!$("#about-nav").hasClass("active")) {
			// add active if not active
			$(".page-nav.active").removeClass("active");
			$("#about-nav").addClass("active");
			window.location.hash = "#about";
		}
	}
}

function updateMailTo(e) {
	const subject = encodeURI($("#subject").val());

	const name = $("#full-name").val();
	const email = $("#email").val();
	const message = $("#message").val();
	const body = encodeURI(message + "\n\n" + "Sent by " + name + " (" + email + ")");

	$("#contact-form-submit").attr("href", "mailto:vrizaldi@gmail.com?subject=" + subject + "&body=" + body); 
}