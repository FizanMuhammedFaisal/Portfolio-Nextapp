export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  created_at: string
  fork: boolean
  owner: {
    avatar_url: string
    login: string
  }
  pinned?: boolean // For manually highlighting important projects
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          // Add your GitHub token here for higher rate limits (optional)
          // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter out forks and sort by stars
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export function getTopRepos(
  repos: GitHubRepo[],
  count: number = 8
): GitHubRepo[] {
  return repos.slice(0, count)
}
