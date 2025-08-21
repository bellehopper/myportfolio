gsap.registerPlugin(Flip);
const links = document.querySelectorAll(".nav-item a");
const activeNav = document.querySelector(".active-nav");

links.forEach((link) => {
    link.addEventListener('click', () => {
        gsap.to(links, {color: '#252525'});
        //Turn navs blue
        if(document.activeElement === link) {
            gsap.to(link, {color: "#385ae0"});
        }
    //Line movement
    const state = Flip.getState(activeNav);
    link.appendChild(activeNav);
    Flip.from(state, {
        duration: 1.25,
        absolute:true,
        ease:"elastic.out(1, 0.5)",
    })

    });

});

//thumbail animation

// Add missing variables for scroll tracking
var verticalPosition = 0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var divArray = document.getElementsByTagName("div");

var contentThumbnailPaperDiv = document.getElementById("contentThumbnailPaper");

var thumbnailPaperContainerArray = new Array();
storeThumbnailPaperContainerArray();

var thumbnailPaperContainerLeftEarlyPositionX; //position thumbnail container when it is still hidden on the left side
var thumbnailPaperContainerRightEarlyPositionX; //position thumbnail container when it is still hidden on the left side
updateThumbnailPaperContainerEarlyPositionX();

positionThumbnailPaperContainer();

setAndPositionString();

// Add scroll event listener
window.addEventListener('scroll', function() {
    verticalPosition = window.pageYOffset || document.documentElement.scrollTop;
    scrollThumbnailPaperContainer();
});

// Add resize event listener
window.addEventListener('resize', function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    updateThumbnailPaperContainerEarlyPositionX();
    positionThumbnailPaperContainer();
    setAndPositionString();
});

// Initialize on page load
window.addEventListener('load', function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight*2; //USE TO ADJUST ANIMATION SPEED AS LENGTHEN WEBPAGE
    updateThumbnailPaperContainerEarlyPositionX();
    positionThumbnailPaperContainer();
    setAndPositionString();
});

function positionThumbnailPaperContainer() //position thumbnails container on the left and right side, outside the viewable window area
{
	for (var i=0; i<thumbnailPaperContainerArray.length; i++)
	{
		if (i % 2 == 0)
		{
			thumbnailPaperContainerLeftEarlyPositionX = -1 * thumbnailPaperContainerArray[i].offsetWidth;
			thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerLeftEarlyPositionX + "px";
		}
		else
		{
			thumbnailPaperContainerRightEarlyPositionX = windowWidth;
			thumbnailPaperContainerArray[i].style.left = thumbnailPaperContainerRightEarlyPositionX + "px";
		}
	}
}

function updateThumbnailPaperContainerEarlyPositionX()
{
	thumbnailPaperContainerLeftEarlyPositionX = -1 * thumbnailPaperContainerArray[0].offsetWidth;
	thumbnailPaperContainerRightEarlyPositionX = windowWidth;
}

function storeThumbnailPaperContainerArray()
{
    for (var i=0; i<divArray.length; i++)
	{
        if(divArray[i].getAttribute("class") == "thumbnailPaperContainer")
		{
			thumbnailPaperContainerArray.push(divArray[i]);
        } 
    }
}

function scrollThumbnailPaperContainer()
{
	// Calculate the total height of the photography section
	var sectionStart = contentThumbnailPaperDiv.offsetTop;
	var sectionHeight = contentThumbnailPaperDiv.offsetHeight;
	var sectionEnd = sectionStart + sectionHeight;
	
	// Calculate total document height and current scroll progress
	var documentHeight = document.documentElement.scrollHeight - windowHeight;
	var scrollProgress = Math.min(verticalPosition / documentHeight, 1); // 0 to 1
	
	for (var i=0; i<thumbnailPaperContainerArray.length; i++)
	{
		// Calculate center position for this specific container
		var centerPosition = 0.5 * (windowWidth - thumbnailPaperContainerArray[i].offsetWidth);
		
		// Check if we're in or past the photography section
		if (verticalPosition + windowHeight >= sectionStart)
		{
			if (i % 2 == 0) //thumbnail number one, three, five, etc (slide from left)
			{
				// Calculate position based on scroll progress
				var startPosition = thumbnailPaperContainerLeftEarlyPositionX;
				var targetPosition = centerPosition;
				var currentPosition = startPosition + (targetPosition - startPosition) * scrollProgress;
				
				thumbnailPaperContainerArray[i].style.left = Math.min(currentPosition, centerPosition) + "px";
			}
			else //thumbnail number two, four, sixth, etc (slide from right)
			{
				// Calculate position based on scroll progress
				var startPosition = thumbnailPaperContainerRightEarlyPositionX;
				var targetPosition = centerPosition;
				var currentPosition = startPosition - (startPosition - targetPosition) * scrollProgress;
				
				thumbnailPaperContainerArray[i].style.left = Math.max(currentPosition, centerPosition) + "px";
			}
		}
	}	
}

function setAndPositionString()
{
	var stringArray = new Array();
	
	for (var i=0; i<divArray.length; i++)
	{
		if (divArray[i].getAttribute("class") == "stringGear")
		{
			stringArray.push(divArray[i]);
		}
	}
		
	for (var i=0; i<stringArray.length; i++)
	{
		stringArray[i].style.left = "0px";
		stringArray[i].style.top = thumbnailPaperContainerArray[i].offsetTop + 4 + "px";
		stringArray[i].style.width = windowWidth + "px";	
	}
}
