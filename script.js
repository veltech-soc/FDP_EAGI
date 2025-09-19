document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(".coordinator-card, .session-info")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    observer.observe(el)
  })

  const coordinatorCards = document.querySelectorAll(".coordinator-card")

  coordinatorCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"

      // Add subtle glow effect
      this.style.boxShadow = "0 25px 50px rgba(240, 147, 251, 0.4), 0 0 0 1px rgba(240, 147, 251, 0.3)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.5s ease-out"
      this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)"
    })

    // Add click ripple effect
    card.addEventListener("click", function (e) {
      createAdvancedRipple(e, this)
    })
  })

  function createAdvancedRipple(event, element) {
    const rect = element.getBoundingClientRect()
    const ripple = document.createElement("span")
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("advanced-ripple")

    element.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 800)
  }

  const style = document.createElement("style")
  style.textContent = `
        .coordinator-card {
            position: relative;
            overflow: hidden;
        }
        
        .advanced-ripple {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(240, 147, 251, 0.4) 50%, transparent 70%);
            transform: scale(0);
            animation: advanced-ripple-animation 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes advanced-ripple-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                opacity: 0.8;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }

        .logo {
            position: relative;
            overflow: hidden;
        }

        .logo::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%);
            transition: all 0.4s ease;
            transform: translate(-50%, -50%);
            border-radius: 50%;
        }

        .logo:hover::after {
            width: 120%;
            height: 120%;
        }
    `
  document.head.appendChild(style)

  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const body = document.querySelector("body")
    const rate = scrolled * 0.3

    body.style.backgroundPosition = `center ${rate}px`
    ticking = false
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  })

  const logos = document.querySelectorAll(".logo")
  logos.forEach((logo, index) => {
    logo.style.animation = `float 4s ease-in-out infinite ${index * 0.7}s`

    // Add magnetic effect
    logo.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.1)`
    })

    logo.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0) scale(1)"
    })
  })

  // Enhanced float animation
  const floatStyle = document.createElement("style")
  floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            25% {
                transform: translateY(-8px) rotate(1deg);
            }
            50% {
                transform: translateY(-5px) rotate(0deg);
            }
            75% {
                transform: translateY(-10px) rotate(-1deg);
            }
        }
    `
  document.head.appendChild(floatStyle)

  // Smooth scroll for any internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Optimize images with fade-in effect
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.style.opacity = "0"
    img.style.transition = "opacity 0.6s ease"

    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Fallback for cached images
    if (img.complete) {
      img.style.opacity = "1"
    }
  })

  // Add entrance animation to main elements
  const mainElements = document.querySelectorAll(".title, .description, .date-box")
  mainElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"

    setTimeout(
      () => {
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      },
      index * 200 + 300,
    )
  })
})
