<!DOCTYPE html><html lang="en"> <head><!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)"><link rel="icon" type="image/svg+xml" href="/favicon-light.svg" media="(prefers-color-scheme: light)"><link rel="icon" type="image/x-icon" href="/favicon-light.svg"><meta name="generator" content="Astro v4.15.11"><!-- Canonical URL --><link rel="canonical" href="https://fractalcounty.com/"><title>Home | FRACTAL COUNTY</title><link rel="canonical" href="https://fractalcounty.com/"><meta name="description" content="Chip fractalcounty's personal blog and portfolio website dedicated to various things and stuff."><meta name="robots" content="index, follow"><meta property="og:title" content="Home | FRACTAL COUNTY"><meta property="og:type" content="website"><meta property="og:image" content="https://fractalcounty.com/index.png"><meta property="og:url" content="https://fractalcounty.com/"><meta property="og:image:url" content="https://fractalcounty.com/index.png"><meta property="og:image:secure_url" content="https://fractalcounty.com/index.png"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><!-- Primary Meta Tags --><title>Home | FRACTAL COUNTY</title><meta name="title" content="Home | FRACTAL COUNTY"><meta name="description" content="Chip fractalcounty's personal blog and portfolio website dedicated to various things and stuff."><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="https://fractalcounty.com/"><meta property="og:title" content="Home | FRACTAL COUNTY"><meta property="og:description" content="Chip fractalcounty's personal blog and portfolio website dedicated to various things and stuff."><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://fractalcounty.com/"><meta property="twitter:title" content="Home | FRACTAL COUNTY"><meta property="twitter:description" content="Chip fractalcounty's personal blog and portfolio website dedicated to various things and stuff."><!-- Open Graph Image --><!-- Fonts --><style>@font-face {font-weight: normal;font-style: normal;font-family: AlteHaasGrotesk;font-display: swap;src: url(/fonts/AlteHaasGroteskRegular.woff2)} @font-face {font-weight: bold;font-style: bold;font-family: AlteHaasGrotesk;font-display: swap;src: url(/fonts/AlteHaasGroteskBold.woff2)} @font-face {font-weight: 400;font-style: normal;font-family: CommitMono;font-display: swap;src: url(/fonts/CommitMono.woff2)} body { font-family: AlteHaasGrotesk, '_font_fallback_1209660808048', sans-serif; } @font-face { font-family: '_font_fallback_1209660808048'; size-adjust: 101.37%; src: local('Arial'); ascent-override: 93.91%; descent-override: 21.01%; line-gap-override: 2.76%; } code { font-family: CommitMono, '_font_fallback_769526080087', monospace; } @font-face { font-family: '_font_fallback_769526080087'; size-adjust: 107.23%; src: local('Courier New'); ascent-override: 83.94%; descent-override: 18.65%; line-gap-override: 0.00%; }</style><meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback" content="animate"><script>

  function getTheme() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'laramie' : 'casper');
    localStorage.setItem('theme', theme);
  }

  function updateTheme() {
    const theme = getTheme();
    setTheme(theme);
  }

  updateTheme();

  window.addEventListener('storage', (event) => {
    if (event.key === 'theme') {
      updateTheme();
    }
  });
  
  function init() {
    onScroll();
    animate();

    const backToTop = document.getElementById('back-to-top');
    backToTop?.addEventListener('click', (event) => scrollToTop(event));

    const backToPrev = document.getElementById('back-to-prev');
    backToPrev?.addEventListener('click', () => window.history.back());

    document.addEventListener('scroll', onScroll);
  }

  function animate() {
    const animateElements = document.querySelectorAll('.animate');

    animateElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('show');
      }, index * 150);
    });
  }

  function onScroll() {
    if (window.scrollY > 0) {
      document.documentElement.classList.add('scrolled');
    } else {
      document.documentElement.classList.remove('scrolled');
    }
  }

  function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  document.addEventListener('DOMContentLoaded', () => init());
  document.addEventListener('astro:after-swap', () => init());
</script><link rel="stylesheet" href="/_astro/_slug_.CjiJK818.css"><script type="module" src="/_astro/hoisted.DgEu6Yfl.js"></script></head> <body> <header> <div class="mx-auto max-w-screen-sm px-5">  <div class="flex flex-wrap gap-y-2 justify-between"> <a href="/" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out">  <div class="font-bold uppercase hover:scale-105 transition-transform ease-out duration-500"> FRACTAL COUNTY </div>  </a> <nav class="flex gap-1"> <a href="/blog" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2"> 
blog
 </a> <span> / </span> <a href="/projects" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2"> 
projects
 </a> <span> / </span> <a href="https://links.fractalcounty.com/" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2"> 
links
 </a> </nav> </div>  </div> </header> <main>  <div class="mx-auto max-w-screen-sm px-5">  <h4 class="animate font-semibold uppercase">
Hello, I'm Chip
</h4> <div class="space-y-16"> <section> <article class="space-y-4"> <p class="animate">
I make stuff on the internet. Usually silly stuff, sometimes artistic stuff, and very rarely useful stuff.
            This is my website where I dump thoughts and blog posts that can't fit on my <a href="https://x.com/fractalcounty" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="X">  Twitter  </a>,
            as well as various projects I'm working on and other miscellaneous things that don't fit elsewhere.
</p> <p class="animate">
This website is still a work-in-progress. Once I'm done filling it with what I currently have, I probably won't post on here all too often. Regardless, I'll try to keep it updated with whatever I'm working on at the time.
            If anything, it's a decent archive.
