<script>
    import ProjectPage from "../components/project-page.svelte";
</script>

<style lang="postcss">
  :root {
    --background-color: #020203;
    --text-color: #EDF2F7;
    --accent-color: #5B8BB9;
    --primary-color: #7BA2C6;
    --secondary-color: #152432;
  }

  :global(html) {
    color: var(--text-color);
    background-color: var(--background-color);
  }

  .main-page {
    width: 100vw;
    height: 100vh;
  }

  .left {
  }
</style>

<div class="main-page flex justify-center items-center p-2">
  <div class="left flex-1 h-full p-2">ciao</div>
  <ProjectPage />
</div>