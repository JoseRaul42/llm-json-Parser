<script>
    import { onMount } from 'svelte';
  
    onMount(async () => {
      const { default: gsap } = await import('gsap');
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
  
      gsap.registerPlugin(ScrollTrigger);
  
      let sections = gsap.utils.toArray(".panel");
  
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + document.querySelector(".container").offsetWidth
        }
      });
    });
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: row;
      width: 400vw; /* Total width for 4 panels */
      height: 100vh; /* Set container to full viewport height */
      overflow-x: hidden; /* Hide horizontal scrollbar */
    }
  
    .panel {
      flex: 1 0 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      color: white;
    }
  
    .panel:nth-child(1) {
      background-color: #1abc9c;
    }
  
    .panel:nth-child(2) {
      background-color: #3498db;
    }
  
    .panel:nth-child(3) {
      background-color: #9b59b6;
    }
  
    .panel:nth-child(4) {
      background-color: #e74c3c;
    }
  </style>
  
  <div class="container">
    <div class="panel">Web Scraped JSON data is messy</div>
    <div class="panel">Which is hard for LLMs to interpret accurately</div>
    <div class="panel">Try out our free webscraper to parse out your JSON</div>
    <div class="panel">Enter any link into our Play ground to test it out yourself!</div>
  </div>
  
  <slot />
  