</p> <p class="animate">
I made this website using the
<a href="https://astro.build/" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="Astro on GitHub"> 
Astro
 </a>
framework, with some help from
<a href="https://astro.build/integrations/tailwind/" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="Tailwind on GitHub"> 
TailwindCSS
 </a>
and
<a href="https://daisyui.com/" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="DaisyUI"> 
DaisyUI
 </a>
for styling and UI.
</p> </article> </section> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between"> <h5 class="font-bold uppercase">
Latest posts
</h5> <a href="/blog" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2"> 
See all posts
 </a> </div> <ul class="flex flex-col gap-4"> <li> <a href="/projects/smpearth" class="relative group flex flex-nowrap py-3 px-4 pr-10 rounded-lg border border-base-content/25 bg-transparent hover:bg-neutral text-base-content duration-200 ease-in-out"> <div class="flex flex-col flex-1 truncate"> <div class="font-semibold group-hover:text-primary"> The Genesis of SMPEarth </div> <div class="text-sm"> A spiritual successor to the SMP Live Minecraft server, set on a scale map of Earth </div> </div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 right-2 -translate-y-1/2 size-5 stroke-2 fill-none stroke-current group-hover:stroke-primary transition-colors duration-300 ease-in-out"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-3 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 19 12 12 19" class="-translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> </a> </li> </ul> </section> <section class="animate space-y-6"> <div class="flex flex-wrap gap-y-2 items-center justify-between"> <h5 class="font-bold uppercase">
Recent projects
</h5> <a href="/projects" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2"> 
See all projects
 </a> </div> <ul class="flex flex-col gap-4"> <li> <a href="/projects/dotfiles" class="relative group flex flex-nowrap py-3 px-4 pr-10 rounded-lg border border-base-content/25 bg-transparent hover:bg-neutral text-base-content duration-200 ease-in-out"> <div class="flex flex-col flex-1 truncate"> <div class="font-semibold group-hover:text-primary"> Dotfiles </div> <div class="text-sm"> My minimalist approach to macOS configuration using dotfiles and shell scripts </div> </div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 right-2 -translate-y-1/2 size-5 stroke-2 fill-none stroke-current group-hover:stroke-primary transition-colors duration-300 ease-in-out"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-3 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 19 12 12 19" class="-translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> </a> </li><li> <a href="/projects/smpearth" class="relative group flex flex-nowrap py-3 px-4 pr-10 rounded-lg border border-base-content/25 bg-transparent hover:bg-neutral text-base-content duration-200 ease-in-out"> <div class="flex flex-col flex-1 truncate"> <div class="font-semibold group-hover:text-primary"> SMPEarth </div> <div class="text-sm"> A spiritual successor to the SMP Live Minecraft server, set on a scale map of Earth </div> </div> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 right-2 -translate-y-1/2 size-5 stroke-2 fill-none stroke-current group-hover:stroke-primary transition-colors duration-300 ease-in-out"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-3 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 19 12 12 19" class="-translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> </a> </li> </ul> </section> <section class="animate space-y-4"> <h5 class="font-semibold uppercase">
Contact me
</h5> <article> <p>
If you want to get in touch with me about something or just to say hi,
            reach out on social media or send me an email.
</p> </article> <ul class="flex flex-wrap gap-2"> <li class="flex gap-x-2 text-nowrap"> <a href="https://twitter.com/fractalcounty" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="FRACTAL COUNTY on twitter"> twitter </a> / </li><li class="flex gap-x-2 text-nowrap"> <a href="https://github.com/fractalcounty" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="FRACTAL COUNTY on github"> github </a> / </li><li class="flex gap-x-2 text-nowrap"> <a href="https://www.instagram.com/fractalcounty/" target="_blank" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="FRACTAL COUNTY on instagram"> instagram </a> / </li> <li class="line-clamp-1"> <a href="/cdn-cgi/l/email-protection#2a4942435a6a4c584b495e4b4649455f445e5304494547" target="_self" class="inline-block decoration-primary/65 hover:text-primary hover:decoration-primary transition-colors duration-300 ease-in-out underline underline-offset-2" aria-label="Email FRACTAL COUNTY"> <span class="__cf_email__" data-cfemail="c0a3a8a9b080a6b2a1a3b4a1aca3afb5aeb4b9eea3afad">[email&#160;protected]</span> </a> </li> </ul> </section> </div>  </div>  </main> <footer class="animate"> <div class="mx-auto max-w-screen-sm px-5">  <div class="relative"> <div class="absolute right-0 -top-20"> <button id="back-to-top" class="relative group flex w-fit pl-8 pr-3 py-1.5 flex-nowrap rounded-lg border border-base-content/25 bg-transparent hover:bg-neutral text-base-content hover:text-neutral-content transition-base-100 duration-300 ease-in-out"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-1/2 left-2 -translate-y-1/2 size-4 stroke-2 fill-none stroke-current rotate-90"> <line x1="5" y1="12" x2="19" y2="12" class="translate-x-2 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></line> <polyline points="12 5 5 12 12 19" class="translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></polyline> </svg> <div class="text-sm">
Back to top
</div> </button> </div> </div> <div class="flex justify-between items-center"> <div>
&copy; 2024 | FRACTAL COUNTY </div> <div class="flex flex-wrap gap-1 items-center"> <label class="swap swap-rotate"> <input type="checkbox" class="theme-controller" id="theme-button" value="laramie"> <svg class="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path> </svg> <svg class="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path> </svg> </label> </div> </div>  </div> </footer>  <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'8ce095663efa4df9',t:'MTcyODE2NDU2OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body></html>