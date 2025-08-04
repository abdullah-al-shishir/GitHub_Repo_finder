document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  const findRepoBtn = document.getElementById('find-repo-btn');
  const loadingState = document.getElementById('loading-state');
  const errorState = document.getElementById('error-state');
  const repoDetailsContainer = document.getElementById('repo-details');

  const GITHUB_Repo_API = 'https://api.github.com/search/repositories';

  async function repoBtn() {
    const selectedLanguage = languageSelect.value;
    if (!selectedLanguage) {
      displayError('Please select a programming language.');
      return;
    }
    if (selectedLanguage) {
      loadingState.classList.remove('hidden');
      errorState.classList.add('hidden');
    }
    try {
      const url = `${GITHUB_Repo_API}?q=language:${selectedLanguage}&sort=stars&order=desc`;
      // Make the API request
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.items.length === 0) {
        displayError('No repositories found for this language.');
        return;
      }
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const randomRepo = data.items[randomIndex];

      displayRepository(randomRepo);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  function displayRepository(repo) {
    repoDetailsContainer.innerHTML = '';
    repoDetailsContainer.classList.remove('hidden');
    errorState.classList.add('hidden');
    loadingState.classList.add('hidden');

    const repoHTML = `
                    <a href="${
                      repo.html_url
                    }" target="_blank" rel="noopener noreferrer" class="repo-name">${
      repo.full_name
    }</a>
                    <p class="repo-description">${
                      repo.description || 'No description available.'
                    }</p>
                    <div class="repo-stats">
                        <span class="stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span>Stars:</span>
                            <span class="stat-value">${
                              repo.stargazers_count
                            }</span>
                        </span>
                        <span class="stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 4a1 1 0 00-1 1v2H6a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-2h1V8a1 1 0 00-1-1H9V5a1 1 0 00-1-1zM4 8a1 1 0 011-1h1v2H5v6h2v-2h2v2h1v-6h1V7h-1a1 1 0 01-1-1V5a1 1 0 011-1h1a1 1 0 011 1v1h1a1 1 0 011 1v6h2a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1h1v-2H4a1 1 0 01-1-1V8z"></path>
                            </svg>
                            <span>Forks:</span>
                            <span class="stat-value">${repo.forks_count}</span>
                        </span>
                        <span class="stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.5 13.5a.5.5 0 01.5-.5h14a.5.5 0 010 1H3a.5.5 0 01-.5-.5zM3 10a.5.5 0 01.5-.5h14a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5zM3 6.5a.5.5 0 01.5-.5h14a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5z"></path>
                            </svg>
                            <span>Open Issues:</span>
                            <span class="stat-value">${
                              repo.open_issues_count
                            }</span>
                        </span>
                    </div>
                `;

    // Insert the generated HTML into the container
    repoDetailsContainer.innerHTML = repoHTML;
  }

  function displayError(message) {
    errorState.textContent = message;
    errorState.classList.remove('hidden');
    repoDetailsContainer.classList.add('hidden');
  }
  findRepoBtn.addEventListener('click', repoBtn);
});
