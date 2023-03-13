<section>
  <div class="list__selector">
    <a href="/me/programs">programs</a>
    <!-- <a href="/me/trainings">trainings</a> -->
  </div>
  <slot />
</section>

<style>
  section {
    background-color: var(--primary-color);
    padding: 1rem;
  }

  .list__selector {
    display: flex;
    justify-content: center;
    gap: 4rem;
    color: var(--text-color);
  }

  .list__selector > a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  .list__selector > a:hover {
    color: var(--action-color);
  }
</style>
