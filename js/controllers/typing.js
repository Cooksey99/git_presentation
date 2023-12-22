let isRunning = false;

export default function type_animation() {
    console.log('isRunning', isRunning);

    const element = document.querySelector('.typing');
    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    let intervalId = null; // Add this line

    // Function to add a character
    function addCharacter() {
        isRunning = true;
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            // If all characters have been added, stop the interval
            clearInterval(intervalId);
            isRunning = false;
            intervalId = null; // Add this line
        }

    }

    // Create an intersection observer
    let observer = new IntersectionObserver(function (entries) {
        // If the element is intersecting (visible)
        if (entries[0].isIntersecting) {
            // Check if the parent element is not hidden
            // let parentStyle = window.getComputedStyle(element.parentElement);
            console.log(entries[0].target.parentElement.parentElement.hidden);

            if (entries[0].target.parentElement.parentElement.hidden === false) {
                // Check if the typing animation is not already running
                if (intervalId === null) {
                    // Start the interval
                    // if (isRunning === false) {
                        intervalId = setInterval(addCharacter, 100); // Adjust the second parameter to control the speed
                    // }

                    // Stop observing since we don't need it anymore
                    observer.unobserve(element);
                }
            }
        }
    }, {});

    // Start observing the element
    observer.observe(element);
}