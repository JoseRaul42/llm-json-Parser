<script>
  import { onMount } from 'svelte';
  import Webscraperpanel from './webscraperpanel.svelte';

  
  
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
        end: () => "+=" + document.querySelector(".container")?.offsetWidth
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
    font-style:italic;
    color: rgb(201, 205, 7);
  }

  .panel:nth-child(1) {
    background-color: #001f3f;
  }

  .panel:nth-child(2) {
    background-color: #001f3f;
  }

  .panel:nth-child(3) {
    background-color: #001f3f;
  }

  .panel:nth-child(4) {
    background-color: #001f3f;
  }

  .panel:nth-child(5) {
    background-color: #001f3f;
  }
</style>

<div class="container">
  <div class="panel" > <h4>Seamless JSON ingestion from any URL.</h4> </div>
  <div class="panel"><h4>High readability format for better outcomes.</h4></div>
  <div class="panel"><h4>Versatile format for various use cases.</h4></div>
  <div class="panel"><h4>Optimized for RAG implementation performance.</h4></div>
  <div class="panel"> <Webscraperpanel />   </div>
</div>

<slot />
